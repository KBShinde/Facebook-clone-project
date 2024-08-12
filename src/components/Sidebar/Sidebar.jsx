import React from 'react';
import SidebarRow from '../SidebarRow/SidebarRow';
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
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isMobileView }) => {
  return (
    <div className={`sidebar ${isMobileView ? "mobile-hidden" : ""}`}>
      <SidebarRow
        src="https://scontent.fnag1-2.fna.fbcdn.net/v/t39.30808-1/422651585_1815836778878823_1035706584452166146_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=u2rmnVB71eUQ7kNvgFbd2wT&_nc_ht=scontent.fnag1-2.fna&oh=00_AYDv0jgm8cL_OKksNtP-Ud9cXAIZro8NCTVKBg9pQgJgGw&oe=66BCC1B3"
        title="Kunal Shinde"
      />
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


