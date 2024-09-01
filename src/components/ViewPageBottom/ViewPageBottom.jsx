import "./viewPageBottom.css"
import ClockIcon from "../Icons/ClockIcon";
import EmailIcon from "../Icons/EmailIcon";
import GenderIcon from "../Icons/GenderIcon";
import { IconButton, Tooltip, Avatar } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { formatDistanceToNow } from 'date-fns';
import CommentIcon from "../Icons/CommentIcon";
import FilterIcon from "../Icons/FilterIcon";
import SettingIcon from "../Icons/SettingIcon";
import GridIcon from "../Icons/GridIcon";
import LiveViewIcon from "../Icons/LiveViewIcon";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const ViewPageBottom = ({user, userInfo}) => {
  const {darkTheme} = useContext(ThemeContext)
  return (
    <div className={`page-profile-wrapper ${darkTheme ? 'dark' : ''}`}>
      <div className="page-profile-container-bottom">
      <div className={`page-profile-left ${darkTheme ? 'dark' : ''}`}>
          <div className={`page-profile-intro ${darkTheme ? 'dark' : ''}`}>
            <h2>Intro</h2>
            <div className={`page-intro-item ${darkTheme ? 'dark' : ''}`}>
              <EmailIcon className={`page-intro-icon ${darkTheme ? 'dark' : ''}`} />
              <p>{userInfo.owner.email}</p>
            </div>
            <div className={`page-intro-item ${darkTheme ? 'dark' : ''}`}>
              <GenderIcon className={`page-intro-icon ${darkTheme ? 'dark' : ''}`} />
              <p>Male</p>
            </div>
            <div className={`page-intro-item ${darkTheme ? 'dark' : ''}`}>
              <ClockIcon className={`page-intro-icon ${darkTheme ? 'dark' : ''}`} />
              <p>{userInfo.createdAt}</p>
            </div>
          </div>
          <div className={`page-user-photos ${darkTheme ? 'dark' : ''}`}>
            <h2>Photos</h2>
            <p>See all photos</p>
          </div>
          <div className={`page-user-friends ${darkTheme ? 'dark' : ''}`}>
            <h2>Friends</h2>
            <p>See all friends</p>
          </div>
        </div>


        <div className={`page-user-posts ${darkTheme ? 'dark' : ''}`}>
            <div className={`page-post-header ${darkTheme ? 'dark' : ''}`}>
              <div className={`page-post-header-top ${darkTheme ? 'dark' : ''}`}>
                <h2>Posts</h2>
                <div className="page-post-header-top-btn">
                  <button>
                    <FilterIcon /> Filters
                  </button>
                  <button>
                    <SettingIcon /> Manage posts
                  </button>
                </div>
              </div>
              <div className="page-post-header-bottom">
                <p className="page-live-view">
                  <LiveViewIcon /> Live view
                </p>
                <p>
                  <GridIcon /> Grid view
                </p>
              </div>
            </div>

            {Array.isArray(user) && user.length > 0 ? (
              user.map((p) => (
                <div className={`page-user-post ${darkTheme ? 'dark' : ''}`} key={p.id}>
                  <div className="page-user-post-top">
                    <div className="page-user-post-top-left">
                      <Avatar src={userInfo.profileImage} className="page-user-post-avatar" />
                      <div className="page-user-post-top-info">
                        <h3>{userInfo.name}</h3>
                        <p>{formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`page-user-post-img ${darkTheme ? 'dark' : ''}`}>
                    <p>{p.content}</p>
                    {p.images && p.images.length > 0 && <img src={p.images[0]} alt="" />}
                  </div>
                  <div className={`page-user-likes-comment-count ${darkTheme ? 'dark' : ''}`}>
                    <div className="page-user-count-item">
                      <Tooltip title="Likes">
                        <IconButton>
                          <ThumbUpOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                      <p> Likes</p>
                    </div>
                    <div className="page-user-count-item">
                      <Tooltip title="Comments">
                        <IconButton>
                          <CommentIcon />
                        </IconButton>
                      </Tooltip>
                      <p> Comments</p>
                    </div>
                  </div>
                  <div className={`page-user-post-options ${darkTheme ? 'dark' : ''}`}>
                    <div className="page-user-post-option">
                      <ThumbUpOutlinedIcon />
                      <p>Like</p>
                    </div>
                    <div className="page-user-post-option">
                      <CommentIcon />
                      <p>Comment</p>
                    </div>
                    <div className="page-user-post-option">
                      <ShareOutlinedIcon />
                      <p>Share</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`page-no-posts ${darkTheme ? 'dark' : ''}`}>
                <p>This page has no posts</p>
              </div>
            )}
          </div>

      </div>
    </div>
  );
};


export default ViewPageBottom
