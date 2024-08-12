import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import './comments.css'; 

const Comments = ({ postId, userId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc3YzI3NGNkZTY0OGNjMzk2MzBkYSIsImlhdCI6MTcyMjk1ODAzMywiZXhwIjoxNzU0NDk0MDMzfQ.fUM5HrusoPtB7aIJA8EB2hvDVIz4BFq1VCHAqNfaJpU';

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
            } else {
                setError(data.message || 'Failed to post comment.');
            }
        } catch (err) {
            console.error('Error posting comment:', err);
            setError(`An error occurred while posting the comment: ${err.message}`);
        }
    };

    const handleCommentDelete = async (commentId) => {
        if (!commentId) {
            console.error('Comment ID is missing.');
            return;
        }
        
        const commentToDelete = comments.find(comment => comment._id === commentId);
        
        if (!commentToDelete) {
            console.error('Comment not found.');
            return;
        }

        if (commentToDelete.author_details.userId !== userId) {
            setError('You can only delete your own comments.');
            return;
        }
        
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/comment/${commentId}`, {
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
    
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError(`An error occurred while deleting the comment: ${err.message}`);
        }
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
                    <div key={comment.id} className="comment-item">
                        <Avatar src={comment.author_details?.profileImage || '/default-avatar.png'} className="comment-avatar" />
                        <div className="comment-content-wrapper">
                            <div className="comment-header">
                                <h4 className="comment-author">{comment.author_details?.name || 'Unknown Author'}</h4>

                                {comment.author_details?.userId === userId && (
                                    <button className="delete-button" onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                                )}
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Comments;
