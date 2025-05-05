import { ObjectId } from 'mongodb';

export interface Sale {
    reference?: number;
    date: Date;
    payment_method: ObjectId | string;
    client: ObjectId | string;
    seller: ObjectId | string;
    details: {
        product: ObjectId | string;
        quantity: number;
        price: number;
    }[];
}