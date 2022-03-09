import React, { useContext } from "react";
import { GameContext } from "../../utils/GameContext";
import Tile from "../Tile";
import { TileType } from "../Tile/Tile";

const Playground = () => {
  const { state } = useContext(GameContext);

  const gridCells: any[] = [];
  for (let i = 0; i < 16; ++i) {
    gridCells.push(<div key={`gridcell-${i}`} className="gridcell" />);
  }

  const tiles: any[] = [];
  state.tiles.forEach((row: (TileType | null)[]) => {
    row.forEach((tile: TileType | null) => {
      if (tile !== null) {
        tiles.push(<Tile key={`tile-${tile.id}`} {...tile} />);
      }
    });
  });

  return (
    <div id="playground">
      <div id="grid">{gridCells}</div>
      {tiles}
    </div>
  );
};

export default Playground;
