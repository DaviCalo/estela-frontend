import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Apigame from "../../api/ApiGame.js";
import { useNotification } from "../notificationProvider/NotificationProvider.jsx";
import FirstStepGameDialog from "./stepsGameDialog/FirstStepGameDialog.jsx";
import SecondStepGameDialog from "./stepsGameDialog/SecondStepGameDialog.jsx";
import ThirdStepGameDialog from "./stepsGameDialog/ThirdStepGameDialog.jsx";
import FourthStepGameDialog from "./stepsGameDialog/FourthStepGameDialog.jsx";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import "./GameFormDialog.css";

const initialGameData = {
  name: "",
  price: "",
  description: "",
  characteristics: "",
  coverImage: null,
  iconImage: null,
  screenshots: Array(6).fill(null),
  categoryIds: [],
  operatingSystem: "",
  processor: "",
  memory: "",
  diskSpace: "",
  videoCard: "",
};

const GameFormDialog = ({ isOpen, onClose, gameId }) => {
  const { showNotification } = useNotification();
  const [indexStep, setIndexStep] = useState(0);
  const [previewCoverUrl, setPreviewCoverUrl] = useState(null);
  const [previewUrlIcon, setPreviewUrlIcon] = useState(null);
  const [screenshotsPreviews, setScreenshotsPreviews] = useState(
    Array(6).fill(null)
  );

  const [gameData, setGameData] = useState(initialGameData);

  const onCloseDialog = () => {
    setPreviewCoverUrl(null);
    setPreviewUrlIcon(null);
    setScreenshotsPreviews(Array(6).fill(null));
    setGameData(initialGameData);
    setIndexStep(0);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (gameId) {
        const fetchGameDetails = async () => {
          try {
            const response = await Apigame.getGameDetailsById(gameId);
            const data = response;
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
              coverImage: null,
              iconImage: null,
              screenshots: Array(6).fill(null),
            });

            if (data.urlCover) {
              setGameData((prev) => ({
                ...prev,
                coverImage: Apigame.getMediaUrl(data.urlCover),
              }));
              setPreviewCoverUrl(Apigame.getMediaUrl(data.urlCover));
            }

            if (data.urlIcon) {
              setGameData((prev) => ({
                ...prev,
                iconImage: Apigame.getMediaUrl(data.urlIcon),
              }));
              setPreviewUrlIcon(Apigame.getMediaUrl(data.urlIcon));
            }

            if (data.urlsScreenshots && data.urlsScreenshots.length > 0) {
              for (let i = 0; i < data.urlsScreenshots.length; i++) {
                setGameData((prev) => ({
                  ...prev,
                  screenshots: data.urlsScreenshots.map((url) =>
                    Apigame.getMediaUrl(url)
                  ),
                }));
                setScreenshotsPreviews((prev) => {
                  const newPreviews = [...prev];
                  newPreviews[i] = Apigame.getMediaUrl(data.urlsScreenshots[i]);
                  return newPreviews;
                });
              }
            }
          } catch (error) {
            console.error("Erro ao carregar detalhes do jogo:", error);
          }
        };
        fetchGameDetails();
      }
    }
  }, [isOpen, gameId]);

  useEffect(() => {
    return () => {
      if (previewCoverUrl && !previewCoverUrl.startsWith("http")) {
        URL.revokeObjectURL(previewCoverUrl);
      }
    };
  }, [previewCoverUrl]);

  useEffect(() => {
    return () => {
      if (previewUrlIcon && !previewUrlIcon.startsWith("http")) {
        URL.revokeObjectURL(previewUrlIcon);
      }
    };
  }, [previewUrlIcon]);

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
        showNotification(
          `Jogo ${gameId ? "atualizado" : "cadastrado"} com sucesso!`,
          "success"
        );
        onCloseDialog();
      }
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao salvar o jogo.");
    }
  };

  const validateStep = () => {
    let isValid = true;

    switch (indexStep) {
      case 0:
        if (!gameData.name.trim()) {
          showNotification("O campo 'Nome' é obrigatório.", "error");
          isValid = false;
        } else if (!gameData.description.trim()) {
          showNotification("O campo 'Descrição' é obrigatório.", "error");
          isValid = false;
        } else if (!gameData.price.toString().trim() || gameData.price < 0) {
          showNotification(
            "O campo 'Preço' é obrigatório ou está com valor negativo.",
            "error"
          );
          isValid = false;
        } else if (!gameData.coverImage) {
          showNotification("A imagem de capa é obrigatória.", "error");
          isValid = false;
        }
        break;
      case 1:
        if (!gameData.characteristics.trim()) {
          showNotification("O campo 'Características' é obrigatório.", "error");
          isValid = false;
        } else if (gameData.categoryIds.length === 0) {
          showNotification("Selecione pelo menos uma categoria.", "error");
          isValid = false;
        } else if (!gameData.iconImage) {
          showNotification("A imagem do ícone é obrigatória.", "error");
          isValid = false;
        }
        break;
      case 2:
        if (gameData.screenshots.every((screenshots) => screenshots === null)) {
          showNotification("Adicione pelo menos uma mídia do jogo.", "error");
          isValid = false;
        }

        break;
      case 3:
        if (!gameData.operatingSystem.trim()) {
          showNotification(
            "O campo 'Sistema Operacional' é obrigatório.",
            "error"
          );
          isValid = false;
        } else if (!gameData.processor.trim()) {
          showNotification("O campo 'Processador' é obrigatório.", "error");
          isValid = false;
        } else if (!gameData.memory.trim()) {
          showNotification("O campo 'Memória' é obrigatório.", "error");
          isValid = false;
        } else if (!gameData.diskSpace.trim()) {
          showNotification("O campo 'Espaço de Disco' é obrigatório.", "error");
          isValid = false;
        } else if (!gameData.videoCard.trim()) {
          showNotification("O campo 'Placa de Vídeo' é obrigatório.", "error");
          isValid = false;
        }
        break;
      default:
        isValid = true;
    }
    return isValid;
  };

  const onNext = () => {
    if (indexStep !== 3) {
      if (validateStep()) {
        setIndexStep(indexStep + 1);
      }
    } else {
      if (validateStep()) {
        handleSubmit();
      }
    }
  };

  const onBack = () => {
    if (indexStep > 0) {
      setIndexStep(indexStep - 1);
    }
  };

  const handleFileCoverChange = (file) => {
    if (file) {
      setGameData({ ...gameData, coverImage: file });
      const objectUrl = URL.createObjectURL(file);
      setPreviewCoverUrl(objectUrl);
    }
  };

  const handleFileIconChange = (file) => {
    if (file) {
      setGameData({ ...gameData, iconImage: file });
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrlIcon(objectUrl);
    }
  };

  const handleFileScreenshotsChange = (file, index) => {
    if (file) {
      const newMediaFiles = [...gameData.screenshots];
      newMediaFiles[index] = file;
      setGameData({ ...gameData, screenshots: newMediaFiles });

      const newPreviews = [...screenshotsPreviews];
      const objectUrl = URL.createObjectURL(file);
      newPreviews[index] = objectUrl;
      setScreenshotsPreviews(newPreviews);
    }
  };

  const formatCurrencyInput = (value) => {
    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits === "") {
      return "";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(parseFloat(onlyDigits) / 100);
  };

  return ReactDOM.createPortal(
    <div className="game-form-overlay" onClick={onCloseDialog}>
      <div className="game-form-card" onClick={(e) => e.stopPropagation()}>
        <div className="game-form-header">
          <p className="title-dialog">
            {gameId ? "Editar Jogo" : "Adicionar Jogo"}
          </p>
          <button className="bnt-close-game-dialog" onClick={onCloseDialog}>
            <CloseIcon />
          </button>
        </div>
        <div className="line"></div>
        <div className="game-form-content">
          {indexStep === 0 && (
            <FirstStepGameDialog
              nameGame={gameData.name}
              onChangeName={(e) =>
                setGameData({ ...gameData, name: e.target.value })
              }
              descriptionGame={gameData.description}
              onChangeDescription={(e) =>
                setGameData({ ...gameData, description: e.target.value })
              }
              priceGame={formatCurrencyInput(gameData.price.toString())}
              onChangePrice={(e) => {
                const formattedValue = formatCurrencyInput(e.target.value);
                setGameData({ ...gameData, price: formattedValue });
              }}
              previewCoverUrl={previewCoverUrl}
              onCoverChange={handleFileCoverChange}
            />
          )}

          {indexStep === 1 && (
            <SecondStepGameDialog
              characteristicsGame={gameData.characteristics}
              onChangeCharacteristics={(e) =>
                setGameData({ ...gameData, characteristics: e.target.value })
              }
              categoryIdsGame={gameData.categoryIds}
              onChangeCategoryIds={(newIds) =>
                setGameData({ ...gameData, categoryIds: newIds })
              }
              previewIconUrl={previewUrlIcon}
              onIconChange={handleFileIconChange}
            />
          )}

          {indexStep === 2 && (
            <ThirdStepGameDialog
              screenshotsPreviews={screenshotsPreviews}
              onScreenshotChange={handleFileScreenshotsChange}
            />
          )}

          {indexStep === 3 && (
            <FourthStepGameDialog
              operatingSystemGame={gameData.operatingSystem}
              onChangeOperatingSystem={(value) =>
                setGameData({ ...gameData, operatingSystem: value })
              }
              processorGame={gameData.processor}
              onChangeProcessor={(value) =>
                setGameData({ ...gameData, processor: value })
              }
              memoryGame={gameData.memory}
              onChangeMemory={(value) =>
                setGameData({ ...gameData, memory: value })
              }
              diskSpaceGame={gameData.diskSpace}
              onChangeDiskSpace={(value) =>
                setGameData({ ...gameData, diskSpace: value })
              }
              videoCardGame={gameData.videoCard}
              onChangeVideoCard={(value) =>
                setGameData({ ...gameData, videoCard: value })
              }
            />
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
              <button
                className="button-game-form-dialog-game-2"
                onClick={onBack}
              >
                Voltar
              </button>
            ) : null}
            <button className="button-game-form-dialog-game" onClick={onNext}>
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
