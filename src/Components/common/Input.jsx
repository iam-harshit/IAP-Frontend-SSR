import React from 'react';

const Input = ({ type, placeholder, name, value, onChange, className }) => {
  // Fields that should only contain letters and spaces
  const textOnlyFields = [
    'full_name',
    'city',
    'state',
    'institution',
    'degree',
  ];

  // Fields that should allow letters & numbers but no special symbols
  const alphanumericFields = ['title'];

  // Prevents invalid characters from being typed
  const handleKeyDown = (e) => {
    if (textOnlyFields.includes(name) && /[^a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    } else if (
      alphanumericFields.includes(name) &&
      /[^a-zA-Z0-9\s]/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  // Validates input and removes unwanted characters if pasted
  const validateInput = (e) => {
    let newValue = e.target.value;

    if (textOnlyFields.includes(name)) {
      newValue = newValue.replace(/[^a-zA-Z\s]/g, ''); // Only letters & spaces
    } else if (alphanumericFields.includes(name)) {
      newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Allow letters & numbers only
    }

    onChange({ target: { name, value: newValue } }); // Update state
  };

  return (
    <div
      className={
        className
          ? className
          : `flex flex-col gap-1 ${name === 'full_name' ? 'col-span-2' : 'col-span-1'}`
      }
    >
      {name !== 'link' && (
        <label className="text-sm font-medium my-3 text-[#8800ff]">
          {placeholder}
        </label>
      )}

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="px-2 py-3 bg-white w-full text-sm border-2 focus:border-violet-500 focus:border-1 rounded-lg focus:ring-0 focus:outline-none border-violet-500"
        value={value ?? ''}
        onChange={validateInput}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Input;
