import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Apigame from "../../api/ApiGame.js";
import InputTextFormGame from "./InputTextFormGame.jsx";
import DefaultCoverImg from "../../assets/images/cover-game.png";
import DefaultIconImg from "../../assets/images/icon-game.png";
import DefaultMediaImg from "../../assets/images/media-game.png";
import InputCategorySelectGame from "../inputCategoryGame/InputCategorySelectGame.jsx";
import "./GameFormDialog.css";

const initialGameData = {
  name: "",
  price: "",
  description: "",
  caracteristics: "",
  coverImage: null,
  iconImage: null,
  media: Array(6).fill(null),
  categoryIds: [],
  operatingSystem: "",
  processor: "",
  memory: "",
  diskSpace: "",
  videoCard: "",
};

const GameFormDialog = ({ isOpen, onClose, gameId }) => {
  const [indexStep, setIndexStep] = useState(0);
  const coverInputRef = useRef(null);
  const iconInputRef = useRef(null);
  const [previewCoverUrl, setPreviewCoverUrl] = useState(DefaultCoverImg);
  const [previewUrlIcon, setPreviewUrlIcon] = useState(DefaultIconImg);
  const mediaInputRefs = useRef([]);
  const [mediaPreviews, setMediaPreviews] = useState(
    Array(6).fill(DefaultMediaImg)
  );

  const [gameData, setGameData] = useState(initialGameData);

  useEffect(() => {
    if (isOpen) {
      if (gameId) {
        const fetchGameDetails = async () => {
          try {
            const response = await Apigame.getGameDetailsById(gameId);
            const data = response.game || response;

            setGameData({
              name: data.name || "",
              price: data.price || "",
              description: data.description || "",
              caracteristics: data.characteristics || "",
              operatingSystem: data.operatingSystem || "",
              processor: data.processor || "",
              memory: data.memory || "",
              diskSpace: data.hardDriveSpace || "",
              videoCard: data.graphicsCard || "",
              categoryIds: data.categoryIds || [],
              coverImage: null,
              iconImage: null,
              media: Array(6).fill(null),
            });

            if (data.urlCover) setPreviewCoverUrl(Apigame.getUrlCover(data.urlCover));
            if (data.urlIcon) setPreviewUrlIcon(Apigame.getUrlCover(data.urlIcon));
          } catch (error) {
            console.error("Erro ao carregar detalhes do jogo:", error);
            alert("Erro ao carregar dados do jogo.");
          }
        };
        fetchGameDetails();
      } else {
        setGameData(initialGameData);
        setPreviewCoverUrl(DefaultCoverImg);
        setPreviewUrlIcon(DefaultIconImg);
        setMediaPreviews(Array(6).fill(DefaultMediaImg));
        setIndexStep(0);
      }
    }
  }, [isOpen, gameId]);

  useEffect(() => {
    return () => {
      if (
        previewCoverUrl &&
        previewCoverUrl !== DefaultCoverImg &&
        !previewCoverUrl.startsWith("http")
      ) {
        URL.revokeObjectURL(previewCoverUrl);
      }
      if (
        previewUrlIcon &&
        previewUrlIcon !== DefaultIconImg &&
        !previewUrlIcon.startsWith("http")
      ) {
        URL.revokeObjectURL(previewUrlIcon);
      }
    };
  }, [previewCoverUrl, previewUrlIcon]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    try {
      let success;
      if (gameId) {
        success = await Apigame.updateGame(gameId, gameData);
      } else {
        success = await Apigame.registerGame(gameData);
      }

      if (success) {
        alert(
          gameId
            ? "Jogo atualizado com sucesso!"
            : "Jogo cadastrado com sucesso!"
        );
        onClose();
      }
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao salvar o jogo.");
    }
  };

  const onNext = () => {
    if (indexStep !== 3) {
      setIndexStep(indexStep + 1);
    } else {
      handleSubmit();
    }
  };

  const onBack = () => {
    if (indexStep > 0) {
      setIndexStep(indexStep - 1);
    }
  };

  const handleImageCoverClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleImageIconClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  };

  const handleFileCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGameData({ ...gameData, coverImage: file });
      const objectUrl = URL.createObjectURL(file);
      setPreviewCoverUrl(objectUrl);
    }
  };

  const handleFileIconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setGameData({ ...gameData, iconImage: file });
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrlIcon(objectUrl);
    }
  };

  const handleMediaClick = (index) => {
    if (mediaInputRefs.current[index]) {
      mediaInputRefs.current[index].click();
    }
  };

  const handleMediaFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newMediaFiles = [...gameData.media];
      newMediaFiles[index] = file;
      setGameData({ ...gameData, media: newMediaFiles });

      const newPreviews = [...mediaPreviews];
      const objectUrl = URL.createObjectURL(file);
      newPreviews[index] = objectUrl;
      setMediaPreviews(newPreviews);
    }
  };

  return ReactDOM.createPortal(
    <div className="game-form-overlay" onClick={onClose}>
      <div className="game-form-card" onClick={(e) => e.stopPropagation()}>
        <div className="game-form-header">
          <p className="title-dialog">
            {gameId ? "Editar Jogo" : "Adicionar Jogo"}
          </p>
          <button className="close-x" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="line"></div>
        <div className="game-form-content">
          {indexStep === 0 && (
            <div className="step-content-dialog">
              <div className="title-step-content-dialog">Detalhes do Jogo</div>
              <div className="fields-step-content-dialog">
                <div className="dialog-game-content-left">
                  <InputTextFormGame
                    label="Nome (obrigatório)"
                    placeholder="Digite o nome do jogo"
                    name="name"
                    value={gameData.name}
                    onChange={(e) =>
                      setGameData({ ...gameData, name: e.target.value })
                    }
                    width="100%"
                  />
                  <InputTextFormGame
                    label="Descrição (obrigatório)"
                    placeholder="Digite a descrição do jogo"
                    name="description"
                    value={gameData.description}
                    onChange={(e) =>
                      setGameData({ ...gameData, description: e.target.value })
                    }
                    width="100%"
                    isTextArea={true}
                  />
                  <InputTextFormGame
                    label="Preço (obrigatório)"
                    placeholder="Digite o preço do jogo"
                    name="price"
                    value={gameData.price}
                    onChange={(e) =>
                      setGameData({ ...gameData, price: e.target.value })
                    }
                    width="100%"
                    typer="number"
                  />
                </div>

                <div className="fields-step-content-dialog-cover-image">
                  <div className="cover-game-input">
                    <img
                      src={previewCoverUrl}
                      alt="cover"
                      id="cover-game-holder"
                      onClick={handleImageCoverClick}
                      title="Clique para alterar a capa do jogo"
                    />
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleFileCoverChange}
                      style={{ display: "none", overflow: "hidden" }}
                      accept="image/png, image/jpeg, image/gif"
                    />
                  </div>
                  <div className="dialog-game-content-right">
                    <p className="dialog-game-content-right-title">
                      Recomendações
                    </p>
                    <div className="cover-image-instruction-item">
                      <p>
                        <span className="bullet-point">&#8226;</span> Faça sua
                        capa com 1280 por 720 pixels (proporção 16:9).
                      </p>
                      <p>
                        <span className="bullet-point">&#8226;</span> Verifique
                        se a sua capa tem menos de 50 MB.
                      </p>
                      <p>
                        <span className="bullet-point">&#8226;</span> Use um
                        formato de arquivo JPG, PNG ou AI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {indexStep === 1 && (
            <div className="step-content-dialog">
              <div className="title-step-content-dialog">
                Características do Jogo
              </div>
              <div className="fields-step-content-dialog">
                <div className="dialog-game-content-left">
                  <InputTextFormGame
                    label="Características (obrigatório)"
                    placeholder="Digite as características do jogo"
                    name="caracteristics"
                    value={gameData.caracteristics}
                    onChange={(e) =>
                      setGameData({
                        ...gameData,
                        caracteristics: e.target.value,
                      })
                    }
                    width="100%"
                    isTextArea={true}
                  />
                  <InputCategorySelectGame
                    label="Categorias"
                    placeholder="Selecione as categorias"
                    required={true}
                    selectedIds={gameData.categoryIds}
                    onChange={(newIds) =>
                      setGameData({ ...gameData, categoryIds: newIds })
                    }
                  />
                </div>

                <div className="fields-step-content-dialog-cover-image">
                  <div className="cover-game-input">
                    <img
                      src={previewCoverUrl}
                      alt="cover"
                      id="cover-game-holder"
                      onClick={handleImageCoverClick}
                      title="Clique para alterar a capa do jogo"
                    />
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={handleFileCoverChange}
                      style={{ display: "none", overflow: "hidden" }}
                      accept="image/png, image/jpeg, image/gif"
                    />
                  </div>
                  <div className="dialog-game-content-right">
                    <p className="dialog-game-content-right-title">
                      {gameData.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {indexStep === 2 && (
            <div className="step-content-dialog">
              <div className="title-step-content-dialog">Mídias do Jogo</div>
              <div
                className="fields-step-content-dialog"
                style={{ alignItems: "flex-start", paddingTop: "10px" }}
              >
                <div
                  className="dialog-game-content-left"
                  style={{ width: "100%" }}
                >
                  <div className="media-grid-container-game">
                    {mediaPreviews.map((preview, index) => (
                      <div key={index} className="item-media-grid-game">
                        <img
                          src={preview}
                          alt={`media-${index}`}
                          id={`medias-game-holder-${index}`}
                          onClick={() => handleMediaClick(index)}
                          title={`Clique para adicionar a mídia ${index + 1}`}
                          className="img-item-grid-container-game"
                        />

                        <input
                          type="file"
                          ref={(el) => (mediaInputRefs.current[index] = el)}
                          onChange={(e) => handleMediaFileChange(e, index)}
                          style={{ display: "none" }}
                          accept="image/png, image/jpeg, image/gif"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="fields-step-content-dialog-cover-image"
                  style={{ display: "none" }}
                ></div>
              </div>
            </div>
          )}
          {indexStep === 3 && (
            <div className="step-content-dialog">
              <div className="title-step-content-dialog">
                Especificações Mínimas
              </div>
              <div className="fields-step-content-dialog">
                <div className="dialog-game-content-left">
                  <InputTextFormGame
                    label="Sistema Operacional (obrigatório)"
                    placeholder="Adicione o sistema operacional mínimo para rodar seu jogo."
                    name="operatingSystem"
                    value={gameData.operatingSystem}
                    onChange={(e) =>
                      setGameData({
                        ...gameData,
                        operatingSystem: e.target.value,
                      })
                    }
                    width="100%"
                  />
                  <InputTextFormGame
                    label="Processador (obrigatório)"
                    placeholder="Adicione o processador mínimo para rodar seu jogo."
                    name="processor"
                    value={gameData.processor}
                    onChange={(e) =>
                      setGameData({ ...gameData, processor: e.target.value })
                    }
                    width="100%"
                  />
                  <InputTextFormGame
                    label="Memória (obrigatório)"
                    placeholder="Digite a memória mínima para rodar seu jogo."
                    name="memory"
                    value={gameData.memory}
                    onChange={(e) =>
                      setGameData({ ...gameData, memory: e.target.value })
                    }
                    width="100%"
                  />
                  <InputTextFormGame
                    label="Espaço de Disco (obrigatório)"
                    placeholder="Digite o espaço de disco mínimo para rodar seu jogo."
                    name="diskSpace"
                    value={gameData.diskSpace}
                    onChange={(e) =>
                      setGameData({ ...gameData, diskSpace: e.target.value })
                    }
                    width="100%"
                  />
                  <InputTextFormGame
                    label="Placa de Vídeo (obrigatório)"
                    placeholder="Adicione o placa de vídeo mínimo para rodar seu jogo."
                    name="videoCard"
                    value={gameData.videoCard}
                    onChange={(e) =>
                      setGameData({ ...gameData, videoCard: e.target.value })
                    }
                    width="100%"
                  />
                </div>

                <div className="fields-step-content-dialog-cover-image">
                  <div className="icon-game-input">
                    <img
                      src={previewUrlIcon}
                      alt="icon"
                      id="icon-game-holder"
                      onClick={handleImageIconClick}
                      title="Clique para alterar o ícone do jogo"
                    />
                    <input
                      type="file"
                      ref={iconInputRef}
                      onChange={handleFileIconChange}
                      style={{ display: "none", overflow: "hidden" }}
                      accept="image/png, image/jpeg, image/gif"
                    />
                  </div>
                  <div className="dialog-game-content-right">
                    <p className="dialog-game-content-right-title">
                      Recomendações
                    </p>
                    <div className="cover-image-instruction-item">
                      <p>
                        <span className="bullet-point">&#8226;</span> Faça seu
                        ícone na proporção 1:1
                      </p>
                      <p>
                        <span className="bullet-point">&#8226;</span> Seu ícone
                        aparecerá na pagina principal dos seu jogadores,
                        recomendamos escolher com carinho.
                      </p>
                      <p>
                        <span className="bullet-point">&#8226;</span> Use um
                        formato de arquivo JPG, PNG ou AI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="line"></div>
        <div className="game-form-footer">
          <p className="terms-text">
            Ao {gameId ? "editar" : "adicionar"} seu jogo, você concorda com
            nossa politicas e termos de serviço.
          </p>
          <div>
            {indexStep > 0 ? (
              <button className="back-btn game-form-dialog-game" onClick={onBack}>
                Cancelar
              </button>
            ) : null}
            <button className="next-btn game-form-dialog-game" onClick={onNext}>
              {indexStep === 3
                ? gameId
                  ? "Atualizar"
                  : "Finalizar"
                : "Próximo"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GameFormDialog;
