import { createUsersCollection } from './users.js';
import { createProductsCollection } from './products.js';
import { createCategoriesCollection } from './categories.js';
import { createPaymentMethodsCollection } from './paymentMethods.js';
import { createSalesCollection } from './sales.js';

async function initializeDatabase() {
  try {
    await createUsersCollection();
    await createProductsCollection();
    await createCategoriesCollection();
    await createPaymentMethodsCollection();
    await createSalesCollection();
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initializeDatabase();