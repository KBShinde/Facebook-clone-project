import React from 'react';
import './userMenu.css';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';

const UserMenu = () => {
  const storedUser = localStorage.getItem('user');
  console.log('userName', storedUser)
  return (
    <div className="user-menu-container">
            <div className="user-menu-header">
            <div className="user-info">
                <AccountCircleIcon className="menu-icon-profile" />
                <h3>Kunal Shinde</h3>
            </div>
            <p>See all profiles</p>
            </div>

      <ul className="user-menu-list">
        <li className="user-menu-item">
          <SettingsIcon className="menu-icon" />
          Settings & privacy
        </li>
        <li className="user-menu-item">
          <HelpOutlineIcon className="menu-icon" />
          Help & support
        </li>
        <li className="user-menu-item">
          <Brightness4Icon className="menu-icon" />
          Dark mode
        </li>
        <li className="user-menu-item">
          <FeedbackIcon className="menu-icon" />
          Give feedback
        </li>
        <li className="user-menu-item">
          <LogoutIcon className="menu-icon" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
