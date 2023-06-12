import { ObjectId } from "mongoose";

export interface Category {
    title: String,
    description: String,
    image: String,
    type: String,
    status: String,
    createdAt: Date,
    deleted: Date,
    lastUpdated: Date,
    _id: ObjectId,
}