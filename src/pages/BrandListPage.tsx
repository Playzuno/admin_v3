import Button from '../components/ui/Button';
import PlainContainer from '../components/containers/PlainContainer';
import { ChevronDown, Search } from 'lucide-react';
export default function BrandListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="title-2">Brand List</h1>
        <div className="flex space-x-4">
          <Button variant="secondary" size="sm" onClick={() => {}}>
            Add New Brand
          </Button>
        </div>
      </div>
      <PlainContainer>
        <div className="flex justify-between space-x-4 flex-1 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 bg-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-brand/20"
              value={''}
              onChange={e => {}}
            />
          </div>
          <button className="px-4 py-2 bg-[#EDEDED] rounded-lg text-[#7E7E7E] flex items-center space-x-2">
            <span className="mr-4">Sort by date</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <table className="w-full">
          <thead className="sticky top-0 ">
            <tr className="text-left border-b">
              <th className="pr-6 py-4 title">Name</th>
              <th className="px-6 py-4 title">Expiry Date</th>
              <th className="px-6 py-4 title">No. of Branch</th>
              <th className="px-6 py-4 title">Total Coins</th>
              <th className="px-6 py-4 title">Usage</th>
              <th className="px-6 py-4">Balance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
        </table>
      </PlainContainer>
    </div>
  );
}
