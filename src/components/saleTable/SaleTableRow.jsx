import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { formatCurrency, formatDate } from "../../utils/formatters.js";
import "./SaleTable.css";

const SaleTableRow = ({ data, onDelete }) => {
  const gamesListString = data.listOfGames
    ? data.listOfGames.map((sale) => sale.name).join(", ")
    : "";

  const totalItems = data.listOfGames ? data.listOfGames.length : 0;

  return (
    <tr className="sale-table-row">
      <td>{data.userName}</td>
      <td>{formatCurrency(data.totalPrice)}</td>
      <td>{formatDate(data.dataSale)}</td>

      <td className="sales-list-cell" title={gamesListString}>
        {gamesListString}
      </td>

      <td style={{ textAlign: "center", paddingLeft: "20px" }}>{totalItems}</td>

      <td className="action-cell-sale-table-row">
        <button
          className="action-btn-sale-table-row delete-mode"
          onClick={() => onDelete(data)}
          title="Excluir Venda"
        >
          <DeleteIcon />
        </button>
      </td>
    </tr>
  );
};

export default SaleTableRow;
