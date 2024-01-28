import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import ".././Styles/Styles.css";

import { FaHome } from "react-icons/fa";

const style = { color: "var(--green)", cursor: "pointer" };

function HomeButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return <FaHome size={32} style={style} onClick={handleClick} />;
}

export default HomeButton;
