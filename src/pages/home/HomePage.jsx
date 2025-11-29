import React, { useState, useEffect } from "react";
import "./home.css";
import logo from "../../assets/images/logo.png";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Cardhome from "../../components/card/cardhome.jsx";
import banner from "../../assets/images/bannerhk.png";
import game from "../../api/game.js";

const HomePage = () => {
  const [listOfGames, setListOfGames] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await game.getAllGame();
        setListOfGames(games);
        console.log(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="home-container">
      <div id="full">
        <Sidebar />
        <div id="content">
          <div
            id="banner-image"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
          <div id="content-wrapper">
            <h1>Lançamentos</h1>
            <p>Veja as novidades populares desse mês</p>

            <div id="card-wrapper">
              {listOfGames &&
                listOfGames.map((game) => (
                  <Cardhome
                    key={game.gameId}
                    name={game.name}
                    price={game.price}
                    coverUrl={game.coverUrl}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
