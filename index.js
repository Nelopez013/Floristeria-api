import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import clientesRoutes from './routes/clientes.js';
import floresRoutes from './routes/flores.js';
import pedidosRoutes from './routes/pedidos.js';
import usuariosRoutes from './routes/usuarios.js';
import authRoutes from './routes/auth.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/clientes', clientesRoutes);
app.use('/api/flores', floresRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Floristería funcionando correctamente'
    });
});

// Conexión con MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('MongoDB Atlas conectado correctamente');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB Atlas:');
        console.error(error.message);
    });
