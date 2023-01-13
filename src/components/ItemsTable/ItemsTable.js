import React from "react";
import classes from "./ItemsTable.module.css";

const ItemsTable = ({ items }) => {
  return (
    <>
      <p className={classes.title}>Compare Items</p>
      <table className={classes.itemsTable}>
        <tbody>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
          {items.map((item, i) => {
            return (
              <tr key={item.name}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ItemsTable;
