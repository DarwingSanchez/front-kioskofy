export interface SubCategory {
    title: String,
    slug: String,
    description: String,
    category: String,
    status: "active" | "inactive",
    createdAt: Date,
    deleted: Date,
    lastUpdated: Date,
    _id: string,
}
