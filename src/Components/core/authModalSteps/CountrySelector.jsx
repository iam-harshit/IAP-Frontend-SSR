import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countries } from '@/Constants/countries';
import toast from 'react-hot-toast';
// eslint-disable-next-line react/prop-types
const CountrySelector = ({ onSelectCountry }) => {
  const handleSelect = (e) => {
    const selectedCountry = countries.find(
      (country) => country.code === e.target.value
    );
    onSelectCountry(selectedCountry);
  };
  return (
    <select onChange={handleSelect} className="border p-2 rounded  ">
      <option value="" disabled selected className="">
        Country
      </option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
// eslint-disable-next-line react/prop-types
const PhoneForm = ({ setUserData, userData, isFirstHandler, setLastStep }) => {
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCountry?.name?.length >= 1 && phoneNumber?.length >= 9) {
      setUserData({
        ...userData,
        country: selectedCountry?.name,
        phone: phoneNumber,
      });
      setLastStep(true);
    } else {
      toast.error('Some fields are empty');
    }
  };
  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="country">Select Country:</label>
          <CountrySelector onSelectCountry={handleCountrySelect} />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <div className="flex">
            <div className="mr-2">
              <select
                className="border p-2 rounded"
                onChange={(e) => setPhoneNumber(e.target.value)}
              >
                <option value="" disabled selected className="">
                  Select.....
                </option>
                {selectedCountry && (
                  <option value={selectedCountry.code}>
                    {selectedCountry.code}
                  </option>
                )}
              </select>
            </div>
            <input
              type="text"
              id="phoneNumber"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              className="border p-2 rounded max-w-[10rem]"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-[#A965FF] text-white py-2 px-4 rounded flex flex-grow justify-center"
          >
            Submit
          </button>
          <button
            className="bg-[#e8e8e8] py-2 px-3 rounded-md text-black flex flex-grow justify-center"
            onClick={() => {
              setUserData({
                ...userData,
                country: undefined,
                phone: undefined,
              });
              setLastStep(false);
              isFirstHandler(true);
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};
export default PhoneForm;
