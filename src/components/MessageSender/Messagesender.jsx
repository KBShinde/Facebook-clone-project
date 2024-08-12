import { Avatar } from "@mui/material";
import "./messageSender.css";
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

const Messagesender = () => {
    return (
        <div className="message-sender">
            <div className="message-sender-top">
                <Avatar />
                <form>
                    <input
                        type="text"
                        className="message-sender-input"
                        placeholder="What's on your mind?"
                    />
                    <input
                        type="text"
                        placeholder="Image URL (Optional)"
                        className="message-sender-url"
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="message-sender-bottom">
                <div className="message-sender-option">
                    <VideocamIcon fontSize="large" style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="message-sender-option">
                    <PhotoLibraryIcon fontSize="large" style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="message-sender-option">
                    <SentimentSatisfiedIcon fontSize="large" style={{ color: "#f8b600" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    );
}

export default Messagesender;
