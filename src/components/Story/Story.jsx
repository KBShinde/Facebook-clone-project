import React from 'react';
import './story.css';
import { useContext } from 'react';
import { ThemeContext } from '../../App';


const Story = ({ image, profileSrc, title }) => {
  const {darkTheme} = useContext(ThemeContext)
  return (
    <div className="story" style={{ backgroundImage: `url(${image})` }}>
      <img src={profileSrc} alt={title} className="story-avatar" />
      <h4>{title}</h4>
    </div>
  );
};

export default Story;
