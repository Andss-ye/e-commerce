import { MongoClient, Db } from "mongodb";
import setup from "./setup/setup.js";
import { connectDB } from "./db/db.js"; 
import { UserRepository } from "./modules/user/user.repository.js";
import { UserService } from "./modules/user/user.services.js";

const connectDBTyped: () => Promise<{ client: MongoClient; db: Db }> = connectDB;

async function main() {
  const { client, db } = await connectDBTyped();
  
  try {
    console.log(`Conexion a la db establecida`);
    await setup(db, client);

    const repo = new UserRepository(db);
    const userService = new UserService(repo);

    // Example usage
    await userService.createUser({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "securePass1",
      document_type: "CC",
      document_number: "123456789",
      phone: "1234567890",
      place: {
        city: "Bogotá",
        country: "Colombia"
      },
      user_type: ["admin", "editor"],
      active: true
    });

  } catch (error) {
    console.error("Error during database:");
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
      console.error(error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  } finally {
    await client.close();
    console.log("Conexión cerrada");
  }
}

main();
