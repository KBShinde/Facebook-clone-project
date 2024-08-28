import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './comments.css'; 

const Comments = ({ postId, updateCommentCount }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");  

    useEffect(() => {
        const fetchComments = async () => {
            if (!postId) {
                setError('Post ID is missing.');
                return;
            }
            
            setLoading(true);
            try {
                const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/post/${postId}/comments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'projectID': 'f104bi07c490',
                    },
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    setComments(data.data);
                
                } else {
                    setError('Failed to fetch comments.');
                }
            } catch (err) {
                setError('An error occurred while fetching comments.');
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, token]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
        setIsTyping(e.target.value.trim() !== '');
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        if (!newComment.trim()) {
            setError('Comment cannot be empty.');
            return;
        }
    
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: newComment }),
            });
    
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
    
            const data = await response.json();
    
            if (data.status === 'success') {
                setNewComment(""); 
                setIsTyping(false); 
                setComments(prevComments => [data.data, ...prevComments]); 
                updateCommentCount(1);  
            } else {
                setError(data.message || 'Failed to post comment.');
            }
        } catch (err) {
            console.error('Error posting comment:', err);
            setError(`An error occurred while posting the comment: ${err.message}`);
        }
    };

    const handleMenuOpen = (event, comment) => {
        setAnchorEl(event.currentTarget);
        setSelectedComment(comment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedComment(null);
    };

    const handleCommentDelete = async () => {
        if (!selectedComment?._id) {
            console.error('Comment ID is missing.');
            return;
        }

        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        
        setComments(prevComments => prevComments.filter(comment => comment._id !== selectedComment._id));
        updateCommentCount(-1); 

        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/comment/${selectedComment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

        } catch (err) {
            console.error('Error deleting comment:', err);
            setError(`An error occurred while deleting the comment: ${err.message}`);
            // Revert the optimistic update in case of an error
            setComments(prevComments => [...prevComments, selectedComment]);
            updateCommentCount(1);  // Revert the comment count decrease
        }

        handleMenuClose();
    };

    if (loading) return <p className="comments-loading">Loading...</p>;
    if (error) return <p className="comments-error">{error}</p>;

    return (
        <div className="comments-container">
            <div className="comment-form">
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                />
                <IconButton 
                    className="send-icon" 
                    onClick={handleCommentSubmit}
                    style={{ color: isTyping ? '#2e81f4' : 'gray' }}
                >
                    <SendIcon />
                </IconButton>
            </div>
    
            {comments.length === 0 ? (
                <p className="comments-empty">No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment._id} className="comment-item">
                        <Avatar src={comment.author_details?.profileImage || '/default-avatar.png'} className="comment-avatar" />
                        <div className="comment-content-wrapper">
                            <div className="comment-header">
                                <h4 className="comment-author">{comment.author_details?.name || 'Unknown Author'}</h4>
                                <IconButton className="more-icon" onClick={(e) => handleMenuOpen(e, comment)}>
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    </div>
                ))
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleCommentDelete}>
                    <DeleteIcon style={{ marginRight: 8 }} />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Comments;
