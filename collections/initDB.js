import { createUsersCollection } from './users.js';

async function initializeDatabase() {
  try {
    await createUsersCollection();
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

initializeDatabase();