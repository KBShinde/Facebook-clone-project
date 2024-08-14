import React, { useState } from "react";
import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/create-new-account');
    };

    const validateForm = () => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email is invalid");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        const userData = {
            email: email,
            password: password,
            appType: 'facebook',
        };

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'f104bi07c490',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(userData))
                const resultRes = await response.json();
                localStorage.setItem('token', resultRes.token)
                navigate('/home');
            } else {
                const result = await response.json();
                setError(result.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className='login'>
            <img src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg' alt='Facebook Logo' className="fb-img"/>

            <div className='login-container'>
                <h3>Login To Facebook</h3>
                <form onSubmit={handleLogin}>
                    <center>
                        <input 
                            type='email' 
                            placeholder='Email Address' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </center>
                    <center>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </center> 
                    {error && <div className="error">{error}</div>}
                    <center>
                        <button type='submit' className='login-btn'>
                            Login
                        </button>
                    </center>
                    <center className="forget-pass">
                        <h5>Forgotten password?</h5>
                    </center>
                    <center>
                        <button 
                            type='button' 
                            className='signup-btn' 
                            onClick={handleSignUp}>
                            Create new account
                        </button>
                    </center>
                </form>
            </div>
        </div>
    );
};

export default Login;
