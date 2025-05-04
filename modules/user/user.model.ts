import { ObjectId } from 'mongodb';

export interface User {
    _id?: string | ObjectId;
    firstName: string;
    lastName: string;
    gender: string;
    hobbies?: string[];
    age: number;
}