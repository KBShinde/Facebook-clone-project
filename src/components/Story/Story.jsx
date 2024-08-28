import React from 'react';
import './story.css';

const Story = ({ image, profileSrc, title }) => {
  return (
    <div className="story" style={{ backgroundImage: `url(${image})` }}>
      <img src={profileSrc} alt={title} className="story-avatar" />
      <h4>{title}</h4>
    </div>
  );
};

export default Story;
