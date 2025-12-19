import React, { useState, useEffect } from "react";
import categoryApi from "../../api/ApiCategory.js";
import "./CategoryDialog.css";

const CategoryDialog = ({ isOpen, onClose }) => {
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
            &times;
          </button>
        </div>

        <div className="categories-table-wrapper">
          <table className="categories-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>ID</th>
                <th>CATEGORIA</th>
                <th style={{ width: "80px", textAlign: "center" }}>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {listOfCategories.map((cat) => (
                <tr key={cat.categoryId}>
                  <td>{cat.categoryId}</td>
                  <td>{cat.name}</td>
                  <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    {/* Botão de Editar */}
                    <button 
                      className="categories-btn-icon-edit"
                      onClick={() => handleEditClick(cat)}
                      title="Editar"
                      style={{ cursor: "pointer", background: "none", border: "none", color: "blue" }}
                    >
                      ✎
                    </button>

                    {/* Botão de Deletar */}
                    <button
                      className="categories-btn-icon-delete"
                      onClick={() => handleDelete(cat.categoryId)}
                      title="Excluir"
                      style={{ cursor: "pointer", background: "none", border: "none", color: "red", fontWeight: "bold" }}
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="categories-footer">
          <button
            className="categories-btn-add"
            onClick={handleCreateClick}
          >
            Adicionar
          </button>
          
          <button className="categories-btn-close-footer" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>

      {/* --- POPUP DE CRIAÇÃO / EDIÇÃO --- */}
      {isPopupOpen && (
        <div className="categories-popup-overlay">
          <div className="categories-popup-content">
            <div className="categories-header">
              <h3>{editingId ? "Editar categoria" : "Criar nova categoria"}</h3>
              <button
                className="categories-close-btn"
                onClick={() => setIsPopupOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="categories-popup-body">
              <label>Categoria:</label>
              <div className="categories-input-wrapper">
                <span className="categories-at-symbol">@</span>
                <input 
                  type="text" 
                  placeholder="Digite o nome..." 
                  autoFocus 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>

            <div className="categories-popup-footer">
              <button
                className="categories-btn-confirm"
                onClick={handleSave}
              >
                {editingId ? "Atualizar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDialog;