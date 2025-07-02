export interface OrderStatus {
    text?: string;
    value: string;
    color?: string;
}

export const orderStatuses: OrderStatus[] = [
    { text: 'Pending', value: 'pending', color: 'secondary' },
    { text: 'Processing', value: 'processing', color: 'primary' },
    { text: 'Completed', value: 'completed', color: 'green' },
    { text: 'Cancelled', value: 'cancelled', color: 'error' },
]

