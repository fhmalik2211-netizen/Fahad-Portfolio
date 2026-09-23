import Stripe from 'stripe';
import connectDB from '../connection.js';
import Payment from '../models/Payment.js';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const planCatalog = {
  Starter: {
    amount: 70,
    description: 'Starter website package',
  },
  Growth: {
    amount: 130,
    description: 'Growth website package',
  },
  Scale: {
    amount: 210,
    description: 'Scale website package',
  },
};

export async function getHealth(req, res) {
  return res.json({ ok: true, message: 'Payment API is running' });
}

export async function handleStripeWebhook(req, res) {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe is not configured on the backend.' });
  }

  if (!endpointSecret) {
    return res.status(500).json({ error: 'STRIPE_WEBHOOK_SECRET is missing.' });
  }

  const signature = req.headers['stripe-signature'];

  if (!signature) {
    return res.status(400).json({ error: 'Missing Stripe signature.' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).json({ error: `Webhook signature verification failed: ${error.message}` });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      await connectDB();

      await Payment.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: 'paid',
          stripePaymentIntentId: session.payment_intent || '',
          customerEmail: session.customer_details?.email || '',
        },
        { new: true }
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
}

export async function createCheckoutSession(req, res) {
  try {
    const { planName, email } = req.body;

    if (!planName || !planCatalog[planName]) {
      return res.status(400).json({ error: 'Valid planName is required.' });
    }

    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured on the backend.' });
    }

    await connectDB();

    const selectedPlan = planCatalog[planName];
    const fullAmount = Number(selectedPlan.amount);
    const depositPercent = 50;
    const depositAmountCents = Math.round((fullAmount * depositPercent / 100) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${planName} Plan`,
              description: `${selectedPlan.description} — 50% advance payment`,
            },
            unit_amount: depositAmountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3001'}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3001'}/plans/cancel?plan=${encodeURIComponent(planName)}`,
      customer_email: email || undefined,
      metadata: {
        planName,
        originalAmount: String(fullAmount),
        depositPercent: String(depositPercent),
        depositAmount: String(depositAmountCents / 100),
        customerEmail: email || '',
      },
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      allow_promotion_codes: false,
    });

    await Payment.create({
      planName,
      customerEmail: email || '',
      amount: fullAmount,
      advanceAmount: depositAmountCents / 100,
      currency: 'usd',
      status: 'pending',
      stripeSessionId: session.id,
    });

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
      depositAmount: depositAmountCents / 100,
    });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Unable to create Stripe checkout session.',
    });
  }
}
