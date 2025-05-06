import { ObjectId } from 'mongodb';

export interface User {
    _id?: string | ObjectId;
    name: string;
    email: string;
    password: string;
    document_type: 'CC' | 'CE' | 'PS' | 'PEP';
    document_number?: string;
    phone: string;
    place: object;
    user_type?: string[];
    active?: boolean;
    gender?: string;
    hobbies?: string[];
    age?: number;
}