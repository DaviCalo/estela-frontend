import React, { useState, useEffect } from "react";
import categoryApi from "../../api/ApiCategory.js";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import CategoryTableRow from "./CategoryTableRow.jsx";
import "./CategoryFormDialog.css";

const CategoryFormDialog = ({ isOpen, onClose }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listOfCategories, setListOfCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getAllCategories();
      setListOfCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setListOfCategories([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await categoryApi.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao deletar categoria.");
    }
  };

  const handleEditClick = (category) => {
    setEditingId(category.categoryId);
    setCategoryName(category.name);
    setIsPopupOpen(true);
  };

  const handleCreateClick = () => {
    setEditingId(null);
    setCategoryName("");
    setIsPopupOpen(true);
  };

  const handleSave = async () => {
    if (!categoryName.trim()) return alert("O nome não pode ser vazio");

    try {
      if (editingId) {
        await categoryApi.updateCategory(editingId, categoryName);
      } else {
        await categoryApi.saveCategory(categoryName);
      }
      setIsPopupOpen(false);
      setCategoryName("");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar categoria.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="categories-container">
      <div className="categories-dialog">
        <div className="categories-header">
          <h2>Categorias</h2>
          <button className="categories-close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="categories-table-wrapper">
          <table className="categories-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>ID</th>
                <th style={{ width: "80%" }}>CATEGORIA</th>
              </tr>
            </thead>
            <tbody>
              {listOfCategories?.length > 0 ? (
                listOfCategories.map((cat) => (
                  <CategoryTableRow
                    key={cat.categoryId}
                    cat={cat}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    Nenhuma categoria cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="categories-footer">
          <button className="categories-btn-add" onClick={handleCreateClick}>
            Criar Categoria
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="categories-popup-overlay">
          <div className="categories-popup-content">
            <div className="categories-header">
              <h3>{editingId ? "Editar categoria" : "Criar nova categoria"}</h3>
              <button
                className="categories-close-btn"
                onClick={() => setIsPopupOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="categories-popup-body">
              <label>Categoria:</label>
              <div className="categories-input-wrapper">
                <span className="categories-at-symbol">@</span>
                <input
                  type="text"
                  placeholder="Digite o nome da categoria"
                  autoFocus
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>

            <div className="categories-popup-footer">
              <button className="categories-btn-add" onClick={handleSave}>
                {editingId ? "Atualizar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFormDialog;
