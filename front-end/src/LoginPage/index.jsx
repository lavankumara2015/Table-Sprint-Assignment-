import axios from "axios";
import "../RegisterPage/register.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPages() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false); 
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3007/login", userDetails)
      .then((res) => {
        alert("Login successful!");
        localStorage.setItem("token", res.data.token);
        navigation("/dashboard");
      })
      .catch((err) => {
        setLoginError(true); 
      });
};


  return (
    <div className="register-container">
      <div className="register-container__innerContainer">
        <div className="register-container__box" style={{
          height:"8rem" 
        }} >
          <img
            src="./assets/869311531ee26032e175620e2d0b5059.png"
            alt="TableSprint-logo"
          />
          <p>Welcome to TableSprint admin</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              name="email"
    
              required
              placeholder="Enter Your Email"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              value={userDetails.email}
            />
            <br />
            <label htmlFor="password"   style={{
                color: loginError ? "red" : "Black",
              }} >Password</label>
            <br />
            <input
              type="password"
              name="password"
              style={{
                borderColor: loginError ? "red" : "#ccc",
              }}
              required
              placeholder="Enter Your Password"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              value={userDetails.password}
            />
            <br />
            <div className="form-buttons">
              <button type="submit" style={{position:"relative" , left:"1.5rem", top:"0.5rem"}}>Login</button>
            </div>
          </form>
        </div>
        <div className="register-container__box2">
          <img
            src="https://assets.tablesprint.com/images/illustration/illustration_3.png"
            alt="TableSprint-logo"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPages;
