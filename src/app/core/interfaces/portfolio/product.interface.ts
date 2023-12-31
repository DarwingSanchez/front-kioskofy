export interface Product {
    name: string,
    description: string,
    stock: number,
    status:  "pending" | "accepted" | "suspended" | "denied" | "deleted" | "blocked",
    images: string[],
    price: number,
    price_discount: number,
    condition: "not_specified" | "new" | "used",
    seller: string,
    category: string | any,
    sub_category: string | any,
    country: string | any,
    recommended: boolean,
    start_up: boolean,
    non_profit: boolean,
    hand_craft: boolean,
    best_seller: boolean,
    trending: boolean,
    pickup_locations: object[],
    pickup_main_location: string,
    pickup_country: string,
    pickup_administrative_area_level_1: string,
    _id: string,
    slug: string,
}
