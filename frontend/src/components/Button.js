import React from "react";

import "../Styles/Styles.css";

function Button(props) {
  return (
    <div
      className="btn_primary"
      onClick={props.clickHandler}
      style={{
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
      }}
    >
      <span className="poppins-medium-white-18px">{props.text}</span>
    </div>
  );
}

export default Button;
