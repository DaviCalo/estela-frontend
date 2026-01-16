import React from "react";
import InputTextFormGame from "../inputTextFormGame/InputTextFormGame.jsx";
import "./GlobalStepGameDialog.css";

const FourthStepGameDialog = ({
  operatingSystemGame,
  onChangeOperatingSystem,
  processorGame,
  onChangeProcessor,
  memoryGame,
  onChangeMemory,
  diskSpaceGame,
  onChangeDiskSpace,
  videoCardGame,
  onChangeVideoCard,
}) => {
  return (
    <div className="step-content-dialog">
      <div className="title-step-content-dialog">Especificações Mínimas</div>
      <div className="fields-step-content-dialog">
        <div className="left-fields-step-content-dialog">
          <InputTextFormGame
            label="Sistema Operacional (obrigatório)"
            placeholder="Adicione o sistema operacional mínimo para rodar seu jogo."
            name="operatingSystem"
            value={operatingSystemGame}
            onChange={(e) => onChangeOperatingSystem(e.target.value)}
            width="98%"
          />
          <InputTextFormGame
            label="Processador (obrigatório)"
            placeholder="Adicione o processador mínimo para rodar seu jogo."
            name="processor"
            value={processorGame}
            onChange={(e) => onChangeProcessor(e.target.value)}
            width="98%"
          />
          <InputTextFormGame
            label="Memória (obrigatório)"
            placeholder="Digite a memória mínima para rodar seu jogo."
            name="memory"
            value={memoryGame}
            onChange={(e) => onChangeMemory(e.target.value)}
            width="98%"
          />
        </div>

        <div className="right-fields-step-content-dialog">
          <InputTextFormGame
            label="Espaço de Disco (obrigatório)"
            placeholder="Digite o espaço de disco mínimo para rodar seu jogo."
            name="diskSpace"
            value={diskSpaceGame}
            onChange={(e) =>
              onChangeDiskSpace(e.target.value)
            }
            width="98%"
          />
          <InputTextFormGame
            label="Placa de Vídeo (obrigatório)"
            placeholder="Adicione o placa de vídeo mínimo para rodar seu jogo."
            name="videoCard"
            value={videoCardGame}
            onChange={(e) =>
              onChangeVideoCard(e.target.value)
            }
            width="98%"
          />
        </div>
      </div>
    </div>
  );
};

export default FourthStepGameDialog;
