import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import imgProfile from "../../assets/images/imgperfil.png";

const ProfilePage = () => {
  return (
    <div className="profilecontainer">
      <div id="full">
        <Sidebar />
        <div id="content">
          <div id="namecard">
            <div
              id="img-holder"
              style={{ backgroundImage: `url(${imgProfile})` }}
            >
              {" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
