import Pedido from '../models/Pedido.js';
import Flor from '../models/Flor.js';
import Cliente from '../models/Cliente.js';

export const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('cliente')
            .populate('flores.flor');

        res.json(pedidos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los pedidos',
            error: error.message
        });
    }
};

export const obtenerPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
            .populate('cliente')
            .populate('flores.flor');

        if (!pedido) {
            return res.status(404).json({
                mensaje: 'Pedido no encontrado'
            });
        }

        res.json(pedido);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el pedido',
            error: error.message
        });
    }
};

export const crearPedido = async (req, res) => {
    try {
        const { cliente, flores, estado } = req.body;

        if (!flores || flores.length === 0) {
            return res.status(400).json({
                mensaje: 'El pedido debe tener al menos una flor'
            });
        }

        let total = 0;
        const floresParaPedido = [];

        for (const item of flores) {

            const flor = await Flor.findById(item.flor);

            if (!flor) {
                return res.status(404).json({
                    mensaje: `La flor ${item.flor} no existe`
                });
            }

            if (flor.stock < item.cantidad) {
                return res.status(400).json({
                    mensaje: `No hay suficiente stock de ${flor.nombre}. Stock disponible: ${flor.stock}`
                });
            }

            const subtotal = flor.precio * item.cantidad;

            total += subtotal;

            floresParaPedido.push({
                flor: flor._id,
                cantidad: item.cantidad
            });
        }

        const pedido = new Pedido({
            cliente,
            flores: floresParaPedido,
            total,
            estado
        });

        const pedidoGuardado = await pedido.save();

        for (const item of flores) {
            await Flor.findByIdAndUpdate(
                item.flor,
                {
                    $inc: {
                        stock: -item.cantidad
                    }
                }
            );
        }

        res.status(201).json(pedidoGuardado);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el pedido',
            error: error.message
        });
    }
};

export const actualizarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                mensaje: 'Pedido no encontrado'
            });
        }

        const { cliente, flores, estado } = req.body;

        // Verificar que el cliente exista
        const clienteExiste = await Cliente.findById(cliente);

        if (!clienteExiste) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        // Verificar que el pedido tenga flores
        if (!flores || flores.length === 0) {
            return res.status(400).json({
                mensaje: 'El pedido debe tener al menos una flor'
            });
        }

        let total = 0;
        const floresParaPedido = [];

        // Verificar las nuevas flores y calcular el total
        for (const item of flores) {

            if (item.cantidad < 1) {
                return res.status(400).json({
                    mensaje: 'La cantidad debe ser mayor que 0'
                });
            }

            const flor = await Flor.findById(item.flor);

            if (!flor) {
                return res.status(404).json({
                    mensaje: `La flor ${item.flor} no existe`
                });
            }

            // Cantidad que tenía esta flor en el pedido anterior
            const florAnterior = pedido.flores.find(
                f => f.flor.toString() === item.flor.toString()
            );

            const cantidadAnterior = florAnterior
                ? florAnterior.cantidad
                : 0;

            // Stock disponible + lo que se libera del pedido anterior
            const stockDisponible = flor.stock + cantidadAnterior;

            if (stockDisponible < item.cantidad) {
                return res.status(400).json({
                    mensaje: `No hay suficiente stock de ${flor.nombre}. Stock disponible: ${stockDisponible}`
                });
            }

            total += flor.precio * item.cantidad;

            floresParaPedido.push({
                flor: flor._id,
                cantidad: item.cantidad
            });
        }

        // Devolver al stock las flores del pedido anterior
        for (const item of pedido.flores) {
            await Flor.findByIdAndUpdate(
                item.flor,
                {
                    $inc: {
                        stock: item.cantidad
                    }
                }
            );
        }

        // Descontar del stock las nuevas cantidades
        for (const item of flores) {
            await Flor.findByIdAndUpdate(
                item.flor,
                {
                    $inc: {
                        stock: -item.cantidad
                    }
                }
            );
        }

        // Actualizar el pedido
        pedido.cliente = cliente;
        pedido.flores = floresParaPedido;
        pedido.total = total;

        if (estado) {
            pedido.estado = estado;
        }

        const pedidoActualizado = await pedido.save();

        res.json(pedidoActualizado);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el pedido',
            error: error.message
        });
    }
};

export const eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id);

        if (!pedido) {
            return res.status(404).json({
                mensaje: 'Pedido no encontrado'
            });
        }

        // Devolver las flores al stock
        for (const item of pedido.flores) {
            await Flor.findByIdAndUpdate(
                item.flor,
                {
                    $inc: {
                        stock: item.cantidad
                    }
                }
            );
        }

        await Pedido.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: 'Pedido eliminado correctamente y stock restaurado'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el pedido',
            error: error.message
        });
    }
};