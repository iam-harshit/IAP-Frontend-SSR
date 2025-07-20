import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Crown, LineChart as LineChartIcon } from 'lucide-react';
import {
  handleTotalEarning,
  handleTotalMenteesAttended,
  handleMenteesperMonth,
  handleEarningperMonth,
} from '../../../../../services/Operations/PaymentOperation/PaymentApi';

const PriceGraph = () => {
  const [isUsersChart, setIsUsersChart] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 250 });
  const chartContainerRef = useRef(null);
  const [totalEarnings, setTotalEarnings] = useState(null);
  const [totalMentees, setTotalMentees] = useState(null);
  const [userData, setUserData] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  const monthsMap = useMemo(() => ({
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  }), []);

  const defaultMonthlyData = useMemo(() => [
    { month: 'Jan', users: 0, revenue: 10000 },
    { month: 'Feb', users: 0, revenue: 15000 },
    { month: 'Mar', users: 0, revenue: 12000 },
    { month: 'Apr', users: 0, revenue: 18000 },
    { month: 'May', users: 0, revenue: 9000 },
    { month: 'Jun', users: 0, revenue: 20000 },
    { month: 'Jul', users: 0, revenue: 16000 },
    { month: 'Aug', users: 0, revenue: 22000 },
    { month: 'Sep', users: 0, revenue: 14000 },
    { month: 'Oct', users: 0, revenue: 25000 },
    { month: 'Nov', users: 0, revenue: 19000 },
    { month: 'Dec', users: 0, revenue: 23000 },
  ], []);

  const updateDimensions = useCallback(() => {
    if (chartContainerRef.current) {
      const width = chartContainerRef.current.clientWidth;
      setDimensions({ width: width > 0 ? width : 0, height: 250 });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const fetchAllData = useCallback(async () => {
    try {
      const earningsResponse = await handleTotalEarning();
      if (earningsResponse?.data) {
        setTotalEarnings(earningsResponse.data.data.totalEarning);
      }

      const menteesResponse = await handleTotalMenteesAttended();
      if (menteesResponse?.data) {
        setTotalMentees(menteesResponse.data.data.totalMentees);
      }

      const menteesMonthResponse = await handleMenteesperMonth();
      if (menteesMonthResponse?.data) {
        const fetchedData = menteesMonthResponse.data.data || [];

        const completeUserData = defaultMonthlyData.map((monthData) => {
          const matchedMonth = fetchedData.find(
            (item) => monthsMap[item.month] === monthData.month
          );

          return {
            month: monthData.month,
            sessions: matchedMonth ? matchedMonth.mentees || 0 : 0,
            revenue: monthData.revenue,
          };
        });

        setUserData(completeUserData);
      } else {
        setUserData(defaultMonthlyData);
      }

      const earningsMonthResponse = await handleEarningperMonth();
      if (earningsMonthResponse?.data) {
        const fetchedEarningsData = earningsMonthResponse.data.data || [];

        const completeEarningsData = defaultMonthlyData.map((monthData) => {
          const matchedMonth = fetchedEarningsData.find(
            (item) => monthsMap[item.month] === monthData.month
          );

          return {
            month: monthData.month,
            earnings: matchedMonth ? matchedMonth.earning || 0 : 0,
          };
        });

        setEarningsData(completeEarningsData);
      } else {
        setEarningsData(
          defaultMonthlyData.map((m) => ({
            month: m.month,
            earnings: m.revenue,
          }))
        );
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setUserData(defaultMonthlyData);
      setEarningsData(
        defaultMonthlyData.map((m) => ({
          month: m.month,
          earnings: m.revenue,
        }))
      );
    }
  }, [defaultMonthlyData, monthsMap]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const toggleChartView = useCallback(() => {
    setIsUsersChart(prev => !prev);
  }, []);

  const chartData = useMemo(() => 
    isUsersChart ? userData : earningsData
  , [isUsersChart, userData, earningsData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 px-4 mx-auto mb-2 mt-2 gap-4 w-full">
      <div className="bg-gray-100 pr-2 pt-4 rounded-lg shadow-md relative lg:col-span-2 w-full">
        <div className="flex justify-end items-center mb-2">
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={toggleChartView}
          >
            {isUsersChart ? 'View Revenue' : 'View Sessions'}
          </button>
        </div>
        <div className="w-full flex justify-center" ref={chartContainerRef}>
          {dimensions.width > 0 && (
            <LineChart
              width={dimensions.width}
              height={dimensions.height}
              data={chartData}
              margin={{ top: 10, right: 12, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: dimensions.width < 500 ? 12 : 14 }}
                height={dimensions.width < 500 ? 70 : 50}
                angle={dimensions.width < 500 ? -30 : 0}
                textAnchor={dimensions.width < 500 ? 'end' : 'middle'}
              />
              <YAxis tick={{ fontSize: dimensions.width < 500 ? 12 : 14 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={isUsersChart ? 'sessions' : 'earnings'}
                stroke="#8b5cf2"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          )}
        </div>
      </div>

      {/* Card Section */}
      <div className="flex flex-col gap-4 lg:gap-6 w-full">
        {/* Total Earnings Card */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Total Earnings</h1>
            <div className="h-10 w-10 bg-green-200 rounded flex justify-center items-center">
              <LineChartIcon color="#85bd84" size={26} />
            </div>
          </div>
          <div className="text-3xl font-bold mt-2 mb-4">
            {totalEarnings !== null ? `Rs. ${totalEarnings}` : 'Loading...'}
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Total Mentees</h1>
            <div className="h-10 w-10 bg-blue-200 rounded flex justify-center items-center">
              <Crown color="#466eff" size={26} />
            </div>
          </div>
          <div className="text-3xl font-bold mt-2">
            {totalMentees !== null ? totalMentees : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};

const MemoizedPriceGraph = memo(PriceGraph);
MemoizedPriceGraph.displayName = 'PriceGraph';

export default MemoizedPriceGraph;
