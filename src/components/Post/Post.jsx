import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, Menu, MenuItem  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { formatDistanceToNow } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './post.css';
import Comments from '../CommentSection/Comments';
import MessageSender from '../MessageSender/Messagesender';
import { useNavigate } from 'react-router-dom';
import CommentIcon from '../Icons/CommentIcon';
import PostItem from '../PostItem/PostItem';


const Post = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts(true);
    }, []);

    const fetchPosts = async (waiting = false) => {
        if(waiting){
          setLoading(true);
        }
  
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/facebook/post?limit=100', {
                headers: {
                    'projectID': 'f104bi07c490',
                },
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                setPosts(data.data);
            } else {
                setError('Failed to fetch posts.');
            }
        } catch (err) {
            setError('An error occurred while fetching posts.');
        } finally {
            setLoading(false);
        }
    };

    const addPost = () => {
        fetchPosts(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='posts-container'>
            <MessageSender addPost={addPost} />
            {posts.map((post) => (
                <div key={post._id} className='post-wrapper'>
                    <PostItem post={post} addPost={addPost}/>
                </div>
            ))}
        </div>
    );
};

export default Post;
