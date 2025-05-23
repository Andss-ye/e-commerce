import { Db, MongoClient } from "mongodb";
import { FactoryUsers } from "./factories/FactoryUsers.js";
import { FactoryProducts } from "./factories/FactoryProducts.js";
import { FactoryMakers } from "./factories/FactoryMakers.js";
import { FactoryCategories } from "./factories/FactoryCategories.js";
import { FactoryPaymentMethod } from "./factories/FactoryPaymentMethod.js";
import { FactorySales } from "./factories/FactorySales.js";

export default async function setup(db: Db, client: MongoClient) {
  try {
    console.log("Iniciando configuración de la base de datos...");
    const colecciones = [new FactoryUsers(db), new FactoryProducts(db), new FactoryMakers(db), new FactoryCategories(db), new FactoryPaymentMethod(db), new FactorySales(db)];

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
  }
}
