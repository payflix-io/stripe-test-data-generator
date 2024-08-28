const stripeKey = process.argv[2];

if (!stripeKey) {
  console.error('Please provide the Stripe API key as an argument.');
  process.exit(1);
}

const stripe = require('stripe')(stripeKey);

module.exports = stripe;