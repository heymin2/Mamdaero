import React, { useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface DropdownProps {
  selectedOption: string;
  options: string[];
  onOptionClick: (option: string) => void;
}

const AlignDropdown: React.FC<DropdownProps> = ({ selectedOption, options, onOptionClick }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        detailsRef.current.removeAttribute('open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onOptionClick(option);
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };

  return (
    <details ref={detailsRef} className="dropdown">
      <summary className="btn m-1 w-32 shadow-md flex items-center justify-between">
        <span className="truncate">{selectedOption}</span>
        <IoIosArrowDown className="ml-1 flex-shrink-0" />
      </summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow mt-1 z-10">
        {options.map(option => (
          <li key={option}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                handleOptionClick(option);
              }}
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

export default AlignDropdown;