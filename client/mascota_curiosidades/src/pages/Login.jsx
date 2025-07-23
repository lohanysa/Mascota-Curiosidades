import React, { useState } from 'react';
import '../style/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4040/usuario/login', {
        username,
        password
      });

      if (response.data.token) {

        localStorage.setItem('token', response.data.token);

        window.location.href = '/Home';
      }
    } catch (err) {
      if (err.response) {

        setError(err.response.data.message || 'Error al iniciar sesión');
      } else if (err.request) {

        setError('No se recibió respuesta del servidor');
      } else {

        setError('Error al configurar la solicitud');
      }
    }
  };

  return (
    <div className="login-box text-center">
      <h2>LOGIN</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <input 
            id="username" 
            type="text" 
            className="form-control" 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input 
            id="password" 
            type="password" 
            className="form-control" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-light w-100">SIGN IN</button>
        <div className="mt-3">
        </div>
      </form>
    </div>
  );
};

export default Login;