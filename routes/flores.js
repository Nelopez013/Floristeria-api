import express from 'express';
import { verificarToken } from '../middleware/authMiddleware.js';
import {
    obtenerFlores,
    obtenerFlor,
    crearFlor,
    actualizarFlor,
    eliminarFlor
} from '../controllers/florController.js';
import { verificarRol } from '../middleware/rolMiddleware.js';

const router = express.Router();
/**
 * @swagger
 * /api/flores:
 *   get:
 *     summary: Obtener todas las flores
 *     tags: [Flores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de flores
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/',verificarToken, obtenerFlores);

/**
 * @swagger
 * /api/flores/{id}:
 *   get:
 *     summary: Obtener una flor por ID
 *     tags: [Flores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la flor
 *     responses:
 *       200:
 *         description: Flor encontrada
 *       404:
 *         description: Flor no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.get('/:id', verificarToken, obtenerFlor);

/**
 * @swagger
 * /api/flores:
 *   post:
 *     summary: Crear una nueva flor
 *     tags: [Flores]
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
 *               - tipo
 *               - color
 *               - precio
 *               - stock
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Rosa
 *               tipo:
 *                 type: string
 *                 example: Rosa
 *               color:
 *                 type: string
 *                 example: Rojo
 *               precio:
 *                 type: number
 *                 example: 5000
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       201:
 *         description: Flor creada correctamente
 *       400:
 *         description: Error al crear la flor
 *       401:
 *         description: Token requerido o inválido
 */
router.post('/', verificarToken, verificarRol('Administrador'), crearFlor);

/**
 * @swagger
 * /api/flores/{id}:
 *   put:
 *     summary: Actualizar una flor
 *     tags: [Flores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la flor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - tipo
 *               - color
 *               - precio
 *               - stock
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Rosa
 *               tipo:
 *                 type: string
 *                 example: Rosa
 *               color:
 *                 type: string
 *                 example: Roja
 *               precio:
 *                 type: number
 *                 example: 5000
 *               stock:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Flor actualizada correctamente
 *       404:
 *         description: Flor no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.put('/:id', verificarToken, verificarRol('Administrador'), actualizarFlor);

/**
 * @swagger
 * /api/flores/{id}:
 *   delete:
 *     summary: Eliminar una flor
 *     tags: [Flores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la flor
 *     responses:
 *       200:
 *         description: Flor eliminada correctamente
 *       404:
 *         description: Flor no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.delete('/:id', verificarToken, verificarRol('Administrador'), eliminarFlor);

export default router;
