import React, { useState, useEffect } from "react";
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
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(window.innerWidth > 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const closeSidebar = (e) => {
      if (isSidebarOpen && !e.target.closest('.mobile-sidebar') && !e.target.closest('.navbar-right')) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', closeSidebar);
    return () => document.removeEventListener('click', closeSidebar);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/post?search={"field":"${searchQuery}"}`, {
            headers: {
              'projectID': 'f104bi07c490'
            }
          });
          const data = await response.json();
          console.log("dat:" , data)
          setSearchResults(data.results); 
          console.log('data :', data)
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleMoreClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwu8iD2o8LcgH2QPhFMH4aiWYJitD4Eu7hchjdam4zH0pjGRr"
          alt="Facebook Logo"
        />
        <div className={`navbar-input ${searchOpen ? "active" : ""}`}>
          <SearchIcon onClick={() => setSearchOpen(!searchOpen)} />
          {searchOpen && (
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Facebook"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map(result => (
                      <div key={result.id} className="search-result">
                        <p>{result.title}</p> 
                      </div>
                    ))
                  ) : (
                    <p>No results found</p>
                  )}
                </div>
              )}
            </div>
          )}
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
        {isMobile && (
          <IconButton onClick={handleMoreClick}>
            <MenuIcon />
          </IconButton>
        )}
      </div>

      {/* Sidebar handling
      {isMobile && isSidebarOpen && (
        <div className="mobile-sidebar">
          <Sidebar isMobileView={true} />
        </div>
      )}

      {!isMobile && (
        <div className="desktop-sidebar">
          <Sidebar isMobileView={false} />
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
