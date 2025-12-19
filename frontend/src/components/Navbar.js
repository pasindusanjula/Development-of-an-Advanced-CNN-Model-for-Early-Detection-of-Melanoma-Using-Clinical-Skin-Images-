// frontend/src/components/Navbar.js
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🌿 Melanoma Detection</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="https://github.com/">GitHub</a></li>
        <li><a href="https://openai.com/">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
