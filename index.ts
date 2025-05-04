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
      "firstName": "Andrew",
      "lastName": "Rodriguez",
      "age": 20,
      "gender": "M"
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
