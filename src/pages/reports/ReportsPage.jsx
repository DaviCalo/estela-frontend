import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportsPage.css";
import SidebarComponent from "../../components/sidebar/SidebarComponent.jsx";

const ReportsPage = () => {
  return (
    <div className="home-container">
      <div id="full">
        <SidebarComponent activeItem="reports" />
        <div id="content"></div>
      </div>
    </div>
  );
};

export default ReportsPage;
