import { Db, MongoClient } from "mongodb";
import { FactoryUsers } from "./factories/FactoryUsers.js";
export default async function setup(db: Db, client: MongoClient) {
  try {
    console.log("Iniciando configuración de la base de datos...");
    const colecciones = [new FactoryUsers(db)];

    for (const factory of colecciones) {
      try {
        await factory.ejecutar();
        console.log(`Colección creada exitosamente por ${factory.constructor.name}`);
      } catch (error) {
        console.error(`Error en la creación de colección por ${factory.constructor.name}:`);
        console.error(error);
        throw error; 
      }
    }
    
    console.log("Configuración de la base de datos completada con éxito");
  } catch (error) {
    console.error("Error durante la configuración de la base de datos:");
    if (error instanceof Error) {
      console.error(`${error.name}: ${error.message}`);
    } else {
      console.error(error);
    }
    throw error; 
  } finally {
    try {
      await client.close();
      console.log("Conexión a MongoDB cerrada correctamente");
    } catch (closeError) {
      console.error("Error al cerrar la conexión a MongoDB:", closeError);
    }
  }
}
