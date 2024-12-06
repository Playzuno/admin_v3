import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Transaction } from '../types/transaction';

const initialTransactions: Transaction[] = [
  {
    id: '1848201',
    name: 'Abhishek Rath',
    userId: 'A',
    date: '22 October 2024',
    time: '10:31 PM',
    invoiceId: 'IQ9193PM04',
    amount: 2130.50,
    paymentMethod: 'Credit card',
    status: 'Successful',
    orders: [
      { name: 'Chicken cheese Pizza', quantity: 1 },
      { name: 'Paneer and Cheese sandwich', quantity: 3 },
      { name: 'Chocolate Milkshake', quantity: 3 }
    ]
  },
  {
    id: '2784011',
    name: 'Abhijith Sharma',
    userId: 'A',
    date: '22 October 2024',
    time: '08:31 PM',
    invoiceId: 'HC71301A65',
    amount: 1730.00,
    paymentMethod: 'Credit card',
    status: 'Failed',
    orders: [
      { name: 'Chicken cheese Pizza', quantity: 1 },
      { name: 'Paneer and Cheese sandwich', quantity: 3 },
      { name: 'Chocolate Milkshake', quantity: 3 }
    ]
  },
  {
    id: '6718200',
    name: 'Gopal',
    userId: 'A',
    date: '22 October 2024',
    time: '10:31 PM',
    invoiceId: 'IQ9193PM04',
    amount: 734.00,
    paymentMethod: 'Debit card',
    status: 'Successful',
    orders: [
      { name: 'Chicken cheese Pizza', quantity: 1 },
      { name: 'Paneer and Cheese sandwich', quantity: 3 },
      { name: 'Chocolate Milkshake', quantity: 3 }
    ]
  },
  {
    id: '3484023',
    name: 'Sethupathi',
    userId: 'A',
    date: '22 October 2024',
    time: '08:31 PM',
    invoiceId: 'HC71301A65',
    amount: 130.00,
    paymentMethod: 'Google Pay',
    status: 'Pending',
    orders: [
      { name: 'Chicken cheese Pizza', quantity: 1 },
      { name: 'Paneer and Cheese sandwich', quantity: 3 },
      { name: 'Chocolate Milkshake', quantity: 3 }
    ]
  }
];

const TransactionHistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (transactionId: string) => {
    setExpandedRow(expandedRow === transactionId ? null : transactionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Project1 / Members</div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
        </div>
        <button className="btn btn-secondary">
          Export as PDF
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="flex space-x-8 px-6 pt-4">
          {['All', 'Received', 'Transfer', 'Payment'].map((tab) => (
            <button
              key={tab}
              className={`pb-4 relative ${
                activeTab === tab
                  ? 'text-primary font-medium border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="p-6 flex justify-between items-center border-b">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
            <span>Sort by date</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-4 text-gray-600 font-medium">Name</th>
                <th className="px-6 py-4 text-gray-600 font-medium">Date</th>
                <th className="px-6 py-4 text-gray-600 font-medium">Invoice ID</th>
                <th className="px-6 py-4 text-gray-600 font-medium">Amount</th>
                <th className="px-6 py-4 text-gray-600 font-medium">Payment method</th>
                <th className="px-6 py-4 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {initialTransactions.map((transaction) => (
                <React.Fragment key={transaction.id}>
                  <tr 
                    className={`group hover:bg-gray-50 cursor-pointer ${
                      expandedRow === transaction.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => toggleRow(transaction.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-primary font-medium">{transaction.userId}</span>
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-sm text-gray-500">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{transaction.date}</div>
                      <div className="text-sm text-gray-500">at {transaction.time}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{transaction.invoiceId}</td>
                    <td className="px-6 py-4 font-medium">₹{transaction.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{transaction.paymentMethod}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === 'Successful' ? 'bg-green-100 text-green-600' :
                        transaction.status === 'Failed' ? 'bg-red-100 text-red-600' :
                        'bg-orange-100 text-primary'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                  {expandedRow === transaction.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                        <div className="border-t pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Order</h4>
                              {transaction.orders.map((order, index) => (
                                <div key={index} className="text-gray-600">
                                  {order.name}
                                </div>
                              ))}
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Quantity</h4>
                              {transaction.orders.map((order, index) => (
                                <div key={index} className="text-gray-600">
                                  x {order.quantity}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;