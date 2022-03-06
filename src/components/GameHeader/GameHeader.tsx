import React, { useContext } from "react";
import { GameContext } from "../../utils/GameContext";
import Display from "../Display";
import { Link } from "react-router-dom";

const GameHeader = () => {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div id="game-header">
      <div>
        <Display labelText="HIGH SCORE" value={20220} />
        <Link to="/leaderboard" className="header-btn disabled-btn">
          LEADERBOARD
        </Link>
      </div>
      <div>
        <Display labelText="SCORE" value={state.score} />
        <Link to="/" className="header-btn">
          MAIN MENU
        </Link>
      </div>
    </div>
  );
};

export default GameHeader;
