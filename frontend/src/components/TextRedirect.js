import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import ".././Styles/Styles.css";

function TextRedirect(props) {
  const { text, location, classname } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate(location);
  }

  return (
    <span
      className={classname}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {text}
    </span>
  );
}

export default TextRedirect;
