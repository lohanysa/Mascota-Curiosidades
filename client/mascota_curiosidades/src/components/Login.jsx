import React from 'react';
import '../style/Login.css';

const Login = () => {
  return (
    <div className="login-box text-center">
      <h2>LOGIN</h2>
      <form>
        <div className="mb-3 mt-4">
          <input id="username" type="text" className="form-control" placeholder="Username" />
        </div>
        <div className="mb-3">
          <input id ="password" type="password" className="form-control" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-light w-100">SIGN IN</button>
        <div className="mt-3">
          <a href="#" className="text-light text-decoration-underline">Forgot Password? Click Here</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
