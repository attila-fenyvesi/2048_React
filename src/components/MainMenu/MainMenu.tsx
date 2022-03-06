import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div id="main-menu">
      <header>2048</header>
      <div id="button-container">
        <Link to="/game" className="menu-btn">
          START GAME
        </Link>
        <Link to="/highscores" className="menu-btn">
          HIGH SCORES
          <br />
          (not yet implemented)
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
