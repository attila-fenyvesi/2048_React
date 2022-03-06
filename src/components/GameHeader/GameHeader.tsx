import React, { useContext } from "react";
import { GameContext } from "../../utils/GameContext";

const GameHeader = () => {
  const { state, dispatch } = useContext(GameContext);

  return (
    <div id="game-header">
      <div id="score" className="header-tile">
        <span className="label">SCORE</span>
        <span className="value">{state.score}</span>
      </div>
    </div>
  );
};

export default GameHeader;
