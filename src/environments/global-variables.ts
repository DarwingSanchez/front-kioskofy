export const DATA_FILTERS_PORTFOLIO = {
    sort_list: [
        {
            name: 'Date listed: Newest first',
            slug: 'createdAt_1',
        },
        {
            name: 'Date listed: Oldest first',
            slug: 'createdAt_-1',
        },
        {
            name: 'Name: A-Z',
            slug: 'name_1',
        },
        {
            name: 'Name: Z-A',
            slug: 'name_-1',
        },
        {
            name: 'Price: Lowest first',
            slug: 'price_1',
        },
        {
            name: 'Price: Highest first',
            slug: 'price_-1',
        },
        {
            name: 'Distance: Near first',
            slug: 'distance_1',
        },
        {
            name: 'Distance: Far first',
            slug: 'distance_-1',
        },
    ],
    condition_list: [
        {
            name: 'New',
            slug: 'condition_new',
        },
        {
            name: 'Used',
            slug: 'condition_used',
        },
        {
            name: 'Not specified',
            slug: 'condition_not_specified',
        },
    ],
    price_list: [
        {
            name: 'All',
            slug: '0-90000000',
        },
        {
            name: '$0 - $50',
            slug: '0-50',
        },
    ]
}
