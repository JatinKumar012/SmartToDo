// src/components/Auth.jsx
import React, { useState } from 'react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (isLogin) {
      if (users[email] && users[email] === password) {
        onLogin(email);
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (users[email]) {
        alert('User already exists');
      } else {
        users[email] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful. Please log in.');
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div className="input-container">
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="add-button" onClick={handleAuth}>
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p style={{ cursor: 'pointer', marginTop:'10px', textAlign:'center', width:'100%' }} onClick={() => setIsLogin(!isLogin)}>
         {isLogin ? "Don't have an account? Register" : 'Already registered? Login'}
        </p>
      </div>
    </div>
  );
};

export default Auth;
