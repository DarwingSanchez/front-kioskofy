export interface Order {
    order_id?: number,
    buyer: string,
    seller: string,
    item_type: 'product' | 'service',
    item_id: string,
    status: 'pending' | 'confirmed' | 'completed' | 'canceled'
    createdAt?: Date,
    deleted?: Date,
    lastUpdated?: Date,
}
