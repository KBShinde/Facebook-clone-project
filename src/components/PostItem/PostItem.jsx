import React, { useState } from 'react';
import './postItem.css';
import { IconButton, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, Menu, MenuItem, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { formatDistanceToNow } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from '../CommentSection/Comments';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../Icons/CommentIcon';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ShareIcon from '../Icons/ShareIcon';
import LikeIcon from '../Icons/LikeIcon';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const PostItem = ({ post, addPost }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [liked, setLiked] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [commentCount, setCommentCount] = useState(post.commentCount);
    const [updatedContent, setUpdatedContent] = useState(post.content);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const token = localStorage.getItem('token');
    const {darkTheme} = useContext(ThemeContext)

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); 
    };

    const handleUser = () => {
        navigate('/user-profile', {
            state: {
                author: post.author,
                token: token,
            },
        });
    };

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
        if (image) {
            formData.append("images", image);
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
                setOpenDialog(false);
                addPost(data);
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
                addPost();
            } else {
                console.error("Failed to delete post.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = () => {
        setUpdatedContent(post.content);
        setImage(post.image);
        setOpenDialog(true);  
    };

    return (
            <div className={`post ${darkTheme ? 'dark' : ''}`}>
            <div className={`post-top ${darkTheme ? 'dark' : ''}`}>
                <div className={`post-top-left ${darkTheme ? 'dark' : ''}`} onClick={handleUser}>
                <Avatar src={post?.author?.profileImage} className={`post-avatar ${darkTheme ? 'dark' : ''}`} />
                <div className={`post-top-info ${darkTheme ? 'dark' : ''}`}>
                    <h3>{post?.author?.name}</h3>
                    <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </div>
                </div>
                <div className={`post-top-right ${darkTheme ? 'dark' : ''}`}>
                <IconButton onClick={handleClick} className={`post-options-btn ${darkTheme ? 'dark' : ''}`}>
                    <MoreHorizIcon fontSize="large" />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
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
                        backgroundColor: darkTheme ? '#444' : '#fff',
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        padding: '8px 0',
                    },
                    }}
                >
                    <MenuItem onClick={handleEdit} className={`post-menu-item ${darkTheme ? 'dark' : ''}`}>
                    <EditIcon fontSize='medium' style={{ marginRight: 8 }} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeletePost} className={`post-menu-item ${darkTheme ? 'dark' : ''}`}>
                    <DeleteIcon fontSize='medium' style={{ marginRight: 8 }} /> Delete
                    </MenuItem>
                </Menu>
                </div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
                sx={{
                    '& .MuiDialog-paper': {
                        backgroundColor: darkTheme ? '#2c2c2c' : '#ffffff', // Dark mode background
                        color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode text color
                        borderRadius: '15px', // Optional: rounded corners
                    }
                }}
            >
                <DialogTitle>
                    Update Post
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode close icon color
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Avatar src={post?.author?.profileImage} />
                        <Typography
                            variant="h6"
                            style={{ marginLeft: '8px', color: darkTheme ? '#e0e0e0' : '#000000' }} // Dark mode author name color
                        >
                            {post?.author?.name}
                        </Typography>
                    </div>
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                        sx={{
                            marginBottom: '16px',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: darkTheme ? '#3c3c3c' : '#ffffff', // Dark mode input background
                                color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode input text color
                            }
                        }}
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
                                <PhotoLibraryIcon
                                    fontSize="large"
                                    style={{ color: 'green' }} // Dark mode photo library icon color
                                />
                            </IconButton>
                        </label>
                        <span style={{ color: darkTheme ? '#e0e0e0' : '#000000' }}>
                            {image ? image.name : "No file chosen"}
                        </span>
                    </div>
                    <Button
                        onClick={handleUpdatePost}
                        variant="contained"
                        color='primary'
                        fullWidth
                    >
                        Post
                    </Button>
                </DialogContent>
            </Dialog>

            </div>
            <div className={`post-bottom ${darkTheme ? 'dark' : ''}`}>
                    <p>{post.content}</p>         
                </div>
                <div className={`post-img ${darkTheme ? 'dark' : ''}`}>
                    {post.images && post.images.length > 0 && (
                        <img src={post.images[0]} alt='' />
                    )}
                </div>
                <div className={`likes-comment-count ${darkTheme ? 'dark' : ''}`}>
                    <div className={`count-item ${darkTheme ? 'dark' : ''}`}>
                        <Tooltip title="Likes">
                            <IconButton onClick={handleLikeClick}>
                                <LikeIcon
                                    style={{
                                        color: 'white',
                                        backgroundColor: darkTheme ? '#007bff' : '#007bff',
                                        borderRadius: '50%', // Makes the border circular
                                        padding: '3px' // Optional, to give some space around the icon
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <p>{likeCount}</p>
            </div>
                <div className={`count-item ${darkTheme ? 'dark' : ''}`}>
                    <p>{commentCount}</p>
                    <Tooltip title="Comments">
                        <IconButton onClick={handleShowComment}>
                            <CommentIcon style={{ color: darkTheme ? '#E4E6EB' : '#606770' }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className={`post-options ${darkTheme ? 'dark' : ''}`}>
                <div className={`post-option ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                    <ThumbUpOutlinedIcon className={liked ? 'liked-icon' : 'default-icon'} />
                    <p className={liked ? 'liked-text' : 'default-text'}>Like</p>
                </div>
                <div className={`post-option ${showComment ? 'comment-active' : ''}`} onClick={handleShowComment}>
                    <CommentIcon className='default-icon' />
                    <p className='default-text'>Comment</p>
                </div>
                <div className='post-option'>
                    <ShareIcon className='default-icon' />
                    <p className='default-text'>Share</p>
                </div>
            </div>

            <Dialog
                open={showComment}
                onClose={handleCloseComment}
                fullWidth
                maxWidth={false}
                sx={{
                    '& .MuiDialog-paper': {
                        width: '50%',
                        maxWidth: 'none',
                        borderRadius: '15px',
                        padding: '10px',
                        backgroundColor: darkTheme ? '#2c2c2c' : '#ffffff', // Dark mode background
                        color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode text color
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode title color
                        borderBottom: `1px solid ${darkTheme ? '#444' : '#e0e0e0'}` // Dark mode border color
                    }}
                >
                    Comments
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseComment}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: darkTheme ? '#e0e0e0' : (theme) => theme.palette.grey[500], // Dark mode close icon color
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    sx={{
                        overflowX: 'hidden',
                        height: '500px',
                        backgroundColor: darkTheme ? '#2c2c2c' : '#ffffff', // Dark mode background
                        color: darkTheme ? '#e0e0e0' : '#000000', // Dark mode text color
                    }}
                >
                    <PostItem post={post} />
                    <Comments postId={post._id} updateCommentCount={updateCommentCount} />
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default PostItem;
