import React, { useState } from "react";
import "./account.css";
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [gender, setGender] = useState('');

    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const validate = () => {
        let errors = {};
        
        if (!firstName.trim()) {
            errors.firstName = "First name is required";
        }

        if (!lastName.trim()) {
            errors.lastName = "Last name is required";
        }

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password needs to be 6 characters or more";
        }

        if (!day || !month || !year) {
            errors.dob = "Date of birth is required";
        }

        if (!gender) {
            errors.gender = "Gender is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const userData = {
                name: `${firstName} ${lastName}`,
                email,
                password,
                appType: 'facebook',
            };

            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'f104bi07c490',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    navigate('/');
                } else {
                    console.error("Failed to register:", response.statusText);
                }
            } catch (error) {
                console.error("Error occurred during registration:", error);
            }
        }
    };

    return (
        <div className='register'>
            <div className='register-container'>
                <h1>Sign Up</h1>
                <p>It's quick and easy</p>
                <div className='form'>
                    <form onSubmit={handleSubmit}>
                    <div className='row'>
                <div className='input-container'>
                        <input
                            className='register-name'
                            type='text'
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className='input-container'>
                        <input
                            className='register-name'
                            type='text'
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                </div>

                        <center>
                            <input
                                type='email'
                                placeholder='Enter email address'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </center>
                        <center>
                            <input
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                        </center>
                        <h5 className='birth-date'>Date of birth</h5>
                        <div className='row'>
                            <select
                                className='dates'
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            >
                                <option value="" disabled>Day</option>
                                {[...Array(31).keys()].map(day => (
                                    <option key={day + 1} value={day + 1}>{day + 1}</option>
                                ))}
                            </select>
                            <select
                                className='months'
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <option value="" disabled>Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select
                                className='years'
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="" disabled>Year</option>
                                {Array.from({ length: 101 }, (_, i) => {
                                    const year = new Date().getFullYear() - i;
                                    return <option key={year} value={year}>{year}</option>;
                                })}
                            </select>
                        </div>
                        {errors.dob && <p className="error">{errors.dob}</p>}
                        <h5 className='gender'>Gender</h5>
                        <div className='radio-container'>
                            <div className='wrapper'>
                                <label>Female</label>
                                <input
                                    type="radio"
                                    name='gender'
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className='wrapper'>
                                <label>Male</label>
                                <input
                                    type="radio"
                                    name='gender'
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className='wrapper'>
                                <label>Other</label>
                                <input
                                    type="radio"
                                    name='gender'
                                    value="other"
                                    checked={gender === 'other'}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                        </div>
                        {errors.gender && <p className="error">{errors.gender}</p>}
                        <p className='policy'>By clicking Sign Up, you agree to our 
                            <span> Terms, Privacy Policy </span>and 
                            <span> Cookies Policy.</span> You may receive SMS notifications from us and can opt out at any time.</p>
                        <center>
                            <button className='register-btn'>
                                Sign Up
                            </button>
                        </center>
                        <center>
                            <Link to="/">
                            <p className='have-account-text'>
                                Already have an account ?
                            </p>
                            </Link>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account;
