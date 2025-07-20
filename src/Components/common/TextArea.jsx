import React from 'react';
import toast from 'react-hot-toast';

const TextArea = ({ name, value, onChange, rows, cols, placeholder }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 650) {
      toast.error('Not More Than 650 Letters');
      return;
    }
    onChange(e);
  };

  return (
    <>
      <label className="text-xs font-medium text-[#8800ff] my-3">
        {placeholder}
      </label>
      <textarea
        value={value}
        name={name}
        onChange={handleChange}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        className="px-2 py-3 bg-white w-full text-sm border-2 focus:border-violet-500 focus:border-1 rounded-lg focus:ring-0 focus:outline-none border-violet-500"
      />
      <p className="text-xs text-gray-500 mt-1">
        {value?.length}/650 characters
      </p>
    </>
  );
};

export default TextArea;
