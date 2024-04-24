import { Types } from 'mongoose'

export interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    _id: Types.ObjectId
}