const stripe = require('../libs/stripe');

async function createCustomer(firstName, lastName) {
  console.log('Starting createCustomer function');
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;

  try {
    const customer = await stripe.customers.create({
      name: name,
      email: email,
    });
    console.log(`Customer created: ${customer.id} - ${customer.name}`);
    return customer;
  } catch (error) {
    console.error(`Error creating customer: ${error.message}`);
    return null;
  }
}

module.exports = createCustomer;
