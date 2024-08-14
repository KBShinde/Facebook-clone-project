import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import FeedIcon from '@mui/icons-material/DynamicFeed';
import PagesIcon from '@mui/icons-material/Pages';
import PostAddIcon from '@mui/icons-material/PostAdd';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddBoxIcon from '@mui/icons-material/AddBox';
import './navbarMenu.css'; // Your CSS file for styling

const NavbarMenu = () => {
  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-section-left">
          <h3>Social</h3>

          <List>

            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Friends" secondary="Search for friends or people you know." />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" secondary="Connect with people who share your interests." />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemText primary="Feeds" secondary="See the most recent posts from your friends, Groups, Pages, and more." />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <PagesIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" secondary="Discover and connect with businesses on Facebook." />
            </ListItem>
          </List>
        </div>

        <div className="menu-section-right">
          <h3>Create</h3>

          <List>
            <ListItem button>
              <ListItemIcon>
                <PostAddIcon />
              </ListItemIcon>
              <ListItemText primary="Post" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Create Page" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <VideoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Reel" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <LiveTvIcon />
              </ListItemIcon>
              <ListItemText primary="Live event" />
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Ad" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
