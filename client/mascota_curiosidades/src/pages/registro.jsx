import React from 'react';
import '../style/Login.css';

const Registro = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:4040/usuario/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: document.getElementById('username').value,
          full_name: document.getElementById('full_name').value,
          password: document.getElementById('password').value
        })
      });
      // Si el backend responde con 400/500, entra aquí
      if (!response.ok) {
        const errorData = await response.json(); // Lee el mensaje de error del backend
        throw new Error(errorData.mensaje); // Lanza el mensaje para el catch
      }
      const data = await response.json();


      if (data.status) { // Si status === true
        alert(data.mensaje);
         window.location.href = '/login';
      } else {
         throw new Error(data.mensaje || data.message || 'Error');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <div className="login-box text-center">
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-4">
          <input id="username" type="text" className="form-control" placeholder="Username" required />
        </div>
        <div className="mb-3 mt-4">
          <input id="full_name" type="text" className="form-control" placeholder="Full name" required />
        </div>
        <div className="mb-3">
          <input id="password" type="password" className="form-control" placeholder="Password" required />
        </div>
        <button type="submit" className="btn btn-light w-100">REGISTER</button>
      </form>
    </div>
  );
};

export default Registro;