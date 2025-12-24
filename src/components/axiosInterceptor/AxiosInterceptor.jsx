import { useEffect, useState } from "react"; // Adicione useState
import { useNavigate } from "react-router-dom";
import { useNotification } from "../notificationProvider/NotificationProvider.jsx";
import ApiClient from "../../api/base/ApiClient.js";

const AxiosInterceptor = ({ children }) => {
  const [isSet, setIsSet] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = ApiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = error.response?.data?.message || error.message || "Erro inesperado.";
        
        if (error.response && error.response.status === 401) {
           navigate("/login"); 
           showNotification("Sessão expirada.", "error");
        } else {
           showNotification(message, "error");
        }
        return Promise.reject(error);
      }
    );

    setIsSet(true); 

    return () => {
      ApiClient.interceptors.response.eject(interceptor);
    };
  }, [showNotification, navigate]);

  return isSet ? children : null; 
};

export default AxiosInterceptor;