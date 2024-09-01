
import { IconButton } from "@mui/material";
import "./messanger.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext } from "react";
import { ThemeContext } from "../../App";

export default function Messanger() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={`messanger-container ${darkTheme ? 'dark' : ''}`}>
      <div className="messanger-header">
        <h2>Chats</h2>
        <IconButton className="more-icon">
            <MoreHorizIcon />
        </IconButton>
      </div>
      <div className="messanger-tabs">
        <button className="tab-button active">Inbox</button>
      </div>
      <div className="messanger-content">
        <h4 className="no-chats">There is no chat available.</h4>
      </div>
      <div className="footer">
        <p>Privacy · Terms · Advertising · Ad Choices · Cookies · Meta © 2024</p>
      </div>
    </div>
  );
}

