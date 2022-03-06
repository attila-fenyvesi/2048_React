import Tile, { TileType, Position } from "../components/Tile/Tile";

export type GameState = {
  tiles: (TileType | null)[][];
  trash: TileType[];
  isMoving: boolean;
  score: number;
};

export const initialState: GameState = {
  tiles: [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ],
  trash: [],
  isMoving: false,
  score: 0,
};

export enum Action {
  INIT_GAME,
  ADD_TILE,
  MOVE_TILE,
  MERGE_TILES,
  CLEAN_UP,
}

type ReducerAction =
  | { type: Action.INIT_GAME }
  | { type: Action.ADD_TILE; tile: TileType }
  | { type: Action.MOVE_TILE; source: Position; dest: Position }
  | { type: Action.MERGE_TILES; source: Position; dest: Position }
  | { type: Action.CLEAN_UP };

const GameReducer = (state: GameState, action: ReducerAction) => {
  switch (action.type) {
    case Action.INIT_GAME:
      return JSON.parse(JSON.stringify(initialState));

    case Action.ADD_TILE:
      const pos: Position = action.tile.position;

      state.tiles[pos.y][pos.x] = { ...action.tile };

      return { ...state };

    case Action.MOVE_TILE:
      const sourcePos: Position = action.source;
      const destPos: Position = action.dest;

      state.isMoving = true;
      state.tiles[destPos.y][destPos.x] = {
        ...(state.tiles[sourcePos.y][sourcePos.x] as TileType),
      };
      (state.tiles[destPos.y][destPos.x] as TileType).position = destPos;
      state.tiles[sourcePos.y][sourcePos.x] = null;

      return { ...state };

    case Action.MERGE_TILES:
      const srcPos: Position = action.source;
      const dstPos: Position = action.dest;

      state.isMoving = true;
      (state.tiles[dstPos.y][dstPos.x] as TileType).value *= 2;
      state.score += (state.tiles[dstPos.y][dstPos.x] as TileType).value;
      (state.tiles[dstPos.y][dstPos.x] as TileType).blocked = true;
      (state.tiles[dstPos.y][dstPos.x] as TileType).merging = true;

      (state.tiles[srcPos.y][srcPos.x] as TileType).position = dstPos;
      state.trash.push(state.tiles[srcPos.y][srcPos.x] as TileType);
      state.tiles[srcPos.y][srcPos.x] = null;

      return { ...state };

    case Action.CLEAN_UP:
      for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
          const tile: TileType | null = state.tiles[y][x];
          if (tile) {
            (state.tiles[y][x] as TileType).blocked = false;
            (state.tiles[y][x] as TileType).merging = false;
          }
        }
      }

      state.trash.length = 0;
      state.isMoving = false;

      return { ...state };

    default:
      return state;
  }
};

export default GameReducer;
