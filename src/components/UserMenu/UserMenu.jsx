
import React, { useContext, useEffect, useState } from 'react';
import './userMenu.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../App';


const UserMenu = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
        setName(user.name);
    }
}, []);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className={`user-menu-container ${darkTheme ? 'dark' : ''}`}>
      <div className="user-menu-header">
        <div className="user-info">
          <AccountCircleIcon fontSize="large" className="menu-icon-profile" />
          <h3>{name}</h3>
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
        <li className="user-menu-item" onClick={toggleTheme}>
          <Brightness4Icon className="menu-icon" />
          {darkTheme ? "Light mode" : "Dark mode"}
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
