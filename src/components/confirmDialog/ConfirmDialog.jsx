import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import "./ConfirmDialog.css";

function Dialog({
  header,
  isOpen,
  onClose,
  children,
  confirmLabel = "Apagar",
  cancelLabel = "Cancelar",
  icon,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("DialogModalOpen");
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose("dismiss");
        }
      };
      window.addEventListener("keydown", handleEscape);

      return () => {
        document.body.classList.remove("DialogModalOpen");
        window.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleAction = (actionType) => {
    onClose(actionType);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose("dismiss");
    }
  };

  return ReactDOM.createPortal(
    <div className="Dialog DialogModal" onClick={handleBackdropClick}>
      <div className="DialogModalWrap">
        <button
          className="DialogCloseBtn"
          onClick={() => handleAction("dismiss")}
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        <div className="DialogHeader">
          {icon && <span className="DialogIcon">{icon}</span>}
          {header}
        </div>

        <div className="DialogBody">{children}</div>

        <div className="DialogFooter">
          <button
            className="button-dialog btn-secondary"
            onClick={() => handleAction("confirm")}
          >
            {confirmLabel}
          </button>
          <button
            className="button-dialog btn-primary"
            onClick={() => handleAction("dismiss")}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Dialog;