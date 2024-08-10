import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/create-new-account')
    } 
    const handleLogin = () => {
        navigate('/home')
    } 

  return (
    <div className='login'>
        <img src='https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg' alt='' className="fb-img"/>

        <div className='login-container'>
            <h3>Login In To Facebbok</h3>
            <form>
                <center>
                    <input type='email' placeholder='Email Adress'/>
                </center>
                <center>
                    <input type='password' placeholder='Password'/>
                </center> 
                <center>
                    <button type='submit' className='login-btn' onClick={handleLogin}>Login</button>
                </center>
                <center className="forget-pass">
                     <h5>Forgotten password?</h5>
                </center>
                <center>
                    <button className='signup-btn' onClick={handleSignUp}>Create new account</button>
                </center>

            </form>
        </div>
      
    </div>
  )
}

export default Login
