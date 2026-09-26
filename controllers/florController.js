import Flor from '../models/Flor.js';

export const obtenerFlores = async (req, res) => {
    try {
        const flores = await Flor.find();
        res.json(flores);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener las flores',
            error: error.message
        });
    }
};

export const obtenerFlor = async (req, res) => {
    try {
        const flor = await Flor.findById(req.params.id);

        if (!flor) {
            return res.status(404).json({
                mensaje: 'Flor no encontrada'
            });
        }

        res.json(flor);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener la flor',
            error: error.message
        });
    }
};

export const crearFlor = async (req, res) => {
    try {
        const flor = new Flor(req.body);
        const florGuardada = await flor.save();

        res.status(201).json(florGuardada);
    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear la flor',
            error: error.message
        });
    }
};

export const actualizarFlor = async (req, res) => {
    try {
        const flor = await Flor.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!flor) {
            return res.status(404).json({
                mensaje: 'Flor no encontrada'
            });
        }

        res.json(flor);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar la flor',
            error: error.message
        });
    }
};

export const eliminarFlor = async (req, res) => {
    try {
        const flor = await Flor.findByIdAndDelete(req.params.id);

        if (!flor) {
            return res.status(404).json({
                mensaje: 'Flor no encontrada'
            });
        }

        res.json({
            mensaje: 'Flor eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar la flor',
            error: error.message
        });
    }
};
