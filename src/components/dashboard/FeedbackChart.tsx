import { useEffect, useState } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts';
import Button from '../ui/Button';
import { analyticsApi } from '@/api';
import { useOrg } from '@/context/OrgContext';
import { FeedbackReport, FeedbackReportData } from '@/types';

// const chartData = {
//   daily: {
//     topRated: [
//       { label: 'As', value: 4.4, name: 'Asian Platter' },
//       { label: 'Sr', value: 4.6, name: 'Sushi Roll' },
//       { label: 'Vb', value: 4.5, name: 'Veg Burger' },
//       { label: 'Sp', value: 4.8, name: 'Sushi Platter' },
//       { label: 'Cm', value: 4.4, name: 'Chicken Manchurian' },
//       { label: 'Cf', value: 4.1, name: 'Chicken Fried Rice' },
//       { label: 'Mp', value: 4.5, name: 'Mango Pudding' },
//     ],
//     lowestRated: [
//       { label: 'As', value: 3.4, name: 'Asian Soup' },
//       { label: 'Sr', value: 3.6, name: 'Spring Roll' },
//       { label: 'Vb', value: 3.5, name: 'Veg Biryani' },
//       { label: 'Sp', value: 3.2, name: 'Spicy Pasta' },
//       { label: 'Cm', value: 3.4, name: 'Chow Mein' },
//       { label: 'Cf', value: 3.1, name: 'Corn Fritters' },
//       { label: 'Mp', value: 3.5, name: 'Mixed Platter' },
//     ],
//   },
//   weekly: {
//     topRated: [
//       { label: 'As', value: 4.3, name: 'Asian Platter' },
//       { label: 'Sr', value: 4.7, name: 'Sushi Roll' },
//       { label: 'Vb', value: 4.6, name: 'Veg Burger' },
//       { label: 'Sp', value: 4.8, name: 'Sushi Platter' },
//       { label: 'Cm', value: 4.4, name: 'Chicken Manchurian' },
//       { label: 'Cf', value: 4.2, name: 'Chicken Fried Rice' },
//       { label: 'Mp', value: 4.5, name: 'Mango Pudding' },
//     ],
//     lowestRated: [
//       { label: 'As', value: 3.3, name: 'Asian Soup' },
//       { label: 'Sr', value: 3.5, name: 'Spring Roll' },
//       { label: 'Vb', value: 3.4, name: 'Veg Biryani' },
//       { label: 'Sp', value: 3.1, name: 'Spicy Pasta' },
//       { label: 'Cm', value: 3.3, name: 'Chow Mein' },
//       { label: 'Cf', value: 3.0, name: 'Corn Fritters' },
//       { label: 'Mp', value: 3.4, name: 'Mixed Platter' },
//     ],
//   },
//   monthly: {
//     topRated: [
//       { label: 'As', value: 4.5, name: 'Asian Platter' },
//       { label: 'Sr', value: 4.8, name: 'Sushi Roll' },
//       { label: 'Vb', value: 4.7, name: 'Veg Burger' },
//       { label: 'Sp', value: 4.9, name: 'Sushi Platter' },
//       { label: 'Cm', value: 4.5, name: 'Chicken Manchurian' },
//       { label: 'Cf', value: 4.3, name: 'Chicken Fried Rice' },
//       { label: 'Mp', value: 4.6, name: 'Mango Pudding' },
//     ],
//     lowestRated: [
//       { label: 'As', value: 3.5, name: 'Asian Soup' },
//       { label: 'Sr', value: 3.7, name: 'Spring Roll' },
//       { label: 'Vb', value: 3.6, name: 'Veg Biryani' },
//       { label: 'Sp', value: 3.3, name: 'Spicy Pasta' },
//       { label: 'Cm', value: 3.5, name: 'Chow Mein' },
//       { label: 'Cf', value: 3.2, name: 'Corn Fritters' },
//       { label: 'Mp', value: 3.6, name: 'Mixed Platter' },
//     ],
//   },
//   yearly: {
//     topRated: [
//       { label: 'As', value: 4.6, name: 'Asian Platter' },
//       { label: 'Sr', value: 4.9, name: 'Sushi Roll' },
//       { label: 'Vb', value: 4.8, name: 'Veg Burger' },
//       { label: 'Sp', value: 4.9, name: 'Sushi Platter' },
//       { label: 'Cm', value: 4.6, name: 'Chicken Manchurian' },
//       { label: 'Cf', value: 4.4, name: 'Chicken Fried Rice' },
//       { label: 'Mp', value: 4.7, name: 'Mango Pudding' },
//     ],
//     lowestRated: [
//       { label: 'As', value: 3.6, name: 'Asian Soup' },
//       { label: 'Sr', value: 3.8, name: 'Spring Roll' },
//       { label: 'Vb', value: 3.7, name: 'Veg Biryani' },
//       { label: 'Sp', value: 3.4, name: 'Spicy Pasta' },
//       { label: 'Cm', value: 3.6, name: 'Chow Mein' },
//       { label: 'Cf', value: 3.3, name: 'Corn Fritters' },
//       { label: 'Mp', value: 3.7, name: 'Mixed Platter' },
//     ],
//   },
// };

