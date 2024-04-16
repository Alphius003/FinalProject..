import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from './logo.png';
function Login() {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userid, password :password})
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      if (data.role === 'admin') {
        navigate('/Dashboard');
      } else if (data.role === 'user') {
        navigate(`/Home/${userid}`);
        localStorage.setItem('id',userid)
      } 
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage(error.message);
    }
  };

  const handleForgotPassword = async () => {
    console.log("before fetching details",userid)
    try {
      const response = await fetch('http://localhost:4000/ForgetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userID: userid })

    });
    console.log("after fetching details")

      if (!response.ok) {
        throw new Error('Failed to send OTP for password reset');
      }

      navigate(`/ResetPassword/${userid}`);
    } catch (error) {
      console.error('Error sending OTP for password reset:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
  <img src={logo} alt="KnowleEDGE Logo" style={{ width: '60px', height: 'auto', marginLeft: '70px' }} />
  <h2 style={{ marginLeft: '10px' }}>KnowleEDGE</h2>
</div>


      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="userid">UserName:</label>
        <input type="text" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
        <button type="button" onClick={handleForgotPassword} disabled={!userid.trim()}>Forgot Password</button>
      </form>
    </div>
  );
}

export default Login;
