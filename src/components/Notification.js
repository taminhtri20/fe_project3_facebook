import React, { useState, useEffect, useRef } from 'react';

const Notification = ({ showNotificationForm, toggleNotificationForm }) => {
  const notificationFormRef = useRef(null);

  const handleClickOutside = (event) => {
    if (notificationFormRef.current && !notificationFormRef.current.contains(event.target)) {
      toggleNotificationForm();
    }
  };

  useEffect(() => {
    if (showNotificationForm) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationForm]);

  return (
    showNotificationForm && (
      <div ref={notificationFormRef} className="absolute right-0  top-11 rounded-md w-80 bg-white shadow-lg z-50">
        <div className='flex items-center justify-between p-4 border-b'>
          <h2 className='text-lg font-bold'>Notifications</h2>
          <img
            className='w-6 h-6 cursor-pointer'
            src='../images1/close_24dp_FILL0_wght400_GRAD0_opsz24.png'
            onClick={toggleNotificationForm}
          />
        </div>
        <div className='p-4'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                <img className='w-10 h-10 rounded-full' src='../images/18d97bf8ec274f791636.jpg' />
                <p className='ml-3'>Notification {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Notification;
