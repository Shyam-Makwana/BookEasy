import React from "react";

import ".././Styles/Styles.css";

function InputFrame(props) {
  return (
    <input
      className="nunito-normal-tropical-blue-24px"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(event) => props.parent_function(event.target.value)}
      style={{
        border: "2px solid gray",
        borderRadius: "5px",
        padding: "10px",
        width: "620px",
        fullWidth: true,
        outline: "none",
      }}
    />
  );
}

export default InputFrame;
