import { ObjectId } from "mongoose";

export interface Product {
    name: String,
    brand: String,
    description: String,
    stock: Number,
    status:  "pending" | "accepted" | "suspended" | "denied" | "deleted" | "blocked",
    images: string[],
    price: Number,
    measure:  "Un" | "Kg" | "gr" | "Lb" | "Other",
    quantity: Number,
    condition: "Not specified" | "New" | "Used",
    seller: ObjectId,
    category: ObjectId,
    country: ObjectId,
    recommended: Boolean,
    start_up: Boolean,
    non_profit: Boolean,
    pickup_locations: object[],
}