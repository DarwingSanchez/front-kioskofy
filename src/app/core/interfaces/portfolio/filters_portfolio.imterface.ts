export interface FILTERS_PORTFOLIO {
    status?: string,
    page: number,
    limit: number,
    search_text: string,
    countries: string[],
    categories: string[],
    condition: string[],
    price: string,
    sort_by: string,
    best_seller: boolean,
    trending: boolean,
    hand_crafted: boolean,
    recommended: boolean,
    start_up: boolean,
    non_profit: boolean,
    location: string
}
