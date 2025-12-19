import React, { useState, useEffect, useRef } from "react";
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

  const formatDate = (dateString) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <tr className="game-row">
      <td>{data.name}</td>
      <td>{data.price}</td>
      <td>{formatDate(data.createdAt)}</td>
      <td>{data.description}</td>
      <td>{data.sold}</td>

      <td className="action-cell" ref={menuRef}>
        <button
          className="action-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>

        {isMenuOpen && (
          <div className="action-menu">
            <button
              className="menu-item"
              onClick={() => {
                onEdit(data);
                setIsMenuOpen(false);
              }}
            >
              <svg
                className="menu-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Editar
            </button>
            <button
              className="menu-item"
              onClick={() => {
                onDelete(data);
                setIsMenuOpen(false);
              }}
            >
              <svg
                className="menu-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              Deletar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default GameTableRow;
