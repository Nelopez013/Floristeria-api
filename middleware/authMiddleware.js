import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                mensaje: 'Token requerido'
            });
        }

        const datos = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = datos;

        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
};