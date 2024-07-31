import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface DropdownProps {
  selectedOption: string;
  options: string[];
  onOptionClick: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedOption, options, onOptionClick }) => {
  const detailsRef = React.useRef<HTMLDetailsElement>(null);

  const handleOptionClick = (option: string) => {
    onOptionClick(option);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };

  return (
    <details ref={detailsRef} className="dropdown">
      <summary className="btn m-1 w-32 shadow-md">
        {selectedOption} <IoIosArrowDown className="ml-1" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow mt-1">
        {options.map(option => (
          <li key={option}>
            <a
              href="#"
              onClick={() => handleOptionClick(option)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              {option}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
