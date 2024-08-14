import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Tooltip from '@mui/material/Tooltip';
import './likeButton.css';

const LikeButton = ({ postId, initialLikeCount, initialLiked, onLikeUpdate }) => {
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [liked, setLiked] = useState(initialLiked);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/like/${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            if (data.status === 'success') {
                const newLikeCount = likeCount + (liked ? -1 : 1);
                setLikeCount(newLikeCount);
                setLiked(!liked);
                if (onLikeUpdate) onLikeUpdate(newLikeCount, !liked);
            } else {
                setError(data.message || 'Failed to like the post.');
            }
        } catch (err) {
            console.error('Error liking post:', err);
            setError(`An error occurred while liking the post: ${err.message}`);
        }
    };

    return (
        <div className="like-button-container">
            <Tooltip title={liked ? "Unlike" : "Like"}>
                <IconButton onClick={handleLikeClick}>
                    <ThumbUpIcon style={{color: liked ? "#2e81f4" : "#ccc"}} />
                </IconButton>
            </Tooltip>
            <p>{likeCount} Likes</p>
        </div>
    );
};

export default LikeButton;
