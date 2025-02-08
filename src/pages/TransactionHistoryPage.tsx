import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, MoreVertical, Filter } from 'lucide-react';
import { transactions } from '../seeds/transactions';
import { SortField, SortOrder } from '../types/transaction';
import PlainContainer from '../components/containers/PlainContainer';
import Button from '../components/ui/Button';
import { endUserApi } from '@/api';
import { EndUserStats } from '@/types';
import { SortBy } from '@/components/ui/SortBy';

interface TransactionHistoryList {
  id: string;
  name: string;
  initial: string;
  date: string;
  time: string;
  brands: number;
  totalRewards: number;
  totalRedemption: number;
  balance: number;
}
interface SortOption {
  label: string;
  value: string;
}

const TransactionHistoryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [transactionHistoryList, setTransactionHistoryList] = useState<TransactionHistoryList[]>([]);
  const sortOptions: SortOption[] = [
    { label: 'Date', value: 'date' },
    { label: 'Name', value: 'name' },
    { label: 'Brands - popular first', value: 'brands-desc' },
    { label: 'Total Rewards', value: 'totalRewards' },
    { label: 'Total Redemption', value: 'totalRedemption' },
    { label: 'Balance', value: 'balance' },
  ];
    const [selectedSort, setSelectedSort] = useState<SortOption>({ label: 'Date', value: 'date' });
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      const response = await endUserApi.getAll();
      const resp: TransactionHistoryList[] = [];
      response.data.forEach(item => {
        resp.push({
          id: item.id,
          name: item.endUser.name || 'Unknown',
          initial: item.endUser.name ? item.endUser.name.charAt(0) : '',
          date: formatDate(item.endUser.createdAt),
          time: formatTime(item.endUser.createdAt),
          brands: item.totalUniqueBrands,
          totalRewards: item.endUser.totalCoinsEarned || 0,
          totalRedemption: item.endUser.totalCoinsRedeemed || 0,
          balance: Math.max(0, (item.endUser.totalCoinsEarned || 0) - (item.endUser.totalCoinsRedeemed || 0)),
        });
      });
      setTransactionHistoryList(resp);
    };
    fetchTransactionHistory();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactionHistoryList];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        transaction =>
          transaction.name.toLowerCase().includes(query) ||
          transaction.id.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      const sortField = selectedSort.value;
      if (sortField === 'date') {
        const dateA = new Date(`${a.date} ${a.time}`).getTime();
        const dateB = new Date(`${b.date} ${b.time}`).getTime();
        comparison = dateA - dateB;
      } else if (sortField === 'brands-desc') {
        comparison = b.brands - a.brands;
      } else if (sortField === 'totalRewards') {
        comparison = b.totalRewards - a.totalRewards;
      } else if (sortField === 'totalRedemption') {
        comparison = b.totalRedemption - a.totalRedemption;
      } else if (sortField === 'balance') {
        comparison = b.balance - a.balance;
      } else {
        comparison = 1;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, selectedSort, sortOrder, transactionHistoryList]);


  return (
    <div className="space-y-6">
      {/* Header with breadcrumb and title */}
      <div className="space-y-1">
        {/* <div className="text-sm text-gray-500">Project1 / Members</div> */}
        <div className="flex justify-between items-center">
          <h1 className="container-title">Transaction History</h1>
          <Button variant="primary" size="sm">
            Add Profile
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <PlainContainer>
        {/* Search and Sort */}
        <div className="flex space-x-4 flex-1 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              bgColor="bg-brand"
              style={{ borderRadius: '8px' }}
              icon={Filter}
              iconPosition="left"
              onClick={() => setRoleFilter(null)}
            >
              <span>Filter by role</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div> */}
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            {/* <button className="px-4 py-2 bg-[#EDEDED] rounded-lg text-[#7E7E7E] flex items-center space-x-2" onClick={() => setShowSortMenu(true)}>
              <span className="mr-4">Sort by teams</span>
              <ChevronDown className="w-4 h-4" />
            </button> */}
            <SortBy
              options={sortOptions}
              value={selectedSort.value}
              onChange={(value: string) => {
                setSelectedSort(sortOptions.find(option => option.value === value) || sortOptions[0]);
              }}
              label="Sort by" // optional
            />

          </div>
        </div>

        {/* Table with vertical scroll */}
        <div className="overflow-x-auto">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="text-left border-b">
                  <th className="px-6 py-2 title">Name</th>
                  <th className="px-6 py-2 title">Date of joining</th>
                  <th className="px-6 py-2 title">No. of brands</th>
                  <th className="px-6 py-2 title">Total Rewards</th>
                  <th className="px-6 py-2 title">Total redemption</th>
                  <th className="px-6 py-2 title">Balance</th>
                  <th className="px-6 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAndSortedTransactions.map(transaction => (
                  <tr key={transaction.id} className="group hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full p-4 text-brand bg-brand/25 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {transaction.initial}
                          </span>
                        </div>
                        <div>
                          <div className="zuno-text">{transaction.name || 'Unknown'}</div>
                          <div className="subtitle">ID: {transaction.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div>{transaction.date}</div>
                        <div className="subtitle">at {transaction.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-brand zuno-text mr-8">
                        {transaction.brands}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-brand zuno-text">
                        {transaction.totalRewards} Coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="zuno-text">
                        {transaction.totalRedemption} coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="zuno-text">
                        {transaction.balance} Coins
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PlainContainer>
    </div>
  );
};

export default TransactionHistoryPage;
