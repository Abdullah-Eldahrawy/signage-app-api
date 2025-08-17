import { Router } from 'express';
import { createModification } from '../controllers/modification.Controller.js';

const router = Router();

/**
 * @swagger
 * /modifications/createModoficationReq:
 *   post:
 *     summary: Create a new user
 *     tags: [modifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: johndoe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/createModoficationReq', createModification);


export default router;
