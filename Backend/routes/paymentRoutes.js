import express from 'express';
import { createCheckoutSession, getHealth } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/health', getHealth);
router.post('/create-checkout-session', createCheckoutSession);

export default router;
