import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './userProfile.css'; // Assuming you'll add a CSS file for styling
import { Avatar } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AboutUser from '../AboutUser/AboutUser';
import UserProfileBottom from '../../components/UserProfileBottom/UserProfileBottom';
import Navbar from '../../components/Navbar/Navbar';
import MessangerIcon from '../../components/Icons/MessangerIcon';
import FollowIcon from '../../components/Icons/FollowIcon';
import GroupAddSharpIcon from '@mui/icons-material/GroupAddSharp';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { ThemeContext } from '../../App';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const { author, token } = location.state;
    const navigate = useNavigate();
    const [showAbout, setShowAbout] = useState(false); 
    const [activeTab, setActiveTab] = useState('posts');
    const {darkTheme} = useContext(ThemeContext)

    const handleAboutClick = () => {
      setShowAbout(true); 
      setActiveTab('about')
    };

    const handlePostClick = () => {
        setShowAbout(false); 
        setActiveTab('posts')
      };

      const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    
  
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userId = author?._id;

                if (!userId) {
                    throw new Error("User ID is undefined or invalid");
                }

                const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/user/${userId}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'projectID': 'f104bi07c490',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status} ${response.statusText}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response from server");
                }

                const data = await response.json();
                if (data.status === 'success') {
                    setUser(data.data);
                } else {
                    setError('Failed to fetch user profile.');
                }
            } catch (err) {
                console.error("Error fetching user profile:", err.message);
                setError('An error occurred while fetching the user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [author, token]);

    useEffect(() => {
      const fetchUserInfo = async () => {
          setLoading(true);
          try {
              const userId = author?._id;
  
              if (!userId) {
                  throw new Error("User ID is undefined or invalid");
              }
  
              const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/user/${userId}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'projectID': 'f104bi07c490',
                  },
              });
  
              if (!response.ok) {
                  throw new Error(`Server Error: ${response.status} ${response.statusText}`);
              }
  
              const contentType = response.headers.get("content-type");
              if (!contentType || !contentType.includes("application/json")) {
                  throw new Error("Received non-JSON response from server");
              }
  
              const data = await response.json();
              if (data.status === 'success') {
                  setUserInfo(data.data);
              } else {
                  setError('Failed to fetch user profile.');
              }
          } catch (err) {
              console.error("Error fetching user profile:", err.message);
              setError('An error occurred while fetching the user profile.');
          } finally {
              setLoading(false);
          }
      };
  
      fetchUserInfo();
  }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <div className={`main-container ${darkTheme ? 'dark' : ''}`}>
            <Navbar/>
        <div className="profile-container">
                    <div className="cover-photo">
                        <img src="https://w0.peakpx.com/wallpaper/620/98/HD-wallpaper-cartoons-cartoons.jpg" alt="Cover" />
                    </div>

        
                    <div className="profile-info">
                        <div className="profile-avatar">
                            <Avatar src={author.profileImage} alt="Profile" className="profile-photo" />
                        </div>
                        <h1>{author.name}</h1> 
                    <div className='add-stroy-btn'>
                        <button><GroupAddSharpIcon/>Friends</button>
                        <button><MessangerIcon fontSize="large"/> Message</button>
                    
                    </div>
                    </div>
                <div className='profile-tabs-actions'>
                <div className="profile-tabs">
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
                    {/* <button>More</button> */}
                </div>
                    <div className="profile-actions">
                        <button className="btn-follow"><FollowIcon/> Follow</button>
                        <button className="btn-more"><MoreHorizIcon fontSize="small" /></button>
                    </div> 
                </div> 
           </div>
              
          </div>  
          <div style={{ backgroundColor: darkTheme ? '#242526' : '' }}>
          {showAbout ? <AboutUser /> : <UserProfileBottom user={user} userInfo={userInfo} />}
           </div> 
        </>
    );
};

export default UserProfile;
