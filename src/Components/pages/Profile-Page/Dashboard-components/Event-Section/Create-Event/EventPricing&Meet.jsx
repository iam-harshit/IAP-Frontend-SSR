/* eslint-disable react/prop-types */
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiLink } from "react-icons/fi";

const PricingSection = ({ formData, handleChange}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="">
      <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
        <FaIndianRupeeSign className="mr-2 text-purple-600 text-md" /> Price
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
          <FaIndianRupeeSign className="text-md" />
        </div>
        <input
          type="number"
          name="slotPrice"
          value={formData.slotPrice}
          onChange={handleChange}
          placeholder="1000"
          min="0"
          max="100000"
          className="w-full px-5 py-3 pl-12 text-md rounded-xl border border-purple-600 bg-white focus:border-purple-500 outline-none shadow-sm"
        />
      </div>
    </div>
    <div className="">
      <label className="flex items-center text-md font-semibold text-indigo-800 mb-1">
        <FiLink className="mr-2 text-purple-600 text-md" /> Meeting Link
      </label>
      <div className="relative">
        <input
          type="url"
          name="meetingLink"
          value={formData.meetingLink}
          onChange={handleChange}
          placeholder="https://meet.example.com/your-event"
          className="w-full px-5 py-3 text-md rounded-xl border border-purple-600 outline-none"
          required
        />
      </div>
    </div>
  </div>

);
export default PricingSection;