import { IconButton, Tooltip, Avatar } from '@mui/material';
import "./post.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Comments from '../CommentSection/Comments';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showComment, setShowComment] = useState(false);

    const handleShowComment = () => {
        setShowComment(!showComment);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
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

        fetchPosts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='posts-container'>
            {posts.map((post, index) => (
                <div key={index} className='post-wrapper'>
                    <PostItem post={post} />
                </div>
            ))}
        </div>
    );
}

const PostItem = ({ post }) => {
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [liked, setLiked] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const handleLikeClick = () => {
        setLikeCount(likeCount + (liked ? -1 : 1));
        setLiked(!liked);
    };

    const handleShowComment = () => {
        setShowComment(!showComment);
    }

    return (
        <div className='post'>
            <div className='post-top'>
                <Avatar src={post.author.profileImage} className='post-avatar' />
                <div className='post-top-info'>
                    <h3>{post.author.name}</h3>
                    <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                </div>
            </div>

            <div className="post-bottom">
                <p>{post.content}</p>
            </div>
            <div className='post-img'>
                {post.images && post.images.length > 0 && (
                    <img src={post.images[0]} alt='' />
                )}
            </div>
            <div className='likes-comment-count'>
                <div className='count-item'>
                    <Tooltip title="Likes">
                        <IconButton>
                            <ThumbUpIcon color={"primary"} />
                        </IconButton>
                    </Tooltip>
                    <p>{likeCount} Likes</p>
                </div>
                <div className='count-item'>
                    <Tooltip title="Comments">
                        <IconButton onClick={handleShowComment}>
                            <CommentIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <p>{post.commentCount} Comments</p>
                </div>
            </div>
            <div className='post-options'>
                <div
                    className={`post-option ${liked ? 'liked' : ''}`}
                    onClick={handleLikeClick}>
                    <ThumbUpIcon className={liked ? 'liked-icon' : 'default-icon'} />
                    <p className={liked ? 'liked-text' : 'default-text'}>Like</p>
                </div>
                <div
                    className={`post-option ${showComment ? 'comment-active' : ''}`}
                    onClick={handleShowComment}>
                    <CommentIcon className='default-icon' />
                    <p className='default-text'>Comment</p>
                </div>
                <div className='post-option'>
                    <ShareIcon className='default-icon' />
                    <p className='default-text'>Share</p>
                </div>
            </div>

    
            {showComment && post._id && <Comments postId={post._id} />}
        </div>
    );
};

export default Post;

