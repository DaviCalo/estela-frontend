import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil-2.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/more-vertical.svg";
import "./CategoryFormDialog.css";

const CategoryTableRow = ({ cat, onEdit, onDelete }) => {
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
    <tr key={cat.categoryId}>
      <td title={cat.categoryId}>{cat.categoryId}</td>
      <td title={cat.name} className="name-td-categoriry-form-dialog">
        {cat.name}
      </td>
      <td className="action-cell-category-row">
        <button
          className="action-btn-category-row"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MoreIcon />
        </button>

        {isMenuOpen && (
          <div className="action-menu-category-row">
            <button
              className="menu-item-category-row"
              onClick={() => {
                onEdit(cat);
                setIsMenuOpen(false);
              }}
            >
              <EditIcon className="menu-icon-category-row" />
              Editar
            </button>
            <button
              className="menu-item-category-row"
              onClick={() => {
                onDelete(cat.categoryId);
                setIsMenuOpen(false);
              }}
            >
              <DeleteIcon className="menu-icon-category-row" />
              Deletar
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default CategoryTableRow;
