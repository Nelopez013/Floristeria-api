import express from 'express';
import { verificarToken } from '../middleware/authMiddleware.js';
import {
    obtenerPedidos,
    obtenerPedido,
    crearPedido,
    actualizarPedido,
    eliminarPedido
} from '../controllers/pedidoController.js';
import { verificarRol } from '../middleware/rolMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/',verificarToken, obtenerPedidos);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/:id', verificarToken, obtenerPedido);

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente
 *               - flores
 *               - total
 *             properties:
 *               cliente:
 *                 type: string
 *                 example: 6ab709a87cac2ce7f0f62ced
 *               flores:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - flor
 *                     - cantidad
 *                   properties:
 *                     flor:
 *                       type: string
 *                       example: 6ab70c698c26b4d7ef558cd0
 *                     cantidad:
 *                       type: number
 *                       example: 3
 *               total:
 *                 type: number
 *                 example: 15000
 *               estado:
 *                 type: string
 *                 enum:
 *                   - Pendiente
 *                   - Confirmado
 *                   - Entregado
 *                   - Cancelado
 *                 example: Pendiente
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 *       400:
 *         description: Error al crear el pedido
 *       401:
 *         description: Token requerido o inválido
 */
router.post('/', verificarToken, crearPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente:
 *                 type: string
 *                 example: 6ab709a87cac2ce7f0f62ced
 *               flores:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     flor:
 *                       type: string
 *                       example: 6ab70c698c26b4d7ef558cd0
 *                     cantidad:
 *                       type: number
 *                       example: 2
 *               estado:
 *                 type: string
 *                 enum:
 *                   - Pendiente
 *                   - Confirmado
 *                   - Entregado
 *                   - Cancelado
 *                 example: Confirmado
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.put('/:id', verificarToken, actualizarPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *       404:
 *         description: Pedido no encontrado
 *       401:
 *         description: Token requerido o inválido
 */
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarPedido);

export default router;