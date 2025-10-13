
import React, { useState } from 'react';
import './login.css';
import logo from '../../images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados submetidos:', { email, password });
  };

  return (
    <div className="login-container">
        <section id="logo">
            <img src={logo} alt="Logo"/>
        </section>
        <section id="card">
            <div id="buttons-choice">
                <button id="login-button" class="button-stitch button-stitch-selected">Login</button>
                <button id="register-button" class="button-stitch button-stitch-unselected">Criar conta</button>
            </div>
            <form class="form-group">
                <label for="email" class="form-label">Email:</label>
                <div class="input-wrapper">
                    <span class="input-icon">@</span>
                    <input
                        type="email"
                        id="email"
                        class="form-input"
                        placeholder="Seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                  />
                </div>
                <label for="email" class="form-label">Senha:</label>
                <div class="input-wrapper">
                    <span class="input-icon">@</span>
                    <input
                      type="password"
                      id="password"
                      class="form-input"
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                </div>
                <div class="remember-login">
                    <input type="checkbox" name="remember-login" id="remember-login-checkbox"/>
                    <label for="remember-login-checkbox" class="text-small-regular">Lembrar</label>
                </div>
                <a href="https://secure.nuuvem.com/br-en/account/forgot-password">Esqueci minnha senha</a>
                <button type="submit" class="button-stitch" onClick={handleSubmit}>Entrar</button>
            </form>
            <search id="terms">
                <a href="https://www.nuuvem.com/br-en/privacy">Termos de Uso</a>
                <a href="https://www.nuuvem.com/br-en/privacy">Política de Privacidade</a>
            </search>
        </section>
    </div>
  );
};

export default Login;