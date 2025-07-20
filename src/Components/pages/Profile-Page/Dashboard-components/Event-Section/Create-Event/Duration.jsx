/* eslint-disable react/prop-types */
import { FiClock } from "react-icons/fi";

const DurationDisplay = ({ formData }) => (
  <div className="space-y-3">
    <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
      <FiClock className="mr-2 text-purple-600 text-md" />Total Duration
    </label>
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-600 outline-none shadow-sm">
      <div className="text-center">
        <p className="text-5xl font-bold text-purple-700 mb-2">{formData.duration || '0'}</p>
        <p className="text-lg text-purple-600 flex items-center justify-center">
          <FiClock className="mr-2" />Hours
        </p>
      </div>
    </div>
  </div>
);

export default DurationDisplay;