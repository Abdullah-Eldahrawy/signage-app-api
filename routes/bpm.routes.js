import { Router } from 'express';
import { forwardSignageRequest } from '../controllers/bpm.controller.js';
import auth from '../src/middelware/auth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

/**
 * @swagger
 * /bpm/signage:
 *   post:
 *     summary: Create and forward a signage request (clients only)
 *     tags: [bpm]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               signageRequest:
 *                 type: object
 *     responses:
 *       200:
 *         description: Forwarded
 */
router.post('/signage', auth, permit('client'), forwardSignageRequest);



export default router;
