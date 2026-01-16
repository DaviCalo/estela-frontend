import React, { useRef, useMemo } from "react";
import { ReactComponent as AddMedia } from "../../../assets/icons/add-photo.svg";
import "./GlobalStepGameDialog.css";
import "./ThirdStepGameDialog.css";

const ThirdStepGameDialog = ({
  screenshotsPreviews = [],
  onScreenshotChange,
}) => {
  const mediaInputRefs = useRef([]);

  const visibleItems = useMemo(() => {
    const firstEmptyIndex = screenshotsPreviews.indexOf(null);
    if (firstEmptyIndex === -1) {
      return screenshotsPreviews;
    }
    return screenshotsPreviews.slice(0, firstEmptyIndex + 1);
  }, [screenshotsPreviews]);

  const handleMediaClick = (index) => {
    if (mediaInputRefs.current[index]) {
      mediaInputRefs.current[index].click();
    }
  };

  const handleInternalFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      onScreenshotChange(file, index);
    }
  };

  if (!screenshotsPreviews) return null;

  return (
    <div className="step-content-dialog">
      <div className="title-step-content-dialog">Screenshots do Jogo</div>
      <div className="fields-step-content-dialog">
        <div className="media-grid-container-game">
          {visibleItems.map((preview, index) => (
            <div key={index} className="item-grid-card-game-input-game-dialog">
              {preview !== null ? (
                <img
                  src={preview}
                  alt={`screenshot-${index}`}
                  id={`screenshot-game-holder-${index}`}
                  onClick={() => handleMediaClick(index)}
                  title={`Clique para alterar a mídia ${index + 1}`}
                  className="img-card-game-input-game-dialog"
                />
              ) : (
                <div
                  className="placeholder-item-grid-card-game-input-game-dialog"
                  onClick={() => handleMediaClick(index)}
                  title={`Clique para adicionar a mídia ${index + 1}`}
                >
                  <AddMedia className="icon-placeholder-item-grid-card-game-input-game-dialog" />
                  <div>Clique para adicionar um screenshot do jogo</div>
                </div>
              )}

              <input
                type="file"
                ref={(el) => (mediaInputRefs.current[index] = el)}
                onChange={(e) => handleInternalFileChange(e, index)}
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdStepGameDialog;
