import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import connectDB from './connection.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { handleStripeWebhook } from './controllers/paymentController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';

app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/payments', paymentRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Payment backend running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Database connection failed during startup:', error.message);
  }
});
