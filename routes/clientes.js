import express from 'express';
import { verificarToken } from '../middleware/authMiddleware.js';
import {
    obtenerClientes,
    obtenerCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} from '../controllers/clienteController.js';
import { verificarRol } from '../middleware/rolMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/', verificarToken, obtenerClientes);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/:id', verificarToken, obtenerCliente);

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - telefono
 *               - direccion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@gmail.com
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *               direccion:
 *                 type: string
 *                 example: Sogamoso
 *     responses:
 *       201:
 *         description: Cliente creado correctamente
 *       400:
 *         description: Error al crear el cliente
 *       401:
 *         description: Token requerido o inválido
 */
router.post('/', verificarToken, crearCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - telefono
 *               - direccion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@gmail.com
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *               direccion:
 *                 type: string
 *                 example: Sogamoso
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.put('/:id', verificarToken, actualizarCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarCliente);
export default router;
