import React, { useRef } from "react";
import InputTextFormGame from "../inputTextFormGame/InputTextFormGame.jsx";
import InputCategorySelectGame from "../../inputCategoryGame/InputCategorySelectGame.jsx";
import { ReactComponent as AddIcon } from "../../../assets/icons/add-icon.svg";
import "./GlobalStepGameDialog.css";

const SecondStepGameDialog = ({
  characteristicsGame,
  onChangeCharacteristics,
  categoryIdsGame,
  onChangeCategoryIds,
  previewIconUrl,
  onIconChange,
}) => {
  const iconInputRef = useRef(null);

  const handleKeyDownCharacteristics = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const { selectionStart, selectionEnd, value } = e.target;

      const newValue =
        value.substring(0, selectionStart) +
        "\n- " +
        value.substring(selectionEnd);

      onChangeCharacteristics({ target: { value: newValue } });
      setTimeout(() => {
        if (e.target) {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 3;
        }
      }, 0);
    }
  };

  const handleChangeWithBullet = (e) => {
    let val = e.target.value;

    if (val.length > 0 && !val.startsWith("- ")) {
      val = "- " + val;
    }
    onChangeCharacteristics({ target: { value: val } });
  };

  const handleImageIconClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click();
    }
  };

  const handleFileChangeInternal = (event) => {
    if (event) {
      onIconChange(event.target.files[0]);
    }
  };

  return (
    <div className="step-content-dialog">
      <div className="title-step-content-dialog">Características do Jogo</div>
      <div className="fields-step-content-dialog">
        <div className="left-fields-step-content-dialog">
          <InputTextFormGame
            label="Características (obrigatório)"
            placeholder="Digite as características do jogo"
            name="characteristics"
            value={characteristicsGame}
            onChange={handleChangeWithBullet}
            onKeyDown={handleKeyDownCharacteristics}
            width="98%"
            height="60%"
            isTextArea={true}
          />
          <InputCategorySelectGame
            label="Categorias"
            placeholder="Selecione as categorias"
            required={true}
            selectedIds={categoryIdsGame}
            onChange={(newIds) => onChangeCategoryIds(newIds)}
          />
        </div>

        <div className="right-fields-step-content-dialog">
          <div className="media-card-game-input-game-dialog-2">
            {previewIconUrl !== null ? (
              <img
                src={previewIconUrl}
                alt="icon"
                className="img-card-game-input-game-dialog-2"
                onClick={handleImageIconClick}
                title="Clique para alterar o ícone do jogo"
              />
            ) : (
              <div
                className="placeholder-card-game-input-game-dialog-2"
                onClick={handleImageIconClick}
              >
                <AddIcon className="icon-placeholder-card-game-input-game-dialog-2" />
                <div>Clique para adicionar o ícone do jogo</div>
              </div>
            )}
            <input
              type="file"
              ref={iconInputRef}
              onChange={handleFileChangeInternal}
              style={{ display: "none", overflow: "hidden" }}
              accept="image/png, image/jpeg, image/ai"
            />
          </div>

          <div className="instruction-item-dialog-game">
            <p className="instruction-item-dialog-game-title">Recomendações</p>
            <div className="instruction-item-dialog-game-content">
              <p>
                <span className="bullet-point">&#8226;</span> Faça seu ícone na
                proporção 1:1
              </p>
              <p>
                <span className="bullet-point">&#8226;</span> Seu ícone
                aparecerá na pagina principal dos seu jogadores.
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

export default SecondStepGameDialog;
