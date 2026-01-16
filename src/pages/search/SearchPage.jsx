import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ApiGame from "../../api/ApiGame";
import "./SearchPage.css";

const SearchPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [listOfGames, setlistOfGames] = useState([]);

  useEffect(() => {
    const searchGame = async () => {
      try {
        const result = await ApiGame.searchGame(name);

        if (Array.isArray(result)) {
          setlistOfGames(result);
        } else {
          setlistOfGames([]);
        }
      } catch (error) {
        console.error("Erro na busca:", error);
        setlistOfGames([]);
      }
    };
    if (name) {
      searchGame();
    }
  }, [name]);

  const handleCardClick = (nameGame) => {
    const slug = nameGame
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    navigate(`/game/${encodeURIComponent(slug)}`);
  };

  return (
    <div className="page-search-container">
      <h2 className="page-search-title">Resultados para: "{name}"</h2>

      {listOfGames.length > 0 ? (
        <div className="search-results-grid">
          {listOfGames.map((game) => (
            <div
              key={game.gameId}
              className="search-card-item"
              onClick={() => handleCardClick(game.name)}
            >
              <img
                src={ApiGame.getMediaUrl(game.coverUrl)}
                alt={game.name}
                className="search-card-img"
              />
              <div className="search-card-info">
                <h3>{game.name}</h3>
                <p className="price">R$ {game.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">
          Nenhum resultado encontrado para sua pesquisa.
        </p>
      )}
    </div>
  );
};

export default SearchPage;
