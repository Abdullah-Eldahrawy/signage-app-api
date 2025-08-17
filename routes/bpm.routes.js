import { Router } from 'express';
import { forwardSignageRequest } from '../controllers/bpm.controller.js';

const router = Router();


router.post('/signage', forwardSignageRequest);


export default router;
