const fs = require('fs');
const path = require('path');
const createCustomer = require('./helpers/create-customer');
const createSubscription = require('./helpers/create-subscription');
const createProducts = require('./helpers/create-products');
const config = require('./config');

console.log('Starting the process to create products, customers, and subscriptions.');

// Load names from the JSON file
const namesFilePath = path.join(__dirname, 'data/customer-names.json');
const namesData = JSON.parse(fs.readFileSync(namesFilePath, 'utf8'));

const firstNames = namesData.first_names;
const lastNames = namesData.last_names;

// Main function to create products, customers, and subscriptions
(async () => {
  // Create products and get their price IDs
  const priceIds = await createProducts();

  // Create customers and subscriptions
  for (let i = 0; i < config.numberOfCustomers; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    console.log(`Creating customer ${i + 1} with name: ${firstName} ${lastName}`);
    
    const customer = await createCustomer(firstName, lastName);

    if (customer) {
      console.log(`Creating subscription for customer ID: ${customer.id}`);
      await createSubscription(customer.id, priceIds);
    }
  }
})();
