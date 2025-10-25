import React, { useState } from "react";
import "./login.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import auth from "../../api/auth";
import { ReactComponent as LockIcon } from "../../assets/icons/lock-keyhole.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/at.svg";
import { ReactComponent as JoystickIcon } from "../../assets/icons/joystick.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("Dados submetidos:", { email, password });
    const isSuccess = await auth.login(email, password);
    console.log(isSuccess);
    if (isSuccess) {
      console.log(auth.login(email, password));
      navigate("/profile");
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const isSuccess = await auth.register(emailRegister, passwordRegister, name, nickname);
    if (isSuccess) {
      navigate("/profile");
    }
  };

  const changeToSingIn = () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("singup-form");
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");

    if (loginForm.classList.contains("display-hidden")) {
      loginForm.classList.remove("display-hidden");
      registerForm.classList.add("display-hidden");
      loginButton.classList.remove("button-stitch-unselected");
      loginButton.classList.add("button-stitch-selected");
      registerButton.classList.remove("button-stitch-selected");
      registerButton.classList.add("button-stitch-unselected");
    }
  };

  const changeToSingUp = () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("singup-form");
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");

    if (registerForm.classList.contains("display-hidden")) {
      loginForm.classList.add("display-hidden");
      registerForm.classList.remove("display-hidden");
      loginButton.classList.remove("button-stitch-selected");
      loginButton.classList.add("button-stitch-unselected");
      registerButton.classList.remove("button-stitch-unselected");
      registerButton.classList.add("button-stitch-selected");
    }
  };

  return (
    <div className="login-container">
      <section id="logo">
        <img src={logo} alt="Logo" />
      </section>
      <section id="card">
        <div id="buttons-choice">
          <button
            id="login-button"
            className="button-stitch button-stitch-selected"
            onClick={changeToSingIn}
          >
            Login
          </button>
          <button
            id="register-button"
            className="button-stitch button-stitch-unselected"
            onClick={changeToSingUp}
          >
            Criar conta
          </button>
        </div>
        <form id="login-form" className="form-group">
          <div className="input">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <div className="input-wrapper">
              <EmailIcon className="icon input-icon" aria-hidden="true" />
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="password" className="form-label">
              Senha:
            </label>
            <div className="input-wrapper">
              <LockIcon className="input-icon" aria-hidden="true" />
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="remember-forgot-password">
            <div className="remember-password">
              <input
                type="checkbox"
                name="remember-login"
                id="remember-login"
              />
              <label htmlFor="remember-login" className="text-small-regular">
                Lembrar
              </label>
            </div>
            <a href="https://secure.nuuvem.com/br-en/account/forgot-password">
              Esqueci minha senha
            </a>
          </div>
          <div className="confirm-button">
            <button
              type="submit"
              className="button"
              onClick={handleSubmitLogin}
            >
              Entrar
            </button>
          </div>
          <div className="divider" id="terms-divider">
            <section id="terms">
              <a href="https://www.nuuvem.com/br-en/privacy">Termos de Uso</a>
              <a href="https://www.nuuvem.com/br-en/privacy">
                Política de Privacidade
              </a>
            </section>
          </div>
        </form>
        <form id="singup-form" className="form-group display-hidden">
          <div className="input">
            <label htmlFor="name" className="form-label">
              Nome:
            </label>
            <div className="input-wrapper">
              <UserIcon className="icon input-icon" aria-hidden="true" />
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="email-register" className="form-label">
              Email:
            </label>
            <div className="input-wrapper">
              <EmailIcon className="input-icon" aria-hidden="true" />
              <input
                type="email"
                id="email-register"
                className="form-input"
                placeholder="Seu email"
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="nick-name-register" className="form-label">
              Nickname:
            </label>
            <div className="input-wrapper">
              <JoystickIcon className="input-icon" aria-hidden="true" />
              <input
                type="text"
                id="nick-name-register"
                className="form-input"
                placeholder="Seu nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="input">
            <label htmlFor="password-register" className="form-label">
              Senha:
            </label>
            <div className="input-wrapper">
              <LockIcon className="input-icon" aria-hidden="true" />
              <input
                type="password"
                id="password-register"
                className="form-input"
                placeholder="Sua senha"
                value={passwordRegister}
                onChange={(e) => setPasswordRegister(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="tips-register">
            <p>Siga essas dicas</p>
            <ul>
              <li>Use ao menos 8 caracteres.</li>
              <li>
                Tente uma combinação com letras maiúsculas e minúsculas e um
                números
              </li>
            </ul>
          </div>
          <div className="confirm-button register-button">
            <button
              type="submit"
              className="button"
              onClick={handleSubmitRegister}
            >
              Entrar
            </button>
          </div>
          <span className="text-small-regular">
            Ao criar uma conta, você concorda com os{" "}
            <a href="https://www.nuuvem.com/br-en/privacy">Termos de Uso</a> e a{" "}
            <a href="https://www.nuuvem.com/br-en/privacy">
              Política de Privacidade
            </a>
            .
          </span>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
