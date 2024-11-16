import React, { useState } from "react";
import "./officelogin.css";

const OfficeLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="office-login">
      <div className="office-login-container">
        <img className="office-login-logo" src="logo.png" alt="Citizen Portal Logo" />
        <h2 className="office-login-title">CITIZEN PORTAL</h2>

        {/* Mobile Number Input */}
        <div className="office-login-input-group">
          <i className="fas fa-phone-alt office-login-icon"></i>
          <input
            className="office-login-input"
            type="text"
            placeholder="Mobile Number"
          />
        </div>

        {/* Password Input */}
        <div className="office-login-input-group office-login-password-group">
          <input
            className="office-login-input"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
          />
          <i
            className={`fas ${
              passwordVisible ? "fa-eye" : "fa-eye-slash"
            } office-login-password-toggle`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        {/* Show Password Checkbox */}
        <div className="office-login-checkbox-group">
          <input
            className="office-login-checkbox"
            type="checkbox"
            id="showPassword"
            checked={passwordVisible}
            onChange={togglePasswordVisibility}
          />
          <label className="office-login-checkbox-label" htmlFor="showPassword">
            Show Password
          </label>
        </div>

        {/* Forgot Password Link */}
        <a href="#" className="office-login-forgot-password">
          Forgot your password?
        </a>

        {/* Login Button */}
        <button className="office-login-button">
          LOGIN <i className="fas fa-sign-in-alt office-login-button-icon"></i>
        </button>
      </div>
    </div>
  );
};

export default OfficeLogin;
