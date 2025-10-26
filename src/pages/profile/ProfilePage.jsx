import { React, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import imgProfile from "../../assets/images/imgperfil.png";
import user from "../../api/user";
import localStorageManager from "../../utils/localStorageManager";
import "./profile.css";

const ProfilePage = () => {
  const [userId, setUserId] = useState(localStorageManager.getLoggedInUserFromLocalStorage().userid || "");
  const [profileData, setProfileData] = useState(user.getProfilePhoto(userId));

  useEffect(() => {
    if (!userId) {
      navigator("/login");
      return;
    }
    user
      .getUserById(userId)
      .then((data) => {
        console.log("Dados do perfil:", data);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do perfil:", err);
      });
  }, [userId]);

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
