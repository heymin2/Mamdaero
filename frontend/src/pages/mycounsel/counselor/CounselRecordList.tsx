import React, { useState, useEffect, useRef } from 'react';
import ClientCard from '@/components/card/mycounsel/ClientCard';
import Button from '@/components/button/Button';

const CounselRecordList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const clients = [
    { name: '신혜민', id: '1' },
    { name: '허세령', id: '2' },
    { name: '박형준', id: '3' },
    { name: '손동희', id: '4' },
    { name: '이재빈', id: '5' },
    { name: '박주영', id: '6' },
    { name: '홍길동', id: '0' },
  ];
  const [filteredClients, setFilteredClients] = useState(clients);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const newSuggestions = clients
        .map(client => client.name)
        .filter(name => name.toUpperCase().includes(searchTerm.toUpperCase()));
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [searchTerm]);

  const handleSearch = () => {
    const filtered = clients.filter(client =>
      client.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
    setFilteredClients(filtered);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prevIndex =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        setSearchTerm(suggestions[selectedIndex]);
        setSuggestions([]);
      } else {
        handleSearch();
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단바 */}
      <div className="sticky bg-blue-50 top-0 z-10 mb-8">
        <div className="flex flex-col mt-6 mx-16 justify-end">
          <div className="flex justify-between items-center">
            <div className="flex justify-start relative">
              <div className="w-52 relative mr-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  className="input input-bordered w-full h-9"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${index === selectedIndex ? 'bg-gray-200' : ''}`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Button label="검색" color="gray" size="검색" onClick={handleSearch} />
            </div>
            <div className="flex flex-col text-right">
              <div className="text-4xl font-bold ms-8 flex-shrink-0">
                <span className="text-blue-500">내담자 목록</span> 상담내역
              </div>
            </div>
          </div>
          {/* <div className="border-t-2 border-gray-300 mt-2"></div> */}
          <div className=" mt-2"></div>
        </div>
      </div>
      {/* 내담자 목록 */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {filteredClients.map(client => (
              <ClientCard key={client.id} clientName={client.name} clientId={client.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselRecordList;
