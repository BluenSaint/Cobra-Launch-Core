import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || '',
  {
    apiVersion: '2023-10-16', // Use the latest Stripe API version
  }
);

// Plans configuration
export const plans = {
  shield: {
    id: 'shield',
    name: 'Shield',
    description: 'Basic credit repair for individuals',
    price: 8500, // in cents ($85.00)
    features: [
      'Unlimited dispute letters',
      'Credit report analysis',
      'Score tracking',
      'Basic support',
    ],
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    description: 'Advanced credit repair for individuals',
    price: 15000, // in cents ($150.00)
    features: [
      'Everything in Shield',
      'CFPB escalation',
      'Priority support',
      'Advanced dispute tactics',
      'Score optimization',
    ],
  },
  infinity: {
    id: 'infinity',
    name: 'Infinity',
    description: 'Complete credit solution for individuals and businesses',
    price: 25000, // in cents ($250.00)
    features: [
      'Everything in Elite',
      'Legal review',
      'Business credit setup',
      'LLC formation',
      '24/7 VIP support',
      'Personal credit coach',
    ],
  },
};

// Create a Stripe checkout session
export async function createCheckoutSession({
  plan,
  userId,
  userEmail,
}: {
  plan: keyof typeof plans;
  userId: string;
  userEmail: string;
}) {
  const planConfig = plans[plan];
  
  if (!planConfig) {
    throw new Error(`Invalid plan: ${plan}`);
  }
  
  // Create Stripe checkout session
  return stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    customer_email: userEmail,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: planConfig.name,
            description: planConfig.description,
          },
          unit_amount: planConfig.price,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId,
      plan,
    },
  });
}

export default stripe; 