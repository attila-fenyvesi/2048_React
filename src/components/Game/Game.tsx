import React, { useContext } from "react";
import GameHeader from "../GameHeader";
import GameLogic from "../../utils/GameLogic";
import Playground from "../Playground";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { GameContext } from "../../utils/GameContext";
import { Direction } from "../../utils/GameLogic";

const Game = () => {
  const { state, dispatch } = useContext(GameContext);
  const [startNewGame, moveTiles] = GameLogic();

  const onKeyPress = (key: string, e: object) => {
    switch (key) {
      case "enter":
        startNewGame();
        break;
      case "up":
        moveTiles(Direction.UP);
        break;
      case "down":
        moveTiles(Direction.DOWN);
        break;
      case "left":
        moveTiles(Direction.LEFT);
        break;
      case "right":
        moveTiles(Direction.RIGHT);
        break;
    }
  };

  return (
    <>
      <GameHeader />
      <Playground />

      <KeyboardEventHandler
        handleKeys={["up", "down", "left", "right", "enter"]}
        onKeyEvent={onKeyPress}
        isDisabled={state.isMoving}
      />
    </>
  );
};

export default Game;
