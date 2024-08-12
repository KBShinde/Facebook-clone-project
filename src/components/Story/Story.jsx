import React from 'react';
import './story.css';

const Story = ({ image, profileSrc, title, url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="story-link">
    <div className="story" style={{ backgroundImage: `url(${image})` }}>
      <img src={profileSrc} alt={title} className="story-avatar" />
      <h4>{title}</h4>
    </div>
    </a>
  );
};

export default Story;

