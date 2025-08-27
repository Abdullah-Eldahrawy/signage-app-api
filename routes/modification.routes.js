import { Router } from 'express';
import { createModification } from '../controllers/modification.Controller.js';
import basicAuth from '../src/middelware/basicAuth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

/**
 * @swagger
 * /modification/createModoficationReq:
 *   post:
 *     summary: Create a modification for a signage request (admin only - Basic auth service account)
 *     tags: [modifications]
 *     security:
 *       - basic: []
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
router.post('/createModoficationReq', basicAuth, permit('admin'), createModification);
