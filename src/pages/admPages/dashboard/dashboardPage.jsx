import React from "react";
import './dashboardPage.css';
import SidebarAdm from '../../../components/sidebar/sidebarAdm.jsx';

const DashboardPage = () => {
    return (
        <div className="home-container">
            <div id="full">
                <SidebarAdm />
                <div id="content">
                   
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;