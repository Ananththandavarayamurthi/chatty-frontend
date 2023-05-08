import React from 'react'
import { useState } from 'react';
import axios  from 'axios';
import { forgotpasswordRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function Forgotpassword() {
    
    const [isEmailSent, setIsEmailSent] = useState(false);

    const navigate = useNavigate();
  const [values, setValues] = useState({ email: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
 

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { email } = values;
    if (email === "") {
      toast.error("Email required.", toastOptions);
      return false;
    } 
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email } = values;
      const { data } = await axios.post(forgotpasswordRoute, { email: email }, { withCredentials: true });
     if (data) {
        setIsEmailSent(true);
    }
     
    }
  };


    return (
        <div>
            <FormContainer>
        {!isEmailSent?<form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatty</h1>
          </div>
          <h3>Forgot Password</h3>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
            min="4"
          />
         
          <button type="submit">sent to mail link</button>
          
        </form>:<div>Password reset Link is sent to your Email </div> }
        <span>
            Don't have an account ? <Link to="/register">Create One.</Link> or<Link to="/login">Login</Link> 
          </span>
      </FormContainer>
      <ToastContainer />
            
        </div>
    )
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(21 51 134);
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
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;