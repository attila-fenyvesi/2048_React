import { Action } from "./GameReducer";
import { useContext } from "react";
import { Position, TileType } from "../components/Tile/Tile";
import { GameContext } from "./GameContext";
import { range } from "./Helpers";

export enum Direction {
  UP = 1,
  DOWN = 2,
  LEFT = 4,
  RIGHT = 8,
}

const GameLogic = () => {
  const { state, dispatch } = useContext(GameContext);

  const testCellValue = (x: number, y: number, val: number) => {
    if (x < 0 || x > 3 || y < 0 || y > 3 || !state.tiles[y][x]) return false;
    return (state.tiles[y][x] as TileType).value === val;
  };

  const canMove = () => {
    for (let x = 0; x <= 3; ++x) {
      for (let y = 0; y <= 3; ++y) {
        if (!state.tiles[y][x]) return true;
        if (testCellValue(x + 1, y, (state.tiles[y][x] as TileType).value))
          return true;
        if (testCellValue(x - 1, y, (state.tiles[y][x] as TileType).value))
          return true;
        if (testCellValue(x, y + 1, (state.tiles[y][x] as TileType).value))
          return true;
        if (testCellValue(x, y - 1, (state.tiles[y][x] as TileType).value))
          return true;
      }
    }

    return false;
  };

  const getRandomEmptyCell = (): Position | null => {
    let cells: Position[] = availableCells();

    if (cells.length) {
      return cells[Math.floor(Math.random() * cells.length)];
    } else {
      return null;
    }
  };

  const availableCells = (): Position[] => {
    let cells: Position[] = [];

    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        if (state.tiles[y][x] === null) {
          cells.push({ x: x, y: y });
        }
      }
    }

    return cells;
  };

  const hasEmptyCells = () => {
    return !!availableCells().length;
  };

  const addRandomTile = () => {
    if (hasEmptyCells()) {
      const value: number = Math.random() < 0.9 ? 2 : 4;
      const cell: Position | null = getRandomEmptyCell();

      const tile: TileType = {
        id: Math.ceil(Math.random() * 100000),
        position: cell as Position,
        value: value,
        blocked: false,
        merging: false,
      };

      dispatch({
        type: Action.ADD_TILE,
        tile: tile,
      });
    }

    if (!canMove()) {
    }
  };

  const moveTilesInner = (x: number, y: number, direction: Direction) => {
    var currentTile: TileType | null = state.tiles[y][x];

    if (!currentTile) return;

    let x_prev: number = x;
    let y_prev: number = y;

    const from: number = direction & 3 ? y : x;
    const fromShift: number = direction & 5 ? -1 : 1;
    const to: number = direction & 5 ? 0 : 3;

    for (let i of range(from + fromShift, to)) {
      const x_: number = direction & 3 ? x : i;
      const y_: number = direction & 3 ? i : y;

      const targetTile = state.tiles[y_][x_];

      if (targetTile) {
        if (!targetTile.blocked && targetTile.value === currentTile.value) {
          dispatch({
            type: Action.MERGE_TILES,
            source: { x: x, y: y },
            dest: { x: x_, y: y_ },
          });
          return;
        } else {
          if (x_prev !== x || y_prev !== y) {
            dispatch({
              type: Action.MOVE_TILE,
              source: { x: x, y: y },
              dest: { x: x_prev, y: y_prev },
            });
          }
          return;
        }
      } else if (i === 0 || i === 3) {
        dispatch({
          type: Action.MOVE_TILE,
          source: { x: x, y: y },
          dest: { x: x_, y: y_ },
        });
        return;
      }

      x_prev = x_;
      y_prev = y_;
    }
  };

  const moveTiles = (direction: Direction) => {
    const from: number = direction & 5 ? 1 : 2;
    const to: number = direction & 5 ? 3 : 0;

    for (let outer of range(from, to)) {
      for (var inner of range(0, 3)) {
        if (direction & 3) {
          moveTilesInner(inner, outer, direction);
        } else {
          moveTilesInner(outer, inner, direction);
        }
      }
    }

    setTimeout(() => {
      if (state.isMoving) {
        addRandomTile();
      }
      dispatch({
        type: Action.CLEAN_UP,
      });
    }, 200);
  };

  const startNewGame = () => {
    dispatch({
      type: Action.INIT_GAME,
    });
    addRandomTile();
    addRandomTile();
  };

  return [startNewGame, moveTiles] as [
    () => void,
    (direction: Direction) => void
  ];
};

export default GameLogic;
