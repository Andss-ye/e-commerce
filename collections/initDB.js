import { createUsersCollection } from "./users";

async function initializeDatabase() {
    try {
        await createUsersCollection();
        console.log("Database initialization complete!");
    } catch (error) {
        console.error("Error: ", error);
    }
}

initializeDatabase();