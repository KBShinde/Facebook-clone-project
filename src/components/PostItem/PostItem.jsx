import React, { useEffect, useState } from 'react';
import './postItem.css';
import { IconButton, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, Menu, MenuItem  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { formatDistanceToNow } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from '../CommentSection/Comments';
import MessageSender from '../MessageSender/Messagesender';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../Icons/CommentIcon';

const PostItem = ({ post, addPost}) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [liked, setLiked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [commentCount, setCommentCount] = useState(post.commentCount);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(post.content);
    const [updatedImage, setUpdatedImage] = useState(null);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let token = localStorage.getItem('token')

    const handleUser = () => {
        navigate('/user-profile', {
            state: {
                post: post,
                token: token,
            },
        });
    };

    const userId = localStorage.getItem("userId");

    const handleLikeClick = () => {
        setLikeCount(likeCount + (liked ? -1 : 1));
        setLiked(!liked);
    };

    const handleShowComment = () => {
        setShowComment(true);
    };

    const handleCloseComment = () => {
        setShowComment(false);
    };

    const updateCommentCount = (delta) => {
        setCommentCount(prevCount => prevCount + delta);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleUpdatePost = async () => {
        setAnchorEl(null);
        const formData = new FormData();
        formData.append("content", updatedContent);
        if (updatedImage) {
            formData.append("images", updatedImage);
        }

        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/post/${post._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Post updated:", data);
                setIsEditing(false);
            } else {
                console.error("Failed to update post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDeletePost = async () => {
        setAnchorEl(null);
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/post/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
            });

            if (response.ok) {
                addPost()
        
            } else {
                console.error("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isAuthor = post.authorId === userId;

    return (
        <div className='post'>
        <div className='post-top'>
            <div className='post-top-left' onClick={handleUser}>
                <Avatar src={post?.author?.profileImage} className='post-avatar' />
                <div className='post-top-info'>
                    <h3>{post?.author?.name}</h3>
                    <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p> 
                </div>
            </div>
            <div className='post-top-right'>
                    <IconButton onClick={handleClick} className='post-options-btn'>
                        <MoreHorizIcon fontSize="large" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            style: {
                                backgroundColor: '#fff',
                                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                padding: '8px 0',
                            },
                        }}
                    >
                    <MenuItem onClick={handleUpdatePost} className='post-menu-item'>
                        <EditIcon fontSize='medium' style={{ marginRight: 8 }} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeletePost} className='post-menu-item'>
                        <DeleteIcon fontSize='medium' style={{ marginRight: 8 }} /> Delete
                    </MenuItem>
                </Menu>
            </div>
        </div>

            <div className="post-bottom">
                {isEditing ? (
                    <div>
                        <textarea
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUpdatedImage(e.target.files[0])}
                        />
                        <button onClick={handleUpdatePost}>Update Post</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                ) : (
                    <p>{post.content}</p>
                )}
            </div>
            <div className='post-img'>
                {post.images && post.images.length > 0 && (
                    <img src={post.images[0]} alt='' />
                )}
            </div>
            <div className='likes-comment-count'>
                <div className='count-item'>
                    <Tooltip title="Likes">
                        <IconButton onClick={handleLikeClick}>
                            <ThumbUpOutlinedIcon color={"primary"} />
                        </IconButton>
                    </Tooltip>
                    <p>{likeCount} Likes</p>
                </div>
                <div className='count-item'>
                    <Tooltip title="Comments">
                        <IconButton onClick={handleShowComment}>
                            <CommentIcon style={{ color: '#2e81f4' }} />
                        </IconButton>
                    </Tooltip>
                    <p>{commentCount} Comments</p>
                </div>
            </div>
            <div className='post-options'>
                <div className={`post-option ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                    <ThumbUpOutlinedIcon className={liked ? 'liked-icon' : 'default-icon'} />
                    <p className={liked ? 'liked-text' : 'default-text'}>Like</p>
                </div>
                <div className={`post-option ${showComment ? 'comment-active' : ''}`} onClick={handleShowComment}>
                    <CommentIcon className='default-icon' />
                    <p className='default-text'>Comment</p>
                </div>
                <div className='post-option'>
                    <ShareOutlinedIcon className='default-icon' />
                    <p className='default-text'>Share</p>
                </div>
                {isAuthor && (
                    <>
                        <div className='post-option' onClick={handleEditClick}>
                            <EditIcon className='default-icon' />
                            <p className='default-text'>Edit</p>
                        </div>
                        <div className='post-option' onClick={handleDeletePost}>
                            <DeleteIcon className='default-icon' />
                            <p className='default-text'>Delete</p>
                        </div>
                    </>
                )}
            </div>
            <Dialog 
                        open={showComment} 
                        onClose={handleCloseComment} 
                        fullWidth
                        maxWidth={false}  // Disable default maxWidth to allow custom sizing
                        sx={{
                            '& .MuiDialog-paper': {
                                width: '50%',  // Adjust the percentage as needed
                                maxWidth: 'none',  // Ensure no maximum width limitation
                                borderRadius: '20px',  // Optional: add some border radius for aesthetics
                                padding: '10px',  // Optional: add padding for better spacing
                            }
                        }}
                    >
                    <DialogTitle>
                        Comments
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseComment}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            overflowX: 'hidden', 
                            height:'500px', 
            
                        }}
                    >
                        <PostItem post={post} />
                        <Comments postId={post._id} updateCommentCount={updateCommentCount} />
                    </DialogContent>
            </Dialog>

        </div>
    );
};

export default PostItem
