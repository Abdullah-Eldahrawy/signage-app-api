import { Router } from 'express';
import { forwardSignageRequest } from '../controllers/bpm.controller.js';
import auth from '../src/middelware/auth.js';
import { permit } from '../src/middelware/authorize.js';
import { listSignageRequests, getSignageRequestById, getModificationsForSignage } from '../controllers/bpm.controller.js';

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


/**
 * @swagger
 * /bpm/signage:
 *   get:
 *     summary: List signage requests (clients see only their own)
 *     tags: [bpm]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of signage requests
 */
router.get('/signage', auth, listSignageRequests);


/**
 * @swagger
 * /bpm/signage/{id}:
 *   get:
 *     summary: Get a signage request by id
 *     tags: [bpm]
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
 *         description: Signage request
 */
router.get('/signage/:id', auth, getSignageRequestById);


/**
 * @swagger
 * /bpm/signage/{id}/modifications:
 *   get:
 *     summary: Get modifications for a signage request
 *     tags: [bpm]
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
 *         description: Array of modifications
 */
router.get('/signage/:id/modifications', auth, getModificationsForSignage);

export default router;