const CustomTooltip = ({ active, payload, chartData }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const index = chartData.findIndex((item: any) => item.label === data.label);
    const isRightSide = index >= chartData.length / 2;

    return (
      <div className="relative">
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 
                     border-t-[8px] border-t-transparent 
                     border-b-[8px] border-b-transparent
                     ${
                       isRightSide
                         ? '-right-2 border-l-[8px] border-l-secondary'
                         : '-left-2 border-r-[8px] border-r-secondary'
                     }`}
        />
        <div className="bg-secondary text-white px-4 py-3 rounded-lg">
          <div className="text-sm font-medium">{data.name}</div>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="ml-1 text-sm">{data.value}/5</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const FeedbackChart = () => {
  const [period, setPeriod] = useState<
    'daily' | 'weekly' | 'monthly' | 'yearly'
  >('weekly');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [chartType, setChartType] = useState<'topRated' | 'lowestRated'>(
    'topRated'
  );
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [chartData, setChartData] = useState<
    Record<
      string,
      { topRated: FeedbackReportData[]; lowestRated: FeedbackReportData[] }
    >
  >({});

  const currentData =
    chartData[period] && chartData[period][chartType]
      ? chartData[period][chartType]
      : [];
  const [feedbackReport, setFeedbackReport] = useState<FeedbackReport[]>([]);
  const { branch } = useOrg();
  useEffect(() => {
    const fetchFeedbackReport = async () => {
      if (!branch?.id) return;
      const resp = await analyticsApi.getFeedbackReport(
        branch?.id,
        period,
        chartType
      );
      setFeedbackReport(resp.data);
      const report: Record<
        string,
        { topRated: FeedbackReportData[]; lowestRated: FeedbackReportData[] }
      > = {
        daily: {
          topRated: [],
          lowestRated: [],
        },
        weekly: {
          topRated: [],
          lowestRated: [],
        },
        monthly: {
          topRated: [],
          lowestRated: [],
        },
        yearly: {
          topRated: [],
          lowestRated: [],
        },
      };
      resp.data.forEach(item => {
        if (!report[period]) {
          report[period] = {
            topRated: [],
            lowestRated: [],
          };
        }
        report[period][chartType].push({
          label: item.productName,
          value: item.avgRating,
          productId: item.productId,
          productName: item.productName,
          avgRating: item.avgRating,
        });
      });
      setChartData(report);
    };
    fetchFeedbackReport();
  }, [period, chartType, branch]);
  // console.log(feedbackReport, chartData);

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={chartType === 'topRated' ? 'zuno-light' : 'light'}
          onClick={() => setChartType('topRated')}
          className={`px-4 py-2 rounded-full transition-colors ${
            chartType === 'topRated'
              ? 'bg-secondary text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Top-rated Food Items
        </Button>
        <Button
          variant={chartType === 'lowestRated' ? 'zuno-light' : 'light'}
          onClick={() => setChartType('lowestRated')}
          className={`px-4 py-2 rounded-full transition-colors ${
            chartType === 'lowestRated'
              ? 'bg-secondary text-white'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Lowest-rated Food
        </Button>
        <div className="relative ml-auto">
          <button
            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-700"
          >
            <span className="capitalize">{period}</span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {showPeriodDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1 z-10">
              {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(p => (
                <button
                  key={p}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                    period === p ? 'text-secondary' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    setPeriod(p);
                    setShowPeriodDropdown(false);
                  }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={currentData}
            barSize={40}
            onMouseMove={(state: any) => {
              if (state.isTooltipActive) {
                setHoveredBar(state.activeTooltipIndex);
              } else {
                setHoveredBar(null);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={chartType === 'topRated' ? [4.0, 4.8] : [3.0, 3.8]}
              ticks={
                chartType === 'topRated'
                  ? [4.0, 4.2, 4.4, 4.6, 4.8]
                  : [3.0, 3.2, 3.4, 3.6, 3.8]
              }
              dx={-10}
            />
            <Tooltip
              content={<CustomTooltip chartData={currentData} />}
              cursor={false}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {currentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={hoveredBar === index ? '#FF6E01' : '#FFE4CC'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeedbackChart;
