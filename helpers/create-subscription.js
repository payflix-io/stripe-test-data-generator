const stripe = require('../libs/stripe');
const config = require('../config');

function getRandomDate(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

async function createSubscription(customerId, priceIds) {
  console.log('Starting createSubscription function');

  const orderDate = getRandomDate(config.orderDateRange.start, config.orderDateRange.end);
  const backdatedTimestamp = Math.floor(orderDate.getTime() / 1000);
  const randomPriceId = priceIds[Math.floor(Math.random() * priceIds.length)];

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: randomPriceId,
        },
      ],
      backdate_start_date: backdatedTimestamp,
      proration_behavior: 'none',
    });

    console.log(`Subscription created: ${subscription.id} for Customer ID: ${customerId} backdated to ${orderDate.toISOString()}`);
    return subscription;
  } catch (error) {
    console.error(`Error creating subscription for Customer ID ${customerId}: ${error.message}`);
    process.exit(1); // Abort if there is an error
  }
}

module.exports = createSubscription;
