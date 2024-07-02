import React, { useState } from 'react';
import Account from './ButtonAccount';
import Search from './ButtonSearch';
import Notification from './Notification';
import { Link } from 'react-router-dom';
const Header = () => {
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [showNotificationForm, setShowNotificationForm] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);

  const toggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  const toggleNotificationForm = () => {
    setShowNotificationForm(!showNotificationForm);
  };

  const toggleAccountForm = () => {
    setShowAccountForm(!showAccountForm);
  };

  return (
    <div className="flex w-full h-14 md:h-14 justify-between items-center px-4 lg:fixed lg:top-0 lg:z-50 bg-white shadow-md">
      <div className="flex items-center">
        <Link to={"/homePage"}>
        <img
          src="./images/f_logo_RGB-Blue_1024.png"
          className="w-9 md:w-10"
        />
        </Link>
        <div className="bg-gray-100 lg:flex w-8 h-8 md:w-8 lg:w-64 lg:h-10 rounded-full mx-2" onClick={toggleSearchForm}>
          <img
            className="w-5 mx-1.5 mt-1.5 lg:w-7 lg:h-5 lg:mt-2.5"
            src="./images/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={30}
          />
          <input
            placeholder="Search Facebook"
            className="hidden text-sm lg:block focus:outline-none bg-transparent w-full"
          />
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-between md:space-x-2">
        <button className="relative md:flex block md:hidden justify-center items-center py-3 group">
          <img
            src="./images/menu_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </div>
        </button>
        <button className="relative md:flex hidden border-b-2 border-blue-400 justify-center items-center py-3 px-3 lg:px-6 group">
          <img
            src="./images/home_24dp_FILL0_wght400_GRAD0_opsz24.svg"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </div>
        </button>
        <button className="relative md:flex hidden justify-center items-center py-3 px-3 lg:px-10 group">
          <img
            src="./images/live_tv_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Live
          </div>
        </button>
        <button className="relative md:flex hidden justify-center items-center py-3 px-3 lg:px-10 group">
          <img
            src="./images/storefront_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Store
          </div>
        </button>
        <button className="relative md:flex hidden justify-center items-center py-3 px-3 lg:px-10 group">
          <img
            src="./images/groups_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Group
          </div>
        </button>
        <button className="relative md:flex hidden justify-center items-center py-3 px-3 lg:px-10 group">
          <img
            src="./images/sports_esports_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Game
          </div>
        </button>
      </div>
      <div className="relative flex items-center md:w-18 lg:w-80">
        <button className="relative bg-gray-200 w-8 h-8 md:w-10 md:h-10 rounded-full lg:ml-32 group">
          <img
            className="w-5 mx-1.5 mt-0.5 md:w-7"
            src="./images/add_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
            height={25}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Add
          </div>
        </button>
        <button className="relative bg-gray-200 w-8 h-8 md:w-10 md:h-10 ml-1.5 md:ml-2 rounded-full group">
          <img
            className="w-5 mx-1.5 mt-0.5 md:w-6 md:ml-2"
            src="./images/png-transparent-bubble-chat-facebook-messenger-messenger-logo-social-media-solid-icon.png"
            width={32}
            height={25}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Messenger
          </div>
        </button>
        <button className="relative bg-gray-200 w-8 h-8 md:w-10 md:h-10 ml-1.5 md:ml-2 rounded-full group" onClick={toggleNotificationForm}>
          <img
            className="w-5 mx-1.5 mt-0.5 md:w-7"
            src="./images/Notification logo-271120.png"
            width={32}
            height={25}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Notification
          </div>
        </button>
        <button className="relative bg-gray-200 w-8 h-8 md:w-10 md:h-10 ml-1.5 md:ml-2 rounded-full group" onClick={toggleAccountForm}>
          <img
            className="w-5 mx-1.5 mt-0.5 md:w-7"
            src="./images/account_circle_24dp_FILL0_wght400_GRAD0_opsz24.png"
            width={32}
            height={25}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-max p-2 bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            Account
          </div>
        </button>
        {showNotificationForm && (
          <Notification
            showNotificationForm={showNotificationForm}
            toggleNotificationForm={toggleNotificationForm}
          />
        )}
        {showAccountForm && (
          <Account
            showAccountForm={showAccountForm}
            toggleAccountForm={toggleAccountForm}
          />
        )}
      </div>
      {showSearchForm && (
        <Search
          showSearchForm={showSearchForm}
          toggleSearchForm={toggleSearchForm}
        />
      )}
    </div>
  );
};

export default Header;
