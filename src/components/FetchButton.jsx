import React from "react";

function FetchButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "10px 20px", margin: "20px 0" }}>
      Fetch Market Signals
    </button>
  );
}

export default FetchButton;
