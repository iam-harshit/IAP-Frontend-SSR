import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const MoreFiltersModal = ({ onClose }) => {
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [onlyTopMentors, setOnlyTopMentors] = useState(false);

  const toggleSelection = (item, setFunction, stateList) => {
    setFunction(
      stateList.includes(item)
        ? stateList.filter((i) => i !== item)
        : [...stateList, item]
    );
  };

  // ✅ Lock scroll when modal opens
  useEffect(() => {
    const originalOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, []);

  const languages = [
    { name: 'English', count: 562 },
    { name: 'Italian', count: 10 },
    { name: 'French', count: 8 },
    { name: 'German', count: 8 },
    { name: 'Russian', count: 7 },
    { name: 'Portuguese', count: 6 },
  ];

  const locations = [
    { name: 'United States', count: 232 },
    { name: 'United Kingdom', count: 102 },
    { name: 'Germany', count: 43 },
    { name: 'Canada', count: 34 },
    { name: 'Netherlands', count: 17 },
    { name: 'Spain', count: 15 },
  ];

  const durations = [
    { label: '30 mins', value: '30' },
    { label: '1 hour', value: '60' },
    { label: '1.5 hours', value: '90' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-md w-full max-w-lg shadow-xl relative flex flex-col max-h-[80vh] mt-24">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mx-auto">More filters</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-purple-700">
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4 space-y-6">
          {/* Locations */}
          <FilterGroup
            title="Locations"
            options={locations}
            selected={selectedLocations}
            setSelected={setSelectedLocations}
            toggleSelection={toggleSelection}
          />

          {/* Languages */}
          <FilterGroup
            title="Languages"
            options={languages}
            selected={selectedLanguages}
            setSelected={setSelectedLanguages}
            toggleSelection={toggleSelection}
          />

          {/* Duration */}
          <div>
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Session Duration</h3>
            <div className="grid grid-cols-2 gap-2">
              {durations.map((d) => (
                <label key={d.value} className="text-sm text-gray-700 flex items-center space-x-2">
                  <input
                    type="radio"
                    name="duration"
                    value={d.value}
                    checked={selectedDuration === d.value}
                    onChange={() => setSelectedDuration(d.value)}
                    className="accent-purple-600"
                  />
                  <span>{d.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-sm font-semibold text-purple-800 mb-2">Settings</h3>
            <label className="text-sm text-gray-700 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={onlyTopMentors}
                onChange={() => setOnlyTopMentors(!onlyTopMentors)}
                className="accent-purple-600"
              />
              <span>Only top mentors</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-white sticky bottom-0">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm font-semibold"
            >
              Show all mentors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterGroup = ({ title, options, selected, setSelected, toggleSelection }) => (
  <div>
    <h3 className="text-sm font-semibold text-purple-800 mb-2">{title}</h3>
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <label key={opt.name} className="text-sm text-gray-700 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selected.includes(opt.name)}
            onChange={() => toggleSelection(opt.name, setSelected, selected)}
            className="accent-purple-600"
          />
          <span>
            {opt.name}{' '}
            <span className="text-gray-400 text-xs">({opt.count})</span>
          </span>
        </label>
      ))}
    </div>
    <button className="text-xs text-purple-600 mt-2 hover:underline">Show more</button>
  </div>
);

export default MoreFiltersModal;
