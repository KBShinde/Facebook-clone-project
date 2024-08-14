
import React, { useState } from "react";
import { Avatar, IconButton, Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SendIcon from '@mui/icons-material/Send';
import "./messageSender.css";

const MessageSender = ({ addPost }) => {
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");  

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInputClick = () => {
        setOpenDialog(true); // Open the dialog when input is clicked
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", "New Post");
        formData.append("content", input);
        if (image) {
            formData.append("images", image);
        }

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/facebook/post/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Post created:", data);
                addPost(data); 
            } else {
                console.error("Failed to create post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

    
        setInput("");
        setImage(null);
    };

    return (
        <div className="message-sender">
            <div className="message-sender-top">
                <Avatar />
                <form onSubmit={handleSubmit} className="message-sender-form">
                    <input
                        type="text"
                        className="message-sender-input"
                        placeholder="What's on your mind?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {input && (
                        <IconButton type="submit" className="message-sender-send-button">
                            <SendIcon />
                        </IconButton>
                    )}
                </form>
            </div>
            <div className="message-sender-bottom">
                <div className="message-sender-option">
                    <VideocamIcon fontSize="large" style={{ color: "red" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="message-sender-option">
                    <input
                        type="file"
                        accept="image/*"
                        id="imageInput"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    <label htmlFor="imageInput" className="message-sender-option">
                        <PhotoLibraryIcon fontSize="large" style={{ color: "green" }} />
                        <h3>Photo/Video</h3>
                    </label>
                </div>
                <div className="message-sender-option">
                    <SentimentSatisfiedIcon fontSize="large" style={{ color: "#f8b600" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
        </div>
    );
}

export default MessageSender;
