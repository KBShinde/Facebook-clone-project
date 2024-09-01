import "./viewPage.css";
import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Promote from "../../components/Icons/Promote";
import ViewPageBottom from "../../components/ViewPageBottom/ViewPageBottom";
import { useLocation } from "react-router-dom";
import PageAbout from "../../components/PageAbout/PageAbout";
import FollowIcon from "../../components/Icons/FollowIcon";
import MessangerIcon from "../../components/Icons/MessangerIcon";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const ViewPage = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [showAbout, setShowAbout] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const location = useLocation();
  const { pageId, token } = location.state;
  const {darkTheme} = useContext(ThemeContext)

  const handleAboutClick = () => {
    setShowAbout(true);
    setActiveTab('about');
  };

  const handlePostClick = () => {
    setShowAbout(false);
    setActiveTab('posts');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!pageId) {
          throw new Error("Page ID is undefined or invalid");
        }

        const postsResponse = await fetch(`https://academics.newtonschool.co/api/v1/facebook/channel/${pageId}/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': 'f104bi07c490',
          },
        });

        if (!postsResponse.ok) {
          throw new Error(`Server Error: ${postsResponse.status} ${postsResponse.statusText}`);
        }

        const postsData = await postsResponse.json();
        if (postsData.status === 'success') {
          setUser(postsData.data);
        } else {
          setError('Failed to fetch user posts.');
        }

        const userInfoResponse = await fetch(`https://academics.newtonschool.co/api/v1/facebook/channel/${pageId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'projectID': 'f104bi07c490',
          },
        });

        if (!userInfoResponse.ok) {
          throw new Error(`Server Error: ${userInfoResponse.status} ${userInfoResponse.statusText}`);
        }

        const userInfoData = await userInfoResponse.json();
        if (userInfoData.status === 'success') {
          setUserInfo(userInfoData.data);
        } else {
          setError('Failed to fetch user info.');
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError('An error occurred while fetching the user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`page-main-container ${darkTheme ? 'dark' : ''}`}>
      <div className='page-main-container'>
        <Navbar />
        <div className="page-profile-container">
          <div className="page-cover-photo">
            <img src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Cover" />
          </div>

          <div className="page-profile-info">
            <div className="page-profile-avatar">
              <Avatar src={userInfo.profileImage} alt="Profile" className="page-profile-photo" />
            </div>
            <h1>{userInfo.name}</h1>
            <div className='story-friends-btn'>
              <button><FollowIcon /> Follow</button>
              <button><Promote />Promote</button>
            </div>
          </div>
          <div className='page-profile-tabs-actions'>
            <div className="page-profile-tabs">
              <button
                className={activeTab === 'posts' ? 'active' : ''}
                onClick={handlePostClick}
              >
                Posts
              </button>
              <button
                className={activeTab === 'about' ? 'active' : ''}
                onClick={handleAboutClick}
              >
                About
              </button>
              <button>Friends</button>
              <button>Photos</button>
              <button>Videos</button>
            </div>
            <div className="page-profile-actions">
              <button className="page-btn-message"><MessangerIcon fontSize="large" /> Message</button>
              <button className="page-btn-more"><MoreHorizIcon fontSize="small" /></button>
            </div>
          </div>
        </div>
        <div className="view-page-bottom-container">
          {showAbout ? (
            <PageAbout user={user} userInfo={userInfo}/>
          ) : (
            <ViewPageBottom user={user} userInfo={userInfo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
