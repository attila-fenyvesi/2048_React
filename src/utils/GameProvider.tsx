import React, { useReducer } from "react";
import { GameContext } from "./GameContext";
import GameReducer, { initialState } from "./GameReducer";

const GameProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(GameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
