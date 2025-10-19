import React from "react";
import './home.css';
import logo from '../../../src/images/logo.png';
import Sidebar from '../sidebar/sidebar.jsx';
import Cardhome from '../card/cardhome.jsx';

const Home = () => {
    return (
        <div className="home-container">
            <div id="full">
                <Sidebar />
                <div id="content">
                    <div id="banner-image"></div>
                    <div id="cards-wrapper">
                        <h1>Lançamentos</h1>
                        <p>Veja as novidades mais populares desse mês!</p>
                        <div id="cards-container">
                            <Cardhome />
                            <Cardhome />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;