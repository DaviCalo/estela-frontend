import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil-2.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more-vertical.svg";
import { formatCurrency, formatDate } from "../../utils/formatters.js";
import "./GameTable.css";

const GameTableRow = ({ data, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <tr className="game-row">
      <td>{data.name}</td>
      <td>{formatCurrency(data.price)}</td>
      <td>{formatDate(data.createdAt)}</td>
      <td>{data.description}</td>
      <td>{data.sold}</td>

      <td className="action-cell-game-row" ref={menuRef}>
        <button
          className="action-btn-game-row"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MoreIcon />
        </button>

        {isMenuOpen && (
          <div className="action-menu-game-row">
            <button
              className="menu-item-game-row"
              onClick={() => {
                onEdit(data);
                setIsMenuOpen(false);
              }}
            >
              <EditIcon className="menu-icon-game-row" />
              Editar
            </button>
            <button
              className="menu-item-game-row"
              onClick={() => {
                onDelete(data);
                setIsMenuOpen(false);
              }}
            >
              <DeleteIcon className="menu-icon-game-row" />
              Deletar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default GameTableRow;
