export interface OrderItem {
  name: string;
  quantity: number;
}

export interface Transaction {
  id: string;
  name: string;
  userId: string;
  date: string;
  time: string;
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  status: 'Successful' | 'Failed' | 'Pending';
  orders: OrderItem[];
}