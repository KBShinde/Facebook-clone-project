import React, { useState, useEffect } from "react";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from "../Sidebar/Sidebar";
import Messanger from "../Messanger/Messanger";
import Notifications from "../Notifications/Notifications";
import MessangerIcon from "../Icons/MessangerIcon";
import MenuIconSvg from "../Icons/MenuIconSvg";
import Bell from "../Icons/Bell";
import UserMenu from "../UserMenu/UserMenu";
import NavbarMenu from "../NavbarMenu.jsx/NavbarbarMenu";
import { useNavigate } from "react-router-dom";




const Navbar = ({ data = [] }) => {
  const [searchOpen, setSearchOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messangerOpen, setMessangerOpen] = useState(false);
  const [userMenuOpen, setuserMenuOpen] = useState(false);
  const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null); 
  const navigate = useNavigate()
  const [activeOption, setActiveOption] = useState('home');

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
          const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/post?search={"author.name":"${encodeURIComponent(searchQuery)}"}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'projectID': 'f104bi07c490',
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Full response data:", data);

          if (data && Array.isArray(data.data)) {
            const seenIds = new Set();
            const uniqueResults = data.data.filter(result => {
              if (seenIds.has(result.author.name)) {
                return false; 
              } else {
                seenIds.add(result.author.name);
                return true;
              }
            });

            setSearchResults(uniqueResults);
          } else {
            console.warn("Unexpected data structure:", data);
            setSearchResults([]);
          }
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

  const handleSearchIconClick = () => {
    setSearchOpen(true);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      setSearchResults([]);
    }
  };

  const handleCloseSearch = () => {
    setSearchQuery(""); 
    setSearchResults([]); 
  };

  const handleNavbarMenuClick = () => {
    setActiveIcon('menu'); 
    setNavbarMenuOpen(!navbarMenuOpen);
    setMessangerOpen(false);
    setuserMenuOpen(false);
    setNotificationsOpen(false)
  };

  const handleNotificationsClick = () => {
    setActiveIcon('bell'); 
    setNotificationsOpen(!notificationsOpen);
    setMessangerOpen(false);
    setuserMenuOpen(false);
    setNavbarMenuOpen(false)
  };

  const handleOpenMessangerClick = () => {
    setActiveIcon('messanger'); 
    setMessangerOpen(!messangerOpen);
    setNotificationsOpen(false);
    setuserMenuOpen(false);
    setNavbarMenuOpen(false)
  };

  const handleUserMenuClick = () => {
    setActiveIcon('avatar'); 
    setuserMenuOpen(!userMenuOpen);
    setMessangerOpen(false);
    setNotificationsOpen(false);
    setNavbarMenuOpen(false)
  };
  const handlePages = () => {
    setActiveOption('pages');
    navigate('/pages')
    
};

const handleHome = () => {
  setActiveOption('home');
  navigate('/home');
};
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwu8iD2o8LcgH2QPhFMH4aiWYJitD4Eu7hchjdam4zH0pjGRr"
          alt="Facebook Logo"
        />
        <div className={`navbar-input ${searchOpen ? "active" : ""}`}>
          <SearchIcon onClick={handleSearchIconClick} />
          <input
            type="text"
            placeholder="Search Facebook"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={searchOpen ? "open" : ""}
          />
          {searchQuery && (
            <div className="search-container">
              <CloseIcon
                style={{ color: '#888', cursor: 'pointer' }}
                onClick={handleCloseSearch}
                className="search-close"
              />
              {searchResults.length > 0 ? (
                <div className="search-results">
                  {searchResults.map(result => (
                    <div key={result._id} className="search-result">
                      <Avatar
                        style={{
                          border: '2px solid #333',
                          backgroundColor: '#f0f0f0',
                          color: 'white', 
                        }}
                      />
                      <h4>{result.author.name}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="search-results">
                  <p>No results found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="navbar-middle">
      <div
        className={`navbar-option ${activeOption === 'home' ? 'active' : ''}`}
        onClick={handleHome}
      >
        <HomeIcon />
      </div>
      <div
        className={`navbar-option ${activeOption === 'pages' ? 'active' : ''}`}
        onClick={handlePages}
      >
        <FlagIcon />
      </div>
        <div className="navbar-option">
          <SubscriptionsIcon  />
        </div>
        <div className="navbar-option">
          <StorefrontIcon/>
        </div>
        <div className="navbar-option">
          <GroupsIcon />
        </div>
      </div>

      <div className="navbar-right">
        <IconButton className={`navbar-right-icons ${activeIcon === 'menu' ? 'active' : ''}`} onClick={handleNavbarMenuClick}>
          <MenuIconSvg />
        </IconButton>
        <IconButton className={`navbar-right-icons ${activeIcon === 'messanger' ? 'active' : ''}`} onClick={handleOpenMessangerClick}>
          <MessangerIcon />
        </IconButton>
        <IconButton className={`navbar-right-icons ${activeIcon === 'bell' ? 'active' : ''}`} onClick={handleNotificationsClick}>
          <Bell />
        </IconButton>
        <IconButton className={`navbar-right-icons ${activeIcon === 'avatar' ? 'active' : ''}`} onClick={handleUserMenuClick}>
          <Avatar />
        </IconButton>
      </div>

      {isMobile && isSidebarOpen && (
        <div className="mobile-sidebar">
          <Sidebar isMobileView={true} />
        </div>
      )}

      {navbarMenuOpen && (
        <div className="navbar-menu-dropdown">
          <NavbarMenu />
        </div>
      )}

      {notificationsOpen && (
        <div className="notifications-dropdown">
          <Notifications />
        </div>
      )}

      {messangerOpen && (
        <div className="messanger-dropdown">
          <Messanger />
        </div>
      )}

      {userMenuOpen && (
        <div className="user-menu-dropdown">
          <UserMenu />
        </div>
      )}
    </div>
  );
};

export default Navbar;
