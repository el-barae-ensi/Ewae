import React from "react";
import "./style.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Authontification = () => {
  return (
    <div className="authontification">
      <div className="auth-card">
        <h1 className="login-title">Login</h1>

        <div className="input-group">
          <label className="input-label" htmlFor="username">Username</label>
          <div className="input-field">
            <i className="bi bi-person input-icon"/>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">Password</label>
          <div className="input-field">
            <i className="bi bi-lock input-icon"/>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
        </div>

        <button className="login-button">Connexion</button>
        <button className="forgot-password">Forgot password?</button>
      </div>
    </div>
  );
};
