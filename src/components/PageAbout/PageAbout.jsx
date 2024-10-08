import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '../Icons/EmailIcon';
import GenderIcon from '../Icons/GenderIcon';
import ClockIcon from '../Icons/ClockIcon';
import CallIcon from '@mui/icons-material/Call';
import "./pageAbout.css"

const PageAbout = ({user, userInfo}) => {
    const [activeTab, setActiveTab] = useState('overview');
    console.log("user :", user)
    console.log("userInfo :", userInfo)

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <div className='about-user'>
        <div className='about-container'>
          <div className='about-tabs'>
            <h2>About</h2>
            <button
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => handleTabClick('overview')}
            >
              Overview
            </button>
            <button
              className={activeTab === 'work' ? 'active' : ''}
              onClick={() => handleTabClick('work')}
            >
              Work and Education
            </button>
            <button
              className={activeTab === 'places' ? 'active' : ''}
              onClick={() => handleTabClick('places')}
            >
              Places Lived
            </button>
            <button
              className={activeTab === 'skills' ? 'active' : ''}
              onClick={() => handleTabClick('skills')}
            >
              Skills
            </button>
          </div>
          <div className='about-content'>
            {activeTab === 'overview' && (
                <div className="page-user-info">
                <h3>Contact and Basic Info</h3>
                <div className="page-user-info-item">
                    <PersonIcon />
                    <p>{userInfo.owner.name}</p>
                </div>
                <div className="page-user-info-item">
                    <CallIcon />
                    <p>123456789</p>
                </div>
                <div className="page-user-info-item">
                    <EmailIcon />
                    <p>{userInfo.owner.email}</p>
                </div>
                <div className="page-user-info-item">
                    <GenderIcon />
                    <p>Male</p>
                </div>
                <div className="page-user-info-item">
                    <ClockIcon />
                    <p>{userInfo.createdAt}</p>
                </div>
            </div>
            )}
            {activeTab === 'work' && (
              <>
                <h3>Work and Education</h3>
                <p>Details about work and education</p>
              </>
            )}
            {activeTab === 'places' && (
              <>
                <h3>Places Lived</h3>
                <p>Details about places lived</p>
              </>
            )}
            {activeTab === 'skills' && (
              <>
                <h3>Skills</h3>
                <p>Details about skills</p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

export default PageAbout
