import React, { useState, useEffect, useMemo, useRef } from "react";
import "./GameDetailsPage.css";
import { useParams } from "react-router-dom";
import ApiGame from "../../api/ApiGame.js";
import ApiWishlist from "../../api/ApiWishlist.js";
import GameCarousel from "../../components/gameCarrosel/GameCarousel.jsx";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import CartStorageManager from "../../utils/CartStorageManager.js";
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/bx-left-arrow-circle.svg";
import { ReactComponent as RightLeftIcon } from "../../assets/icons/bx-right-arrow-circle.svg";

const initialGameData = {
  name: "",
  price: "",
  description: "",
  characteristics: "",
  coverImage: null,
  iconImage: null,
  screenshots: [],
  categoryIds: [],
  operatingSystem: "",
  processor: "",
  memory: "",
  diskSpace: "",
  videoCard: "",
  categories: [],
  gameId: null,
};

const GameDetailsPage = () => {
  const { name } = useParams();
  const scrollRef = useRef(null);

  const [gameData, setGameData] = useState(initialGameData);
  const [listOfGames, setListOfGames] = useState(null);
  const [listOfGamesInWishlist, setlistOfGamesInWishlist] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  // Estados de Imagem
  const [previewCoverUrl, setPreviewCoverUrl] = useState(null);
  const [screenshotsPreviews, setScreenshotsPreviews] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  // 1. Galeria Unificada
  const galleryImages = useMemo(() => {
    const images = [];
    if (previewCoverUrl) images.push(previewCoverUrl);
    if (screenshotsPreviews && screenshotsPreviews.length > 0) {
      images.push(...screenshotsPreviews.filter((url) => url));
    }
    return images;
  }, [previewCoverUrl, screenshotsPreviews]);

  // 2. Efeito de Segurança: Se a galeria carregar mas a imagem ativa estiver vazia, seleciona a primeira
  useEffect(() => {
    if (!activeImage && galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
    }
  }, [galleryImages, activeImage]);

  useEffect(() => {
    if (name) {
      const fetchGameDetails = async () => {
        try {
          const response = await ApiGame.getGameDetailsByName(name);
          const data = response;

          console.log("Dados do jogo recebidos:", data); // DEBUG

          let coverUrl = null;
          let iconUrl = null;
          let loadedScreenshots = [];

          // VERIFICAÇÃO IMPORTANTE: ApiGame.getMediaUrl DEVE retornar o caminho completo (http://...)
          // Se retornar apenas o nome do arquivo, a imagem não vai carregar.
          
          if (data.urlCover) {
            coverUrl = ApiGame.getMediaUrl(data.urlCover);
            setPreviewCoverUrl(coverUrl);
            setActiveImage(coverUrl); 
          }

          if (data.urlIcon) {
            iconUrl = ApiGame.getMediaUrl(data.urlIcon);
          }

          if (data.urlsScreenshots && data.urlsScreenshots.length > 0) {
            loadedScreenshots = data.urlsScreenshots.map((url) =>
              ApiGame.getMediaUrl(url)
            );
            setScreenshotsPreviews(loadedScreenshots);
          }

          setGameData({
            name: data.name || "",
            price: data.price || "",
            description: data.description || "",
            characteristics: data.characteristics || "",
            operatingSystem: data.operatingSystem || "",
            processor: data.processor || "",
            memory: data.memory || "",
            diskSpace: data.hardDriveSpace || "",
            videoCard: data.graphicsCard || "",
            categoryIds: data.categoryIds || [],
            coverImage: coverUrl,
            iconImage: iconUrl,
            categories: data.categories || [],
            gameId: data.gameId,
            screenshots: loadedScreenshots,
          });
        } catch (error) {
          console.error("Erro ao carregar detalhes do jogo:", error);
        }
      };
      fetchGameDetails();
    }
  }, [name]);

  // Restante dos efeitos (Carrinho, Wishlist, etc)
  useEffect(() => {
    if (gameData.gameId) {
      const cart = CartStorageManager.getCartFromLocalStorage() || [];
      setIsAdded(cart.includes(gameData.gameId));
    }
  }, [gameData.gameId]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const games = await ApiGame.getAllGame();
        setListOfGames(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();

    const getWishlist = async (userId) => {
      try {
        const gamesWishlist = await ApiWishlist.getWishlist(userId);
        setlistOfGamesInWishlist(gamesWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()?.userid;
    if (userId) {
      getWishlist(userId);
    }
  }, []);

  const onGetWislist = async () => {
    try {
      const userId = LocalStorageManager.getLoggedInUserFromLocalStorage()?.userid;
      const gamesWishlist = await ApiWishlist.getWishlist(userId);
      setlistOfGamesInWishlist(gamesWishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const isWishlist = (gameId) => {
    return listOfGamesInWishlist?.some((item) => item === gameId) || false;
  };

  const recentGames = useMemo(() => {
    if (!listOfGames) return [];
    return [...listOfGames].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [listOfGames]);

  // Lógica de Navegação
  const handleImageNavigation = (direction) => {
    if (galleryImages.length === 0) return;

    const currentImg = activeImage || galleryImages[0];
    const currentIndex = galleryImages.indexOf(currentImg);
    
    let nextIndex;
    if (direction === "left") {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
    } else {
      nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
    }

    const nextImage = galleryImages[nextIndex];
    setActiveImage(nextImage);

    const thumbnailElement = document.getElementById(`thumb-${nextIndex}`);
    if (thumbnailElement && scrollRef.current) {
        thumbnailElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
  };

  const handleBuyClick = () => {
    if (gameData && gameData.gameId) {
      if (!isAdded) {
        CartStorageManager.addGameIdToCart(gameData.gameId);
        setIsAdded(true);
      } else {
        CartStorageManager.removeGameIdFromCart(gameData.gameId);
        setIsAdded(false);
      }
    }
  };

  return (
    <main className="page-details-main">
      <h1 className="page-details-title">{gameData.name}</h1>

      <div className="page-details-top-layout">
        <section className="page-details-media-gallery">
          {/* Display Principal */}
          <div style={{minHeight: "300px", width: "100%", backgroundColor: "#000", borderRadius: "12px"}}>
            <img
                src={activeImage || "https://via.placeholder.com/600x400?text=Sem+Imagem"}
                alt="Display principal"
                className="page-details-active-view"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Erro+na+Imagem"; }} 
            />
          </div>

          {/* Faixa de Miniaturas */}
          <div className="page-details-thumb-strip">
            <ArrowLeftIcon
              className="page-details-nav-icon"
              onClick={() => handleImageNavigation("left")}
            />

            <div
              className="page-details-thumbnails-wrapper page-details-hide-scrollbar"
              ref={scrollRef}
            >
              {galleryImages.length > 0 ? (
                  galleryImages.map((url, index) => (
                    <img
                      key={index}
                      id={`thumb-${index}`}
                      src={url}
                      alt={`Thumbnail ${index}`}
                      className={`page-details-thumb-img ${
                        activeImage === url ? "selected" : ""
                      }`}
                      onClick={() => setActiveImage(url)}
                      onError={(e) => { e.target.style.display = 'none'; }} // Esconde miniatura quebrada
                    />
                  ))
              ) : (
                  <p style={{color: "#888", width: "100%", textAlign: "center"}}>Sem imagens adicionais</p>
              )}
            </div>

            <RightLeftIcon
              className="page-details-nav-icon"
              onClick={() => handleImageNavigation("right")}
            />
          </div>
        </section>

        <aside className="page-details-checkout-card">
          <div className="page-details-btn-group">
            <button
              className={`page-details-buy-now-btn ${isAdded ? "added" : ""}`}
              onClick={handleBuyClick}
            >
              {isAdded ? "Adicionado ao carrinho" : "Comprar"}
            </button>
            <button className="page-details-wishlist-add-btn">
              Adicionar à Lista de Desejos
            </button>
          </div>
          <div className="page-details-genre-tags">
            <p>Gênero:</p>
            <div className="page-details-tag-cloud">
              {gameData.categories && gameData.categories.length > 0 ? (
                gameData.categories.map((category) => (
                  <span key={category.categoryId}>{category.name}</span>
                ))
              ) : (
                <span>Sem categoria</span>
              )}
            </div>
          </div>
        </aside>
      </div>

      <section className="page-details-text-info">
        <h3>SOBRE ESTE JOGO:</h3>
        <br />
        <p>{gameData.description}</p>
        <p>{gameData.characteristics}</p>
      </section>

      <section className="page-details-specs-box">
        <h4>REQUISITOS MÍNIMOS DO SISTEMA:</h4>
        <div className="page-details-specs-grid">
          <p><strong>SO:</strong> {gameData.operatingSystem}</p>
          <p><strong>Processador:</strong> {gameData.processor}</p>
          <p><strong>Memória:</strong> {gameData.memory}</p>
          <p><strong>Vídeo:</strong> {gameData.videoCard}</p>
        </div>
      </section>

      <GameCarousel
        title="Lançamentos"
        subtitle="Veja as novidades populares desse mês"
        games={recentGames}
        verifyWishlist={isWishlist}
        handleWishlistToggle={onGetWislist}
      />
    </main>
  );
};

export default GameDetailsPage;