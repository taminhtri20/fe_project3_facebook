import React, { useState, useEffect, useRef } from 'react';

const Search = ({ showSearchForm, toggleSearchForm }) => {
  const searchFormRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
      toggleSearchForm();
    }
  };

  useEffect(() => {
    if (showSearchForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchForm]);

  return (
    showSearchForm && (
      <div ref={searchFormRef} className="fixed top-0 left-0 rounded-md w-80 max-h-[670px] bg-white shadow-lg z-50">
        <div className='flex items-center mt-2'>
          <img
            className='w-6'
            src='./images/arrow_back_24dp_FILL0_wght400_GRAD0_opsz24.png'
            onClick={toggleSearchForm}
          />
          <div className="bg-gray-100 flex items-center ml-4 h-10 rounded-full">
            <img
              className="w-5 mx-1.5 mt-1.5"
              src="./images/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
              width={30}
            />
            <input
              placeholder="Search Facebook"
              className="text-sm focus:outline-none bg-transparent w-full"
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
              <img className='w-9 h-9 rounded-full' src='./images/18d97bf8ec274f791636.jpg' />
              <p className='font-bold text-md ml-2'> Ta Minh Tri</p>
            </div>
            <div>
              <img className='w-6 h-6 mr-7' src='./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png' />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Search;
