import { Router } from 'express';
import { createModification, listModifications, getModificationById } from '../controllers/modification.Controller.js';
import auth from '../src/middelware/auth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

/**
 * @swagger
 * /modifications/createModoficationReq:
 *   post:
 *     summary: Create a modification for a signage request (admin only)
 *     tags: [modifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notes
 *               - signageRequestId
 *             properties:
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *               signageRequestId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Modification created
 */
router.post('/createModoficationReq', auth, permit('admin'), createModification);

/**
 * @swagger
 * /modifications:
 *   get:
 *     summary: List all modifications (admin only)
 *     tags: [modifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of modifications
 */
router.get('/', auth, permit('admin'), listModifications);

/**
 * @swagger
 * /modifications/{id}:
 *   get:
 *     summary: Get a modification by id (admin only)
 *     tags: [modifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Modification
 */
router.get('/:id', auth, permit('admin'), getModificationById);


export default router;
