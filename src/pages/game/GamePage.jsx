import React, { useState, useEffect } from "react";
import GameFormDialog from "../../components/gameFormDialog/GameFormDialog.jsx";
import GameTable from "../../components/gameTableRow/GameTable.jsx";
import GameTableRow from "../../components/gameTableRow/GameTableRow.jsx";
import ApiGame from "../../api/ApiGame.js";
import CategoryFormDialog from "../../components/categoryFormDialog/CategoryFormDialog.jsx";
import "./GamePage.css";

const GamePage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [gameIdEdited, setGameIdEdited] = useState(null);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [games, setGames] = useState([]);

  const tableHeaders = [
    "NOME",
    "PREÇO",
    "DATA DE LANÇAMENTO",
    "DESCRIÇÃO",
    "VENDIDOS",
  ];

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const data = await ApiGame.getListOfGameDetails();
      setGames(data || []);
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
    }
  };

  const handleEdit = (gameData) => {
    setIsFormOpen(true);
    setGameIdEdited(gameData.gameId);
  };

  const handleDelete = async (gameData) => {
    try {
      await ApiGame.deleteById(gameData.gameId);
      fetchGames();
    } catch (error) {
      console.error("Error delete games", error);
    }
  };

  return (
    <div>
      <div className="header-gamepage">
        <h1 className="title-page">Jogos Cadastrados</h1>
        <div className="button-group-gamepage">
          <button
            className="edit-categ-button-group-gamepage"
            onClick={() => {
              console.log("Botão clicado! Abrindo dialog...");
              setIsCatOpen(true);
            }}
          >
            Editar Categorias
          </button>
          <button
            className="add-game-button-group-gamepage"
            onClick={() => setIsFormOpen(true)}
          >
            Adicionar Jogo
          </button>
        </div>
      </div>
      <div className="game-page-container">
        <GameTable headers={tableHeaders}>
          {games?.length > 0 ? (
            games.map((gameItem) => (
              <GameTableRow
                key={gameItem.gameId || gameItem.id}
                data={gameItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                Nenhum jogo cadastrado.
              </td>
            </tr>
          )}
        </GameTable>
      </div>
      <GameFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setGameIdEdited(null);
          setTimeout(() => {
            fetchGames();
          }, 1500);
        }}
        gameId={gameIdEdited}
      />
      <CategoryFormDialog
        isOpen={isCatOpen}
        onClose={() => setIsCatOpen(false)}
      />
    </div>
  );
};

export default GamePage;
