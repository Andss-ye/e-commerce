import { MongoCollection } from "./mongoCollection.js";
import { Db, ObjectId } from "mongodb";
import productCollectionValidator from "../data/validators/productCollectionValidator.json" with { type: "json" };
import productsDataDefault from "../data/default/productsDataDefault.json" with { type: "json" };

export class ProductCollection implements MongoCollection {
    private db: Db;
    private collectionName: string = "products";

    constructor(db: Db) {
        this.db = db;
    }

    async createCollection() {
        try {
            await this.db.createCollection(this.collectionName, { validator: productCollectionValidator });
            console.log("Collection 'products' created");
        } catch (error) {
            console.error(error)
        }
    }

    async createIndexes() {
        const collection = this.db.collection(this.collectionName);
        const indexFields = {
            code: 1
        };
        const indexOptions = {
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
        const products = this.db.collection(this.collectionName);
        try {
            const formattedProductsData = productsDataDefault.map((product) => ({
                ...product,
                categories: new ObjectId(product.categories),
                _id: new ObjectId(product._id),
            }));

            let res = await products.insertMany(formattedProductsData);
            console.log("Datos del producto insertados");
            console.log(res);
        } catch (error: any) {
            if (error.writeErrors) {
                console.error("Write Errors:", error.writeErrors);
            }
            console.error("Error:", error);
        }
    }
}