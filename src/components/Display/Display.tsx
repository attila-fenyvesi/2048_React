import React from "react";

const Display = ({
  labelText,
  value,
}: {
  labelText: string;
  value: number;
}) => {
  return (
    <div className="display">
      <span className="label">{labelText}</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default Display;
