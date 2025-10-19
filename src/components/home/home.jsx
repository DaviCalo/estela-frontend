import React from "react";
import './home.css';
import logo from '../../../src/images/logo.png';
import Sidebar from '../sidebar/sidebar.jsx';

const Home = () => {
    return (
        <div className="home-container">
            <div id="full">
                <Sidebar />
                <div id="content">
                    <img src={logo} alt="Logo"/>
                </div>
            </div>
        </div>
    );
};

export default Home;