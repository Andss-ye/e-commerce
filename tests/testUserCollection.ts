import { MongoClient } from "mongodb";
import { UserCollection } from "../collections/UserCollection.js";
import dotenv from "dotenv";
dotenv.config();

async function testUserCollection() {
  const uri = process.env.URI;
  const dbName = process.env.DB_NAME;

  if (!uri || !dbName) {
    console.error("URI o DB_NAME no están configurados en el archivo .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conexión a la base de datos establecida");

    const db = client.db(dbName);
    const userCollection = new UserCollection(db);

    console.log("Probando creación de colección...");
    await userCollection.createCollection();

    console.log("Probando creación de índices...");
    await userCollection.createIndexes();

    console.log("Probando inserción de datos...");
    await userCollection.insertData();

    console.log("Pruebas completadas exitosamente");
  } catch (error) {
    console.error("Error durante las pruebas:", error);
  } finally {
    await client.close();
    console.log("Conexión cerrada");
  }
}

testUserCollection();