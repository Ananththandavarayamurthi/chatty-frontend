import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetpasswordRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function Resetpassword() {
    const [userData, setUserData] = useState({userId: '', token: '', password: ''});
    const navigate = useNavigate();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const userId = new URLSearchParams(search).get('id');
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    useEffect(() => {
        setUserData({...userData, userId: userId, token: token})
    }, [token,userData,userId])

    const handleLogin = async (event) => {
        try{
            event.preventDefault();
            const response = await axios.post(resetpasswordRoute, userData, {withCredentials: true});
            if(response){
                navigate('/login');
            }
        }catch(error){
            console.log('Error: ', error);
        }
    }

    return (
        <div>
            <FormContainer>
        <form action="" onSubmit={(event) => handleLogin(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatty</h1>
          </div>
          <h3>Reset Password</h3>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={userData.password} 
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            min="4"
          />
         
          <button type="submit">Reset</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link> or<Link to="/login">Login</Link> 
          </span>
        </form>
        
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