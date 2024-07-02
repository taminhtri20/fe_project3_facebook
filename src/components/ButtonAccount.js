import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doLogout } from './AuthContext';

const Account = ({ showAccountForm, toggleAccountForm }) => {
  const accountFormRef = useRef(null);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleClickOutside = (event) => {
    if (accountFormRef.current && !accountFormRef.current.contains(event.target)) {
      toggleAccountForm();
    }
  };

  useEffect(() => {
    if (showAccountForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountForm]);

  return (
    showAccountForm && (
      <div ref={accountFormRef} className="absolute right-0 rounded-md mt-80 w-80 bg-white shadow-lg z-50">
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-bold'>Account</h2>
          <img
            className='w-6 h-6 cursor-pointer'
            src='./images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png'
            onClick={toggleAccountForm}
          />
        </div>
        <div className='p-4'>
          <Link to={'/profile'} className='flex items-center mb-4 hover:bg-gray-100 rounded-md'>
            <img className='w-10 h-10 rounded-full' src='./images/18d97bf8ec274f791636.jpg' />
            <div className='ml-3'>
              <p className='font-bold'>{currentUser.username}</p>
              <p className='text-sm text-gray-600'>View your profile</p>
            </div>
          </Link>
          <div className='mt-4'>
            <div className='flex items-center hover:bg-gray-100 rounded-md'>
                <img
                className='w-5 h-5 rounded-full'
                src='./images/settings-icon-1964x2048-8nigtrtt.png'
                />
            <button className='w-full text-left py-2 px-4'>Settings & Privacy</button>
            </div>
            <div className='flex items-center hover:bg-gray-100 rounded-md'>
            <img
                className='w-5 h-5 rounded-full'
                src='./images/help-icon-png-16.jpg'
                />
            <button className='w-full text-left py-2 px-4'>Help & Support</button>
            </div>
            <div className='flex items-center hover:bg-gray-100 rounded-md'>
            <img
                className='w-5 h-5 '
                src='./images/exit-icon-vector-22391092.jpg'
                />
            <button onClick={()=>{doLogout(navigate)}} className='w-full text-left py-2 px-4'>Log Out</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Account;
