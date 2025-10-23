import './App.css';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/login/LoginPage.jsx';
import PerfilPage from './pages/perfil/perfil.jsx'
import './global.css';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App" id="app">
      <main>
        <PerfilPage />
      </main>
    </div>
  );
}
// <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//className="App-link"
//href="https://reactjs.org"
//target="_blank"
//rel="noopener noreferrer"
//        >
//Learn React
//        </a>
//      </header>
export default App;
