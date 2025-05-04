import { MongoClient, Db } from "mongodb";
import setup from "./setup/setup.js";
import { connectDB } from "./db/db.js"; 

const connectDBTyped: () => Promise<{ client: MongoClient; db: Db }> = connectDB;

async function main() {
  try {
    const { client, db } = await connectDBTyped();
    console.log(`Conexion a la db establecida`);
    await setup(db, client);
  } catch (error) {
    console.error("Error during database:");
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
      console.error(error.stack);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
