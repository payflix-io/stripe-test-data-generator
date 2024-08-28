module.exports = {
  // How many customers to create
  numberOfCustomers: 10,
  // Order value range in cents
  orderValueRange: {
    // Minimum order value in cents ($10.00)
    min: 1000,
    // Maximum order value in cents ($100.00)
    max: 10000
  },
  // Date range for the orders
  orderDateRange: {
    start: '2023-01-01', // Start date for the orders
    end: '2023-12-31' // End date for the orders
  },
  // Products to create and use for subscriptions
  products: [
    { name: 'Basic Plan', price: 1000 }, // Price in cents
    { name: 'Standard Plan', price: 2000 }, // Price in cents
    { name: 'Premium Plan', price: 3000 } // Price in cents
  ]
};
