import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const Search = ({ showSearchForm, toggleSearchForm, searchValue1 }) => {
  const searchFormRef = useRef(null);
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState(searchValue1 || ''); // Initialize with empty string if searchValue1 is undefined
  const [formVisible, setFormVisible] = useState(true); // State to control form visibility
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
      toggleSearchForm();
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value || ''); // Set to empty string if undefined
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      navigate(`/search?searchValue=${searchValue}`);
      setFormVisible(false); // Hide form after search
    }
  };

  useEffect(() => {
    if (showSearchForm) {
      document.addEventListener('mousedown', handleClickOutside);
      inputRef.current.focus(); // Focus on input when form is shown
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchForm]);

  return (
    formVisible && showSearchForm && ( // Check formVisible to decide whether to show form
      <div ref={searchFormRef} className="fixed top-0 left-0 rounded-md w-80 max-h-[670px] bg-white shadow-lg z-50">
        <div className='flex items-center mt-2'>
          <img
            className='w-6 cursor-pointer'
            src='../images/arrow_back_24dp_FILL0_wght400_GRAD0_opsz24.png'
            onClick={toggleSearchForm}
          />
          <div className="bg-gray-100 flex items-center ml-4 h-10 rounded-full">
            <img
              className="w-5 mx-1.5 mt-1.5"
              src="../images/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
              width={30}
            />
            <input
              ref={inputRef}
              placeholder="Search Facebook"
              className="text-sm focus:outline-none bg-transparent w-full"
              value={searchValue}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className='flex justify-between mt-2 ml-1'>
          <h1 className='font-bold text-lg'>Recent</h1>
          <p className='text-blue-600 mr-6'>Edit</p>
        </div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className='flex items-center justify-between ml-1 mt-2 mb-5'>
            <div className='flex'>
              <img className='w-9 h-9 rounded-full' src='../images/18d97bf8ec274f791636.jpg' />
              <p className='font-bold text-md ml-2'> Ta Minh Tri</p>
            </div>
            <div>
              <img className='w-6 h-6 mr-7' src='../images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png' />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Search;
