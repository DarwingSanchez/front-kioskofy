import { ObjectId } from "mongoose";

export interface Country {
    url: string,
    name: String,
    code: String,
    isoCode: String,
    flag: String,
    status: ["active", "inactive"],
    createdAt: Date,
    deleted: Date,
    lastUpdated: Date,
    _id: ObjectId,
}