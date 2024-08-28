import React, { useState } from "react";
import { Avatar, IconButton, Dialog, DialogContent, DialogTitle, Button, TextField, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import "./messageSender.css";

const MessageSender = ({ addPost }) => {
    const [input, setInput] = useState("");
    const [image, setImage] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");  
    const userName = localStorage.getItem('user')  

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleInputClick = () => {
        setOpenDialog(true); 
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); 
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

                addPost(data); 
            } else {
                console.error("Failed to create post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
        setImage(null);
        handleCloseDialog(); 
    };

    return (
        <>
            <div className="message-sender">
            <div className="message-sender-top">
        
                    <Avatar />
                    <form onSubmit={handleSubmit} className="message-sender-form">
                        <input
                            type="text"
                            className="message-sender-input"
                            placeholder="What's on your mind?"
                            value={input}
                            onClick={handleInputClick} 
                            readOnly 
                        />
                    </form>

                </div>

                <div className="message-sender-bottom">
                <div className="message-sender-option">
                    <VideocamIcon style={{ color: "red", fontSize: "30px" }} />
                    <h3>Live Video</h3>
                </div>
                <div className="message-sender-option" onClick={handleInputClick}>
                    <label htmlFor="imageInput" className="message-sender-option">
                        <PhotoLibraryIcon  style={{ color: "green", fontSize: "28px" }} />
                        <h3>Photo/Video</h3>
                    </label>
                </div>
                <div className="message-sender-option">
                    <SentimentSatisfiedIcon style={{ color: "#f8b600", fontSize: "30px" }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>
            </div>

            
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    Create Post
                    <IconButton 
                        onClick={handleCloseDialog}
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Avatar />
                        <Typography variant="h6" style={{ marginLeft: '8px' }}>
                            {userName}
                        </Typography>
                    </div>
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        placeholder={`What's on your mind, ${userName}?`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <input
                            type="file"
                            accept="image/*"
                            id="imageInput"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="imageInput">
                            <IconButton component="span">
                                <PhotoLibraryIcon fontSize="large" style={{ color: "green" }} />
                            </IconButton>
                        </label>
                        <span>{image ? image.name : "No file chosen"}</span>
                    </div>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                    >
                        Post
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MessageSender;
