import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
      Logout
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #ff5f62;
  border: none;
  cursor: pointer;
  margin-right: -16px;
  svg {
    font-size: 1.5rem;
    color: #ebe7ff;
  }
  &:hover {
    background-color: red;
  }
`;
