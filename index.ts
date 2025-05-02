import { MongoClient } from "mongodb";
import setup from "./setup/setup.js";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI as string;
const dbName = process.env.DB_NAME as string;

if (!uri) {
  console.error("URI variable isn't");
  process.exit(1);
}

if (!dbName) {
  console.error("DB_NAME variable isn't");
  process.exit(1);
}

async function main() {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db(dbName);
    console.log(`Conexin a la base de datos "${dbName}" establecida`);
    
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
