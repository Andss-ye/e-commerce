import { ObjectId } from 'mongodb';

export interface Maker {
    _id?: ObjectId | string;
    code?: string;
    name: string;
    description?: string;
}