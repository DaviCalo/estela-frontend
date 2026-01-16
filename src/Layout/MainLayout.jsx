import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/SidebarComponent.jsx";
import MainHeader from "../components/mainHeader/MainHeader";
import "./MainLayout.css";

const MainLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e) => {
    const isScrolled = e.target.scrollTop > 50;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div
          className="scroll-container"
          id="scrollContainer"
          onScroll={handleScroll}
        >
          <MainHeader isScrolled={scrolled} />
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
