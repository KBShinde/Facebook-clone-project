import React, { useState } from 'react';
import './mobileView.css';

import EmojiFlags from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import MessangerIcon from "../Icons/MessangerIcon";
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MemoryIcon from '@mui/icons-material/Memory'; 
import BookmarkIcon from '@mui/icons-material/Bookmark'; 
import GroupIcon from '@mui/icons-material/Group';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import EventIcon from '@mui/icons-material/Event';
import CampaignIcon from '@mui/icons-material/Campaign';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import GamepadIcon from '@mui/icons-material/Gamepad';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'; 
import HelpIcon from '@mui/icons-material/Help'; 
import Brightness4Icon from '@mui/icons-material/Brightness4';
import FeedbackIcon from '@mui/icons-material/Feedback'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const MobileView = () => {
    const [isVisible, setIsVisible] = useState(true); 
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));
    const{darkTheme, toggleTheme} = useContext(ThemeContext)

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }

    const handleClose = () => {
      setIsVisible(false); 
    };
    if (!isVisible) return null;
  
  return (
    <div className={`mobile-view ${darkTheme ? 'dark' : ''}`}>
      <div className='mobile-view-top'>
        <div className='mobile-view-menu'>
          <KeyboardBackspaceIcon onClick ={handleClose} />
          <h1>Menu</h1>
        </div>
        <div className='mobile-view-profile'>
          <Avatar />
          <div>
            <h3>{user.name}</h3>
            <p>View your profile</p>
          </div>
        </div>
      </div>
      <div className="mobile-view-middle">
        <div className="mobile-menu-column">
          <div className="mobile-menu-item">
            <EmojiFlags />
            <span>Pages</span>
          </div>
          <div className="mobile-menu-item">
            <PeopleIcon />
            <span>Groups</span>
          </div>
          <div className="mobile-menu-item">
            <VideoLibraryIcon />
            <span>Videos</span>
          </div>
          <div className="mobile-menu-item">
            <StorefrontIcon />
            <span>Marketplace</span>
          </div>
          <div className="mobile-menu-item">
            <MemoryIcon />
            <span>Memories</span>
          </div>
          <div className="mobile-menu-item">
            <BookmarkIcon />
            <span>Saved</span>
          </div>
          <div className="mobile-menu-item">
            <DynamicFeedIcon />
            <span>Feeds</span>
          </div>
          <div className="mobile-menu-item">
            <EventIcon />
            <span>Events</span>
          </div>
        </div>
        <div className="mobile-menu-column">
          <div className="mobile-menu-item">
            <MessangerIcon />
            <span>Messenger</span>
          </div>
          <div className="mobile-menu-item">
            <SportsEsportsIcon />
            <span>Gaming Video</span>
          </div>
          <div className="mobile-menu-item">
            <PaymentIcon />
            <span>Facebook Pay</span>
          </div>
          <div className="mobile-menu-item">
            <FavoriteIcon />
            <span>Fundraisers</span>
          </div>
          <div className="mobile-menu-item">
            <ChildCareIcon />
            <span>Messenger Kids</span>
          </div>
          <div className="mobile-menu-item">
            <GamepadIcon />
            <span>Play Games</span>
          </div>
          <div className="mobile-menu-item">
            <GroupIcon />
            <span>Friends</span>
          </div>
          <div className="mobile-menu-item">
            <CampaignIcon />
            <span>Ads Manager</span>
          </div>
        </div>
      </div>
      <div className='mobile-view-bottom'>
        <div className='mobile-menu-item'>
          <SettingsIcon />
          <span>Settings & Privacy</span>
        </div>
        <div className='mobile-menu-item'>
          <HelpIcon />
          <span>Help & Support</span>
        </div>
        <div className='mobile-menu-item' onClick={toggleTheme}>
          <Brightness4Icon />
          <span>{darkTheme ? "Light mode" : "Dark mode"}</span>
        </div>
        <div className='mobile-menu-item'>
          <FeedbackIcon />
          <span>Give Feedback</span>
        </div>
        <div className='mobile-menu-item'>
          <LogoutIcon />
          <span onClick={handleLogout}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
