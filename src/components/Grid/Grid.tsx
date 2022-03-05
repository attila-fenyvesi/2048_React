const Grid = () => {
  const gridCells: any[] = [];

  for (let i = 0; i < 16; ++i) {
    gridCells.push(<div key={`gridcell-${i}`} className="gridcell" />);
  }
  return <div id="grid">{gridCells}</div>;
};

export default Grid;
