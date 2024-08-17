// Inside the PagesDetails.js file

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import {
  AddBox as CreatePageIcon,
  Business as BusinessSuiteIcon,
  Explore as DiscoverIcon,
  Favorite as LikedPagesIcon,
  Email as InvitesIcon,
  List as AllPagesIcon,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import './pagesDetails.css';
import { Avatar } from '@mui/material';
import ViewPage from '../../components/Icons/ViewPage';
import Promote from '../../components/Icons/Promote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PagesDetails = () => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleViewPageClick = (pageId) => {
    navigate('/pages/view-page', {
      state: {
        pageId: pageId,
        token: token,
      },
    });
  };

  useEffect(() => {
    fetchPages(true);
  }, []);

  const fetchPages = async (waiting = false) => {
    if (waiting) {
      setLoading(true);
    }

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/facebook/channel/', {
        headers: {
          'projectID': 'f104bi07c490',
        },
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setPages(data.data);
      } else {
        setError('Failed to fetch posts.');
      }
    } catch (err) {
      setError('An error occurred while fetching posts.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="main-content">
      <div className='navbar-on-page'>
        <Navbar />
      </div>
      <div className="sidebar-pages">
        <div className="back-icon">
          <ArrowBackIcon onClick={handleBackClick} style={{ fontSize: '24px', cursor: 'pointer' }} />
          <h2>Pages</h2>
        </div>

        <ul>
          <p className="create-page">
            + Create new page
          </p>
          <li>
            <BusinessSuiteIcon className="icon" />
            Meta Business Suite
          </li>
          <li>
            <DiscoverIcon className="icon" />
            Discover
          </li>
          <li>
            <LikedPagesIcon className="icon" />
            Liked Pages
          </li>
          <li>
            <InvitesIcon className="icon" />
            Invites
          </li>
          <li>
            <AllPagesIcon className="icon" />
            All Pages
          </li>
        </ul>
      </div>
      <div className="content-page">
        <h2>All pages</h2>
        {pages.map((page, index) => (
          <div key={index} className="page-item">
            <div className="profile-info-page">
              <Avatar src={page.owner.profileImage} alt="Profile" className='page-avatar' />
              <div>
                <h3>{page.name}</h3>
                <p className="date">Created on: {new Date(page.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="page-actions">
              <Button
                startIcon={<ViewPage />}
                className='view-page-btn'
                onClick={() => handleViewPageClick(page._id)}  // Pass the page ID
              >
                View Page
              </Button>
              <Button
                className='promote-btn'
                startIcon={<Promote />}
              >
                Promote
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagesDetails;
