// Notifications component
import React, { useContext } from 'react';
import './notifications.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ThemeContext } from '../../App';

const Notifications = () => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`notifications-container ${darkTheme ? 'dark' : ''}`}>
      <div className="notifications-header">
        <h2>Notifications</h2>
        <MoreHorizIcon className="more-icon" />
      </div>
      <div className="notifications-tabs">
        <button className="tab-button-notification">All</button>
        <button className="tab-button-unread">Unread</button>
      </div>
      <div className='notification-other-tab'>
        <h4>Earlier</h4>
        <p>See all</p>
      </div>
      <div className="notifications-content">
        <h4 className="no-notifications">There is no notification.</h4>
      </div>
      <div className="footer">
        <p>Privacy · Terms · Advertising · Ad Choices · Cookies · Meta © 2024</p>
      </div>
    </div>
  );
}

export default Notifications;

