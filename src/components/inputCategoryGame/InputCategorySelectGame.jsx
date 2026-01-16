import React, { useState, useEffect, useRef } from 'react';
import './InputCategorySelectGame.css';
import categoryApi from '../../api/ApiCategory.js'; 

const InputCategorySelectGame = ({ 
  label = "Categorias", 
  placeholder = "Digite para buscar...", 
  selectedIds = [], 
  onChange, 
  required = false,
  width = "100%"
}) => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        if (Array.isArray(response)) {
          setAvailableCategories(response);
        } else if (response && Array.isArray(response.data)) {
          setAvailableCategories(response.data);
        } else {
          setAvailableCategories([]);
        }
      } catch (error) {
        console.error(error);
        setAvailableCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm(""); // Limpa a busca ao fechar
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Foco automático: Quando abrir, foca no input para digitar
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelectCategory = (categoryId) => {
    let newSelectedIds;
    if (selectedIds.includes(categoryId)) {
      newSelectedIds = selectedIds.filter(id => id !== categoryId);
    } else {
      newSelectedIds = [...selectedIds, categoryId];
    }
    onChange(newSelectedIds);
    // Nota: Não fechamos o menu aqui para permitir múltipla seleção
  };

  const getDisplayValue = () => {
    if (isOpen) return searchTerm; // Se aberto, mostra o que tá digitando
    if (selectedIds.length === 0) return "";
    
    // Mostra os nomes selecionados separados por vírgula
    const selectedNames = availableCategories
      .filter(category => selectedIds.includes(category.categoryId))
      .map(category => category.name);
      
    return selectedNames.join(", ");
  };

  const filteredCategories = (availableCategories || []).filter(category => 
    category && category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cat-select-container" style={{ width: width }} ref={dropdownRef}>
      
      {/* Wrapper principal: O clique aqui abre/fecha */}
      <div 
        className={`cat-select-wrapper ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className="cat-select-label">
          {label} {required && "(obrigatório)"}
        </label>

        <input
          ref={inputRef}
          type="text"
          className="cat-select-input"
          placeholder={selectedIds.length > 0 && !isOpen ? "" : placeholder}
          value={getDisplayValue()} 
          onChange={(e) => setSearchTerm(e.target.value)}
          // IMPORTANTE: Impede o "piscada". Se fechado, o input ignora cliques (o wrapper trata).
          // Se aberto, o input funciona normal.
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          readOnly={!isOpen}
        />
        
        <span className={`cat-select-arrow ${isOpen ? 'rotated' : ''}`}>▼</span>

        {isOpen && (
          <div className="cat-select-list">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div 
                  key={category.categoryId} 
                  // Adiciona classes separadas para SELECIONADO e HOVER
                  className={`cat-select-item ${selectedIds.includes(category.categoryId) ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Impede que o clique feche o menu
                    handleSelectCategory(category.categoryId);
                  }}
                >
                  <span>{category.name}</span>
                  {selectedIds.includes(category.categoryId) && <span className="cat-select-check">✓</span>}
                </div>
              ))
            ) : (
              <div className="cat-select-no-results">Nenhuma categoria encontrada</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCategorySelectGame;