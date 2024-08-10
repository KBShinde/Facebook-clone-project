import "./account.css";
import { Link, useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/')
    }
  return (
    <div className='register'>
       <div className='register-container'>
          <h1>Sign Up</h1>
          <p>It's quick and easy</p>
          <div className='form'>
            <form>
                <div className='row'>
                    <input className='register-name' type='name' placeholder='First Name'/>
                    <input className='register-name' type='name' placeholder='Last Name'/>
                </div>
                <center>
                    <input type='email' placeholder='Enter email address'/>

                </center>
                <center>
                    <input type='password' placeholder='Enter password'/>
                    
                </center>
                <h5 className='birth-date'>Date of birth</h5>
                <div className='row'>
                    <select className='dates'>
                        <option value="day" disabled selected>Day</option>
                        {[...Array(31).keys()].map(day => (
                            <option key={day + 1} value={day + 1}>{day + 1}</option>
                        ))}
                    </select>

                    <select className='months'>
                        <option value="month" disabled selected>Month</option>
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

                    <select className='years'>
                        <option value="year" disabled selected>Year</option>
                        {Array.from({ length: 101 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                </div>
                <h5 className='gender'>Gender</h5>
                <div className='radio-container'>
                    <div className='wrapper'>
                        <label>Female</label>
                        <input type="radio" name='gender' value="female" />
                    </div>
                    <div className='wrapper'>
                        <label>Male</label>
                        <input type="radio" name='gender' value="male" />
                    </div>
                    <div className='wrapper'>
                        <label>Other</label>
                        <input type="radio" name='gender' value="other" />
                    </div>
                </div>
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
  )
}

export default Account
