import "./register.css";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigation = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);
    axios
      .post("http://localhost:3007/register", userDetails)
      .then((res) => {
        alert("Registration successful!");
        navigation("/login");
      })
      .catch((err) => {
        alert("Registration failed. Please try again.");
      });
  };
  const handleLoginBtn = () => {
    navigation("/login");
  };

  return (
    <>
      <div className="register-container">
        <div className="register-container__innerContainer">
          <div className="register-container__box">
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
                style={{
                  borderColor: "#868686",
                }}
              />
              <br />
              <label
                htmlFor="password"
                style={{
                  color: passwordsMatch ? "Black" : "red",
                }}
              >
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                required
                placeholder="Enter Your Password"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                value={userDetails.password}
                style={{
                  borderColor: passwordsMatch ? "#868686" : "red",
                }}
              />
              <br />
              <label
                htmlFor="confirm-password"
                style={{
                  color: passwordsMatch ? "Black" : "red",
                }}
              >
                Confirm Password
              </label>
              <br />
              <input
                type="password"
                name="confirm-password"
                placeholder="Enter Your Confirm Password"
                required
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    confirmPassword: e.target.value,
                  })
                }
                value={userDetails.confirmPassword}
                style={{
                  borderColor: passwordsMatch ? "#868686" : "red",
                }}
              />
              <br />

              <div className="form-buttons">
                <button type="submit">Register</button>
                <button type="button" onClick={handleLoginBtn}>
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="register-container__box2">
            <img
              src="https://assets.tablesprint.com/images/illustration/illustration_1.png"
              alt="TableSprint-logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
