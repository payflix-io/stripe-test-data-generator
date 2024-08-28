const stripe = require('../libs/stripe');
const config = require('../config');

async function createProducts() {
  console.log('Starting createProducts function');
  const productIds = [];

  for (const product of config.products) {
    try {
      const stripeProduct = await stripe.products.create({
        name: product.name,
      });

      console.log(`Created product: ${stripeProduct.name}`);

      const price = await stripe.prices.create({
        unit_amount: product.price,
        currency: 'usd',
        product: stripeProduct.id,
        recurring: { interval: 'month' },
        type: 'recurring',
      });

      console.log(`Created price: ${price.id} for product: ${stripeProduct.name}`);

      productIds.push(price.id);
      console.log(`Created product: ${stripeProduct.name} with price ID: ${price.id}`);
    } catch (error) {
      console.error(`Error creating product ${product.name}: ${error.message}`);
      process.exit(1); // Abort if there is an error
    }
  }

  return productIds;
}

module.exports = createProducts;
