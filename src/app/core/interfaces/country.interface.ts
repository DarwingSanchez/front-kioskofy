export interface Country {
    url: string,
    name: string,
    code: string,
    isoCode: string,
    flag: string,
    status: ["active", "inactive"],
    createdAt: Date,
    deleted: Date,
    lastUpdated: Date,
    _id: any,
}
