import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            {/* <h1>Chit-Chat</h1> */}
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">LogIn</button>
          <span>
            Don't have an account ? <Link to="/register">REGISTER HERE</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: #ff9966; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff5e62,
    #ff9966
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff5e62,
    #ff9966
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #ff9765;
    border-radius: 0.4rem;
    color: red;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #ff5f62;
      outline: none;
    }
  }
  button {
    background-color: #ff9765;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.6rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #ff5f62;
    }
  }
  span {
    color: #ff5f62;
    // text-transform: uppercase;
    a {
      color: #ff9765;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: red;
      }
    }
  }
`;
