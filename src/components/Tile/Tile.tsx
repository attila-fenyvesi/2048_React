import React from "react";

export type Position = {
  x: number;
  y: number;
};

export type TileType = {
  id: number;
  position: Position;
  value: number;
  blocked: boolean;
  merging: boolean;
};

const Tile = ({ id, position, value }: TileType) => {
  const style = {
    top: `${position.y * 112 + 12}px`,
    left: `${position.x * 112 + 12}px`,
  };

  return (
    <div key={`tile-${id}`} className={`tile tile-${value}`} style={style}>
      {value}
    </div>
  );
};

export default Tile;
