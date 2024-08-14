import React from 'react';
import SidebarRow from '../SidebarRow/SidebarRow'; // Ensure correct path
import LocalHospital from '@mui/icons-material/LocalHospital';
import EmojiFlags from '@mui/icons-material/EmojiFlags';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExpandMoreOutlined from '@mui/icons-material/ExpandMoreOutlined';
import MemoryIcon from '@mui/icons-material/Memory'; 
import BookmarkIcon from '@mui/icons-material/Bookmark'; 
import RssFeedIcon from '@mui/icons-material/RssFeed'; 
import "./sidebar.css";

const Sidebar = ({ isMobileView }) => {
  return (
    <div className={`sidebar ${isMobileView ? "mobile-hidden" : ""}`}>
      <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" 
         target="_blank" 
         rel="noopener noreferrer"
         style={{ textDecoration: "none", color: "inherit" }}>
        <SidebarRow Icon={LocalHospital} title="COVID-19 Information Center" />
      </a>
      <SidebarRow Icon={EmojiFlags} title="Pages" />
      <SidebarRow Icon={PeopleIcon} title="Friends" />
      <SidebarRow Icon={BookmarkIcon} title="Saved" />  
      <SidebarRow Icon={ChatIcon} title="Messenger" />
      <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
      <SidebarRow Icon={RssFeedIcon} title="Feeds" />
      <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
      <SidebarRow Icon={MemoryIcon} title="Memories" /> 
      <SidebarRow Icon={ExpandMoreOutlined} title="See More" />
    </div>
  );
};

export default Sidebar;
