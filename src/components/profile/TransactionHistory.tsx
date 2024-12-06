import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface Transaction {
  id: string;
  initial: string;
  amount: number;
  paymentMode: string;
}

const transactions: Transaction[] = [
  { id: '26818364782', initial: 'S', amount: 2130.50, paymentMode: 'Credit card' },
  { id: '98342517892', initial: 'H', amount: 1890.00, paymentMode: 'Gpay' },
  { id: '37881622901', initial: 'A', amount: 5000.00, paymentMode: 'Debit card' },
  { id: '99728872357', initial: 'I', amount: 3900.00, paymentMode: 'Credit card' },
  { id: '26818364783', initial: 'S', amount: 2130.50, paymentMode: 'Credit card' },
];

const TransactionHistory: React.FC = () => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex-shrink-0 w-64 bg-white rounded-lg border p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-primary font-medium">{transaction.initial}</span>
              </div>
              <span className="text-sm text-gray-600">#{transaction.id}</span>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="text-gray-500">Payment mode</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">₹{transaction.amount.toFixed(2)}</span>
              <span className="font-medium">{transaction.paymentMode}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;