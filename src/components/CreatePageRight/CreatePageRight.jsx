import React from 'react';
import './createPageRight.css'; // Add a CSS file for styling
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const CreatePageRight = ({ pageName }) => {
  const defaultName = "Page Name";
  const {darkTheme} = useContext(ThemeContext)

  return (
    <div className={`create-page-right-container ${darkTheme ? 'dark' : ''}`}>
      <div className="create-page-cover-photo">
        <img 
          src="https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Cover" 
          className="create-page-cover-photo-img" 
        />
      </div>
      <div className="create-page-avatar-container">
        <Avatar      
        sx={{
        width: 120,
        height: 120,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.1)', // Slight zoom effect on hover
        },
      }} />
        <p className="create-page-name">
          {pageName || defaultName}
        </p>
      </div>
    </div>
  );
};

export default CreatePageRight;
