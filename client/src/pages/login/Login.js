import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./login.css";

const Login = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (user) {
        navigate('/');
      }
    }, [user, navigate]);

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
        );
    };

    return (
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">Kindness Network</h3>
              <span className="loginDesc">
              Join Kindness Network, connect globally, and amplify charitable impact
              </span>
            </div>
            <div className="loginRight">
              <form className="loginBox" onSubmit={handleClick}>
                <input
                  placeholder="Email"
                  type="email"
                  required
                  className="loginInput"
                  ref={email}
                />
                <input
                  placeholder="Password"
                  type="password"
                  required
                  minLength="6"
                  className="loginInput"
                  ref={password}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>
                  Log In
                  {/* {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Log In"
                  )} */}
                </button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">
                  Create a New Account
                  {/* {isFetching ? (
                    <CircularProgress color="white" size="20px" />
                  ) : (
                    "Create a New Account"
                  )} */}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
}
 
export default Login;