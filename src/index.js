import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './components/notificationProvider/NotificationProvider.jsx';
import AxiosInterceptor from './components/axiosInterceptor/AxiosInterceptor.jsx';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
