import React from "react";
import "./SaleTable.css";

const SaleTable = ({ headers, children }) => {
  return (
    <div className="sale-table-container">
      <table className="sale-table-component">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default SaleTable;
