import React, { useRef } from "react";
import InputTextFormGame from "../inputTextFormGame/InputTextFormGame.jsx";
import { ReactComponent as AddMedia } from "../../../assets/icons/add-photo.svg";
import "./GlobalStepGameDialog.css";

const FirstStepGameDialog = ({
  nameGame,
  onChangeName,
  descriptionGame,
  onChangeDescription,
  priceGame,
  onChangePrice,
  previewCoverUrl,
  onCoverChange,
}) => {
  const coverInputRef = useRef(null);


  const handleImageCoverClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleFileChangeInternal = (event) => {
    const file = event.target.files[0];
    if (file) {
      onCoverChange(file);
    }
  };

  return (
    <div className="step-content-dialog">
      <div className="title-step-content-dialog">Detalhes do Jogo</div>
      <div className="fields-step-content-dialog">
        <div className="left-fields-step-content-dialog">
          <InputTextFormGame
            label="Nome (obrigatório)"
            placeholder="Digite o nome do jogo"
            name="name"
            value={nameGame}
            onChange={(e) => onChangeName(e)}
            width="98%"
            height="20%"
          />
          <InputTextFormGame
            label="Descrição (obrigatório)"
            placeholder="Digite a descrição do jogo"
            name="description"
            value={descriptionGame}
            onChange={(e) => onChangeDescription(e)}
            width="98%"
            height="60%"
            isTextArea={true}
          />
          <InputTextFormGame
            label="Preço (obrigatório)"
            placeholder="Digite o preço do jogo (R$ 0,00)"
            name="price"
            value={priceGame}
            onChange={(e) => onChangePrice(e)}
            width="98%"
            height="20%"
            typer="text"
          />
        </div>

        <div className="right-fields-step-content-dialog">
          <div className="media-card-game-input-game-dialog">
            {previewCoverUrl !== null ? (
              <img
                src={previewCoverUrl}
                alt="cover"
                className="img-card-game-input-game-dialog"
                onClick={handleImageCoverClick}
                title="Clique para alterar a capa do jogo"
              />
            ) : (
              <div
                className="placeholder-card-game-input-game-dialog"
                onClick={handleImageCoverClick}
              >
                <AddMedia className="icon-placeholder-card-game-input-game-dialog" />
                <div>Clique para adicionar a capa do jogo</div>
              </div>
            )}
            <input
              type="file"
              ref={coverInputRef}
              onChange={handleFileChangeInternal}
              style={{ display: "none", overflow: "hidden" }}
              accept="image/png, image/jpeg, image/ai"
            />
          </div>

          <div className="instruction-item-dialog-game">
            <p className="instruction-item-dialog-game-title">Recomendações</p>
            <div className="instruction-item-dialog-game-content">
              <p>
                <span className="bullet-point">&#8226;</span> Faça sua capa com
                1280 por 720 pixels (proporção 16:9) preferencialmente.
              </p>
              <p>
                <span className="bullet-point">&#8226;</span> Verifique se a sua
                capa tem menos de 50 MB.
              </p>
              <p>
                <span className="bullet-point">&#8226;</span> Use um formato de
                arquivo JPG, PNG ou AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstStepGameDialog;
