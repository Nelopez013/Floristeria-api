import Cliente from '../models/Cliente.js';

export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los clientes',
            error: error.message
        });
    }
};

export const obtenerCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el cliente',
            error: error.message
        });
    }
};

export const crearCliente = async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        const clienteGuardado = await cliente.save();

        res.status(201).json(clienteGuardado);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el cliente',
            error: error.message
        });
    }
};
export const actualizarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json(cliente);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el cliente',
            error: error.message
        });
    }
};


export const eliminarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el cliente',
            error: error.message
        });
    }
};
