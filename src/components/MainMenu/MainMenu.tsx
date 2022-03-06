import React from "react";
import { Link } from "react-router-dom";
import GameLogic from "../../utils/GameLogic";

const MainMenu = () => {
  const [startNewGame, moveTiles] = GameLogic();

  return (
    <div id="main-menu">
      <header>2048</header>
      <div id="button-container">
        <Link to="/game" className="menu-btn" onClick={startNewGame}>
          START GAME
        </Link>
        <Link to="/highscores" className="menu-btn disabled-btn">
          HIGH SCORES
          <br />
          (not yet implemented)
        </Link>
      </div>
    </div>
  );
};

export default MainMenu;
