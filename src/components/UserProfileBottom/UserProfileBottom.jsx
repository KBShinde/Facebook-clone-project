import ClockIcon from "../Icons/ClockIcon";
import EmailIcon from "../Icons/EmailIcon";
import GenderIcon from "../Icons/GenderIcon";
import { IconButton, Tooltip, Avatar } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { formatDistanceToNow } from 'date-fns';
import CommentIcon from "../Icons/CommentIcon";
import "./userProfileBottom.css";
import FilterIcon from "../Icons/FilterIcon";
import SettingIcon from "../Icons/SettingIcon";
import GridIcon from "../Icons/GridIcon";
import LiveViewIcon from "../Icons/LiveViewIcon";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const UserProfileBottom = ({ user, userInfo}) => {
const {darkTheme} = useContext(ThemeContext)

  return (
    <div className={`profile-container-bottom ${darkTheme ? 'dark' : ''}`}>
      <div className="profile-left">
        <div className="profile-locked">
          <img
            src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSXRiOKgoyu7ZqEr1mNoMmCCIJtVR_AdZ5fDhJz7nTqhq_te7ri"
            alt=""
          />
          <div>
            <p>You locked your profile</p>
            <h4>Learn more</h4>
          </div>
        </div>
        <div className="profile-intro">
          <h2>Intro</h2>
          <div className="intro-item">
            <EmailIcon className="intro-icon" />
            <p>{userInfo.email}</p>
          </div>
          <div className="intro-item">
            <GenderIcon className="intro-icon" />
            <p>Male</p>
          </div>
          <div className="intro-item">
            <ClockIcon className="intro-icon" />
            <p>{userInfo.createdAt}</p>
          </div>
        </div>
        <div className="user-photos">
          <h2>Photos</h2>
          <p>See all photos</p>
        </div>
        <div className="user-friends">
          <h2>Friends</h2>
          <p>See all friends</p>
        </div>
      </div>

  <div className="user-posts">
  <div className="post-header">
    <div className="post-header-top">
      <h2>Posts</h2>
      <div className="post-header-top-btn">
        <button><FilterIcon/>Filters</button>
        <button><SettingIcon/>Manage posts</button>
      </div>
      </div>
      <div className="post-header-bottom">
        <p className="live-view"><LiveViewIcon/>Live view</p>
        <p><GridIcon/>Grid view</p>
      </div>
     
    </div>
      {Array.isArray(user) && user.map((p) => (
  <div className="user-post" key={p.id}>
    <div className="user-post-top">
      <div className="user-post-top-left">
        <Avatar src={userInfo.profileImage} className="user-post-avatar" />
        <div className="user-post-top-info">
          <h3>{userInfo.name}</h3>
          <p>{formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}</p>
        </div>
      </div>
    </div>
    <div className="user-post-img">
      <p>{p.content}</p>
      {p.images && p.images.length > 0 && (
        <img src={p.images[0]} alt="" />
      )}
    </div>
    <div className="user-likes-comment-count">
      <div className="user-count-item">
        <Tooltip title="Likes">
          <IconButton>
            <ThumbUpOutlinedIcon />
          </IconButton>
        </Tooltip>
        <p>{p.likesCount} </p>
      </div>
      <div className="user-count-item">
        <Tooltip title="Comments">
          <IconButton>
            <CommentIcon />
          </IconButton>
        </Tooltip>
        <p>{p.commentCount}</p>
      </div>
    </div>
    <div className="user-post-options">
      <div className="user-post-option">
        <ThumbUpOutlinedIcon />
        <p>Like</p>
      </div>
      <div className="user-post-option">
        <CommentIcon />
        <p>Comment</p>
      </div>
      <div className="user-post-option">
        <ShareOutlinedIcon />
        <p>Share</p>
      </div>
    </div>
  </div>
))}

        </div>
    </div>
  );
};

export default UserProfileBottom;
