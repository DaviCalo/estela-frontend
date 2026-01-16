import React from "react";
import "./GameTable.css";

const GameTable = ({ headers, children }) => {
  return (
    <div className="game-table-container">
      <table className="game-table-component">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        {/* O conteúdo injetado aqui via children (GameTableRow) 
            agora terá a classe de truncamento aplicada */}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default GameTable;