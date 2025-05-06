import { Db, ObjectId } from "mongodb";
import { MongoCollection } from "./mongoCollection.js";
import categorieCollectionValidator from "../data/validators/categorieCollectionValidator.json" with { type: "json" };
import categoriesDataDefault from "../data/default/categoriesDataDefault.json" with { type: "json" };

export class CategorieCollection implements MongoCollection {
    private db: Db;
    private collectionName: string = "categories";

    constructor(db: Db) {
        this.db = db;
    }

    async createCollection() {
        try {
            await this.db.createCollection(this.collectionName, 
                { validator: categorieCollectionValidator });
        } catch (error) {
            if (error instanceof Error) {
                console.error(`${error.name}: ${error.message}`);
                console.error(error.stack);
            } else {
                console.error(error);
            }
        }
    }

    async createIndexes() {
        const collection = this.db.collection(this.collectionName);
        const indexFields = {
            code: 1
        };
        const indexOptions = {
            unique: true,
            name: "idx_code",
        };
        try {
            await collection.createIndex(indexFields, indexOptions);
            console.log("Index created");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async insertData() {
        const categories = this.db.collection(this.collectionName);
        try {
            const formattedCategoriesData = categoriesDataDefault.map((category) => ({
                ...category,
                _id: new ObjectId(category._id),
            }));

            let res = await categories.insertMany(formattedCategoriesData);
            console.log("Datos de las categorias insertados");
            console.log(res);
        } catch (error: any) {
            if (error.writeErrors) {
                console.error("Write Errors:", error.writeErrors);
            }
            console.error("Error:", error);
        }
    }
}