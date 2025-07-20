/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { FiUsers } from 'react-icons/fi';
import { components } from 'react-select';


export const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #7c3aed',
    borderRadius: '12px',
    minHeight: '48px',
    paddingLeft: '40px',
    boxShadow: 'none',
    '&:hover': { borderColor: '#7c3aed' }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#7c3aed' : 'white',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': { backgroundColor: '#ede9fe', color: 'black' }
  }),
  singleValue: (provided) => ({ ...provided, color: '#7c3aed' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (provided) => ({ ...provided, color: '#7c3aed', '&:hover': { color: '#7c3aed' } })
};

// Custom control component with icon
export const CustomControl = ({ children, ...props }) => {
  return (
    <div style={{ position: 'relative' }}>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
        <FiUsers className="text-xl" />
      </div>
      <components.Control {...props}>{children}</components.Control>
    </div>
  );
};