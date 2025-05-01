export interface MongoCollection {
    createCollection(): Promise<void>,
    createIndexes(): Promise<void>,
    insertData(): Promise<void>
}