import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

export default stripePromise; 