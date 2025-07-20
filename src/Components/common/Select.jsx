const Select = ({ name, value, onChange, placeholder, options, className }) => {
  return (
    <>
      {name !== 'platform' && (
        <label className="text-xs font-medium text-[#8800ff] my-3 block">
          {placeholder}
        </label>
      )}
      <select
        className={`px-2 py-3 bg-white w-full text-sm border-2 focus:border-violet-500 focus:border-1 rounded-lg focus:ring-0 focus:outline-none border-violet-500  ${className}`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option className="text-left text-black" disabled value="">
          {placeholder}
        </option>
        {options?.map((item, index) => (
          <option
            key={index}
            className="pl-4 py-2 text-black hover:bg-[#4e2fcd] transition duration-200 ease-in-out"
            value={item.name}
          >
            {/* make first letter is capital */}
            {item?.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
