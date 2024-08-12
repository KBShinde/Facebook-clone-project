import React from 'react';
import { Avatar } from '@mui/material';
import './sidebarRow.css';

const SidebarRow = ({ src, Icon, title }) => {
  return (
    <div className="sidebar-row">
      {src && <Avatar src={src} className="sidebar-row__avatar" />}
      {Icon && <Icon className="sidebar-row__icon" />}
      <h4 className="sidebar-row__title">{title}</h4>
    </div>
  );
};

export default SidebarRow;
