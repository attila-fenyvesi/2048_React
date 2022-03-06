import React, { createContext } from "react";
import { GameState, initialState } from "./GameReducer";

interface GameContextInterface {
  state: GameState;
  dispatch: React.Dispatch<any>;
}

export const GameContext = createContext<GameContextInterface>({
  state: initialState,
  dispatch: () => null,
});
