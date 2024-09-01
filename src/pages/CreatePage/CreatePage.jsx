import React, { useState } from "react";
import "./createPage.css";
import Navbar from "../../components/Navbar/Navbar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import CreatePageRight from "../../components/CreatePageRight/CreatePageRight";
import { useContext } from "react";
import { ThemeContext } from "../../App";

const CreatePage = () => {
    const navigate = useNavigate();

    const [pageName, setPageName] = useState('');
    const [category, setCategory] = useState('');
    const [bio, setBio] = useState('');
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token')
    console.log("token :", token)
    const {darkTheme} = useContext(ThemeContext)

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', pageName);
        formData.append('description', category);
        if (file) {
            formData.append('images', file);
        }

        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/facebook/channel/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'projectID': 'f104bi07c490',
                },
                body: formData
            });

            if (response.ok) {
                alert('Page created successfully');
                navigate('/pages'); 
            } else {
        
                alert('Error creating page');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        }
    };

    return (
        <div className={darkTheme ? 'dark' : ''}>

            <Navbar />
            <div className="create-page-wrapper">
                <div className="create-page-container">
                    <div className="icon-heading">
                        <KeyboardBackspaceIcon onClick={handleBackClick} />
                        <h1>Create a Page</h1>
                    </div>
                    <p>
                        Your Page is where people go to learn more about you. Make sure yours
                        has all the information they may need.
                    </p>
                    <form className="create-page-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="pageName"
                                placeholder="Page name (required)"
                                value={pageName}
                                onChange={(e) => setPageName(e.target.value)}
                                required
                            />
                            <label htmlFor="pageName">Use the name of your business, brand or organization, or a name that helps explain your Page</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="category"
                                placeholder="Category (required)"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                            <label htmlFor="category">Enter a category that best describes you.</label>
                        </div>

                        <div className="form-group">
                            <textarea
                                id="bio"
                                placeholder="Bio (optional)"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            ></textarea>
                            <label htmlFor="bio">Tell description about the page.</label>
                        </div>

                        <div className="form-group">
                            <input
                                type="file"
                                id="fileUpload"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type="submit" className="create-page-button">
                            Create Page
                        </button>

                        <p className="agreement-text">
                            By creating a Page, you agree to the{" "}
                            <a href="https://www.facebook.com/policies/pages_groups_events">
                                Pages, Groups and Events Policies
                            </a>.
                        </p>
                    </form>
                </div>
                <CreatePageRight
                pageName={pageName} 
                 className="create-page-right" />
            </div>
        </div>
    );
};

export default CreatePage;
