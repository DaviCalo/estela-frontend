import React from "react";
import './home.css';
import logo from '../../assets/images/logo.png';
import Sidebar from '../../components/sidebar/sidebar.jsx';
import Cardhome from '../../components/card/cardhome.jsx';
import banner from '../../assets/images/bannerhk.png';

const HomePage = () => {
    return (
        <div className="home-container">
            <div id="full">
                <Sidebar />
                <div id="content">
                    <div id="banner-image" style={{ backgroundImage: `url(${banner})` }}>
                    </div>
                    <div id="content-wrapper">
                        <h1>Lançamentos</h1>
                        <p>Veja as novidades populares desse mês</p>
                        <div id="card-wrapper">
                            <Cardhome />
                            <Cardhome />
                            <Cardhome />
                            <Cardhome />
                            <Cardhome />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;