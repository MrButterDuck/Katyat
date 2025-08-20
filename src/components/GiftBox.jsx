import React, { useState } from "react";
import "./GiftBox.css";

export const GiftBox = ({ initialImage, openedImage, caption, textContent }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(true);
  };

  return (
    <div
      onClick={handleClick}
      className="gift-box"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        flexDirection: "column",
        textAlign: "center",
        padding: "0 10px",
        boxSizing: "border-box",
      }}
    >
      <img
        src={isOpened ? openedImage : initialImage}
        alt="Gift Box"
        className={`gift-image ${isOpened ? "opened" : "closed"}`}
      />

      {isOpened && (
        <div
          style={{
            marginTop: "20px",
            maxWidth: "60%",
            opacity: isOpened ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <h3 style={{ fontSize: "2rem", marginBottom: "10px" }}>{caption}</h3>
          <p style={{ fontSize: "1rem", lineHeight: "1.4" }}>{textContent}</p>
        </div>
      )}
    </div>
  );
};