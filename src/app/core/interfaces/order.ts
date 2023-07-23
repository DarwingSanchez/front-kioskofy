export interface Order {
    order_id?: number,
    buyer: string,
    seller: string,
    item_type: 'product' | 'service',
    item: string,
    qty: number,
    status: 'pending' | 'confirmed' | 'completed' | 'canceled'
    createdAt?: Date,
    deleted?: Date,
    lastUpdated?: Date,
}
