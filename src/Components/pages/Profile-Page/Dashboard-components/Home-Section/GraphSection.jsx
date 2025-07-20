import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useSelector } from 'react-redux';
import { useGraphData } from '@/services/Operations/DashboardOperation/useGraphData';

const GraphSection = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isMentor = currentUser?.role === 'mentor';
  const { userData, isLoading } = useGraphData(isMentor);

  const chartWidth =
    window.innerWidth < 768 ? 300 : Math.min(800, window.innerWidth - 100);

  return (
    <div className="bg-white shadow rounded-lg border-[0.5px] border-[#680AFF] min-h-full p-4">
      <div className="flex justify-center w-full">
        {isLoading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <p className="text-gray-800 text-h5 font-medium">Loading data...</p>
          </div>
        ) : (
          <LineChart
            width={chartWidth}
            height={280}
            data={userData}
            margin={{ top: 5, right: 5, left: 5, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: chartWidth < 768 ? 14 : 16 }}
              tickSize={8}
            />
            <YAxis
              tick={{ fontSize: chartWidth < 768 ? 14 : 16 }}
              tickSize={8}
            />
            <Tooltip
              contentStyle={{ fontSize: '14px' }}
              labelStyle={{ fontSize: '14px', fontWeight: 'bold' }}
            />
            <Legend
              verticalAlign="bottom"
              height={20}
              align="center"
              wrapperStyle={{
                position: 'relative',
                marginTop: '-10px',
                width: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '16px',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf2"
              name={isMentor ? 'Mentees' : 'Sessions'}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default GraphSection;
