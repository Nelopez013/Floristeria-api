import Usuario from '../models/Usuario.js';
import bcrypt from 'bcryptjs';

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};

export const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
            .select('-password');

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener el usuario',
            error: error.message
        });
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const usuario = new Usuario({
            nombre,
            correo,
            password: passwordEncriptada,
            rol
        });

        const usuarioGuardado = await usuario.save();

        const usuarioRespuesta = usuarioGuardado.toObject();
        delete usuarioRespuesta.password;

        res.status(201).json(usuarioRespuesta);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al crear el usuario',
            error: error.message
        });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        const datosActualizar = {
            nombre,
            correo,
            rol
        };

        if (password) {
            datosActualizar.password = await bcrypt.hash(password, 10);
        }

        const usuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            datosActualizar,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);

    } catch (error) {
        res.status(400).json({
            mensaje: 'Error al actualizar el usuario',
            error: error.message
        });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el usuario',
            error: error.message
        });
    }
};