// src/components/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../style/WelcomePage.css';


const WelcomePage = () => {
    const navigate = useNavigate();
  return (
    <div className="welcome-container">
      <h1>Welcome!</h1>
      <div className="animals">
        <img src="/imagen/conejo.jpg" alt="Rabbit" />
        <img src="/imagen/oso.jpg" alt="Bear" />
        <img src="/imagen/gato.jpg" alt="Cat" />
        <img src="/imagen/buho.png" alt="buho" />
      </div>
      <div className="buttons">


        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <button className="register-btn" onClick={() => navigate('/register')}>Register</button>

      </div>
    </div>
  );
};

export default WelcomePage;
