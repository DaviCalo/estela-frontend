import React, { createContext, useState, useContext, useCallback } from "react";
import { ReactComponent as AlertIcon } from "../../assets/icons/info-circle.svg";
import { ReactComponent as CheckIcon } from "../../assets/icons/check-circle.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import "./NotificationProvider.css";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  /**
   * @param {string} message
   * @param {'success' | 'error'} type
   */
  const showNotification = useCallback((message, type = "success") => {
    const allowedTypes = ["success", "error"];

    if (!allowedTypes.includes(type)) {
      console.warn(
        `Tipo de notificação "${type}" inválido. Usando "success" como fallback.`
      );
      type = "error";
    }

    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}
      {notification && (
        <div className="notification-container">
          <div className={`notification-banner ${notification.type}`}>
            <div className="notification-content">
              {notification.type === "error" ? (
                <AlertIcon className="notification-icon" />
              ) : (
                <CheckIcon className="notification-icon" />
              )}

              <span className="notification-message">
                {notification.message}
              </span>
            </div>

            <button
              onClick={closeNotification}
              className="notification-close-btn"
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
