import React, { useState } from "react";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, IconButton } from "@mui/material";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(window.innerWidth > 768);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwu8iD2o8LcgH2QPhFMH4aiWYJitD4Eu7hchjdam4zH0pjGRr" alt="Facebook Logo" />
        <div className={`navbar-input ${searchOpen ? "active" : ""}`}>
          <SearchIcon onClick={() => setSearchOpen(!searchOpen)} />
          {searchOpen && <input type="text" placeholder="Search Facebook" />}
        </div>
      </div>

      <div className="navbar-middle">
        <div className="navbar-option active">
          <HomeIcon fontSize="large" />
        </div>
        <div className="navbar-option">
          <FlagIcon fontSize="large" />
        </div>
        <div className="navbar-option">
          <SubscriptionsIcon fontSize="large" />
        </div>
        <div className="navbar-option">
          <StorefrontIcon fontSize="large" />
        </div>
        <div className="navbar-option">
          <GroupsIcon fontSize="large" />
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-info">
          <Avatar />
          <h4>Kunal Shinde</h4>
        </div>
        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
