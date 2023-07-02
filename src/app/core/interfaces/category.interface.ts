export interface Category {
    title: String,
    description: String,
    image: String,
    type: "product" | "service",
    status: "active" | "inactive",
    createdAt: Date,
    deleted: Date,
    lastUpdated: Date,
    _id: string,
}
