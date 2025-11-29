import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./reportsPage.css";
import Sidebar from "../../components/sidebar/sidebar.jsx";

const ReportsPage = () => {
  return (
    <div className="home-container">
      <div id="full">
        <Sidebar activeItem="reports" />
        <div id="content"></div>
      </div>
    </div>
  );
};

export default ReportsPage;
