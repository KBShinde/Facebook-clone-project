import React, { useState, useEffect } from 'react';
import './userMenu.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the preferred theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

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
        <li className="user-menu-item" onClick={toggleDarkMode}>
          <Brightness4Icon className="menu-icon" />
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </li>
        <li className="user-menu-item">
          <FeedbackIcon className="menu-icon" />
          Give feedback
        </li>
        <li className="user-menu-item" onClick={handleLogout}>
          <LogoutIcon className="menu-icon" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;


