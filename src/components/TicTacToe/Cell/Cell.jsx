import React from "react";
import "./Cell.scss";
const Cell = (props) => {
  const { handleClick, cellData } = props;
  return (
    <div
      className={`cell ${cellData.cellClassName}`}
      dataset={`${cellData.id}`}
      onClick={(e) => {
        handleClick(e);
      }}
      data-cell
    ></div>
  );
};

export default Cell;
