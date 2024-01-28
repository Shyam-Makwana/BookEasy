import React, { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import ".././Styles/Styles.css";

function InputFramePass(props) {
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordChange(event) {
    props.parent_function(event.target.value);
  }

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div>
      <input
        className="nunito-normal-tropical-blue-24px"
        type={showPassword ? "text" : "password"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handlePasswordChange}
        style={{
          border: "2px solid gray",
          borderRadius: "5px",
          padding: "10px",
          width: "620px",
          fullWidth: true,
          outline: "none",
        }}
      />

      <span
        style={{
          height: "32px",
          width: "32px",
          color: "var(--tropical-blue)",
          position: "relative",
          left: "640px",
          top: "-45px",
        }}
        onClick={handleTogglePassword}
      >
        {showPassword ? <FaEye size={35} /> : <FaEyeSlash size={35} />}
      </span>
    </div>
  );
}

export default InputFramePass;
