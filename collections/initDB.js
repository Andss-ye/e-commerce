import { createUsersCollection } from './users.js';
import { createProductsCollection } from './products.js';
import { createMakersCollection } from './makers.js';

async function initializeDatabase() {
  try {
    await createMakersCollection();
    await createUsersCollection();
    await createProductsCollection();
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initializeDatabase();