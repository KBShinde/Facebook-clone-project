import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import './sidebarRow.css';
import { ThemeContext } from '../../App';

const SidebarRow = ({ src, Icon, title }) => {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`sidebar-row ${darkTheme ? 'dark' : ''}`}>
      {src && <Avatar src={src} className="sidebar-row__avatar" />}
      {Icon && <Icon className="sidebar-row__icon" />}
      <h4 className={`sidebar-row__title ${darkTheme ? 'dark' : ''}`}>{title}</h4>
    </div>
  );
};


export default SidebarRow;
