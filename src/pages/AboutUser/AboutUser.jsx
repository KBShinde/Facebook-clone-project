import React, { useState } from 'react';
import './aboutUser.css';

const AboutUser = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
            <>
              <h3>Overview</h3>
              <p>123456789</p>
            </>
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

export default AboutUser;
