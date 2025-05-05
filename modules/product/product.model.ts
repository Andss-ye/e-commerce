import { ObjectId } from "mongodb";

export interface Product {
    _id?: ObjectId;
    code?: string;
    name: string;
    price: number;
    maker: string;
    description?: string;
}