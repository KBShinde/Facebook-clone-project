import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { post, token } = location.state;

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const userId = post?.author?._id;

                if (!userId) {
                    throw new Error("User ID is undefined or invalid");
                }

                const response = await fetch(`https://academics.newtonschool.co/api/v1/facebook/user/${userId}/posts`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'projectID': 'f104bi07c490',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server Error: ${response.status} ${response.statusText}`);
                }

                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Received non-JSON response from server");
                }

                const data = await response.json();
                if (data.status === 'success') {
                    setUser(data.data);
                } else {
                    setError('Failed to fetch user profile.');
                }
            } catch (err) {
                console.error("Error fetching user profile:", err.message);
                setError('An error occurred while fetching the user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [post, token]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{user.name ? `${user.name}'s Profile` : "User Profile"}</h1>
            {/* Display additional user information here */}
        </div>
    );
}

export default UserProfile;
