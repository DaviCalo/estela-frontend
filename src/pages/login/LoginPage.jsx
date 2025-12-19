import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ApiAuth from "../../api/ApiAuth.js";
import Logo from "../../assets/images/logo.png";
import { ReactComponent as LockIcon } from "../../assets/icons/lock-keyhole.svg";
import { ReactComponent as EmailIcon } from "../../assets/icons/at.svg";
import { ReactComponent as JoystickIcon } from "../../assets/icons/joystick.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as EyesIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as EyesSlashIcon } from "../../assets/icons/eye-slash.svg";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [isLogin, setLogin] = useState(true);
  const [isVisiblePassowordLogin, setisVisiblePasswordLogin] = useState(false);
  const [isVisiblePassowordRegister, setisVisiblePassowordRegister] =
    useState(false);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("Dados submetidos:", { email, password });
    const response = await ApiAuth.login(email, password);
    if (response) {
      navigate("/home");
    } else {
      alert("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const isSuccess = await ApiAuth.register(
      emailRegister,
      passwordRegister,
      name,
      nickname
    );
    if (isSuccess) {
      navigate("/home");
    }
  };

  const inputTypePasswordLogin = isVisiblePassowordLogin ? "text" : "password";
  const inputTypePasswordRegister = isVisiblePassowordRegister
    ? "text"
    : "password";

  const toggleVisibilityLoginPassword = () => {
    setisVisiblePasswordLogin((prev) => !prev);
  };

  const toggleVisibilityRegisterPassword = () => {
    setisVisiblePassowordRegister((prev) => !prev);
  };

  const chargeButton = (isLoginMode) => {
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-button");

    if (isLoginMode) {
      loginButton.classList.remove("button-stitch-unselected");
      loginButton.classList.add("button-stitch-selected");
      registerButton.classList.remove("button-stitch-selected");
      registerButton.classList.add("button-stitch-unselected");
    } else {
      loginButton.classList.remove("button-stitch-selected");
      loginButton.classList.add("button-stitch-unselected");
      registerButton.classList.remove("button-stitch-unselected");
      registerButton.classList.add("button-stitch-selected");
    }
  };

  const switchToLogin = () => {
    setLogin(true);
    chargeButton(true);
  };

  const switchToRegister = () => {
    setLogin(false);
    chargeButton(false);
  };

  useEffect(() => {
    chargeButton(isLogin);
  }, [isLogin]);

  return (
    <div className="login-container">
      <section id="logo">
        <img src={Logo} alt="Logo" />
      </section>
      <section id="card">
        <div id="buttons-choice">
          <button
            id="login-button"
            className="button-stitch button-stitch-selected"
            onClick={switchToLogin}
          >
            Login
          </button>
          <button
            id="register-button"
            className="button-stitch button-stitch-unselected"
            onClick={switchToRegister}
          >
            Criar conta
          </button>
        </div>
        {isLogin ? (
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="input">
              <label htmlFor="password" className="form-label">
                Senha:
              </label>
              <div className="input-wrapper input-container-passoword">
                <LockIcon className="input-icon" aria-hidden="true" />
                <input
                  type={inputTypePasswordLogin}
                  id="password"
                  className="form-input"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                  minLength="8"
                />
                <button
                  onClick={toggleVisibilityLoginPassword}
                  type="button"
                  className="toggle-password"
                >
                  {isVisiblePassowordLogin ? <EyesIcon /> : <EyesSlashIcon />}
                </button>
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
              <Link to="/recuperar-senha">Esqueci minha senha</Link>
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
                <Link to="/termos">Termos de Uso</Link>
                <Link to="/privacidade">Política de Privacidade</Link>
              </section>
            </div>
          </form>
        ) : (
          <form id="singup-form" className="form-group">
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
              <label htmlFor="password-register" className="form-label">
                Senha:
              </label>
              <div className="input-wrapper input-container-passoword">
                <LockIcon className="input-icon" aria-hidden="true" />
                <input
                  type={inputTypePasswordRegister}
                  id="password-register"
                  className="form-input"
                  placeholder="Sua senha"
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                />
                <button
                  onClick={toggleVisibilityRegisterPassword}
                  type="button"
                  className="toggle-password"
                >
                  {isVisiblePassowordRegister ? (
                    <EyesIcon className="input-icon" />
                  ) : (
                    <EyesSlashIcon className="input-icon" />
                  )}
                </button>
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
              <Link to="/termos">Termos de Uso</Link> e a{" "}
              <Link to="/privacidade">Política de Privacidade</Link>.
            </span>
          </form>
        )}
      </section>
    </div>
  );
};

export default LoginPage;