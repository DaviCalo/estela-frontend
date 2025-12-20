import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil.svg";
import { ReactComponent as IconTrash } from "../../assets/icons/trash.svg";
import { ReactComponent as IconLogout } from "../../assets/icons/arrow-out-right-square-half.svg";
import InfoBlock from "../../components/inforblock/InfoBlock.jsx";
import InfoBlockPassoword from "../../components/inforblock/InfoBlockPassoword.jsx";
import Sidebar from "../../components/sidebar/SidebarComponent.jsx";
import Dialog from "../../components/dialog/Dialog.jsx";
import LocalStorageManager from "../../utils/LocalStorageManager.js";
import ApiUser from "../../api/ApiUser.js";
import DefaultProfile from "../../assets/images/default.png";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [userId] = useState(
    LocalStorageManager.getLoggedInUserFromLocalStorage().userid || ""
  );
  const [profileData, setProfileData] = useState(ApiUser.getProfilePhoto(userId));
  const [userName, setUserName] = useState(null);
  const [userNick, setUserNick] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const fileInputRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigator = useNavigate();

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogAction = (actionType) => {
    if (actionType === "confirm") {
      deleteAccountUser();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    await ApiUser
      .updateProfilePhoto(userId, file)
      .then(() => {
        setProfileData(ApiUser.getProfilePhoto(userId));
      })
      .catch((err) => {
        alert("Falha ao atualizar a foto.");
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      });
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNickNameChange = (e) => {
    setUserNick(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePassordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const updateInformationUser = async (event) => {
    event.preventDefault();
    ApiUser
      .updateUser(userId, userEmail, userPassword, userName, userNick)
      .then((e) => {
        setInfomationUser();
      })
      .catch((err) => {
        console.error("Erro ao atualizar dados do perfil:", err);
      });
  };

  const logoutUser = async (event) => {
    event.preventDefault();
    ApiUser
      .logoutUser()
      .then((e) => {
        LocalStorageManager.clearUserDataFromLocalStorage();
        navigator("/login");
      })
      .catch((err) => {
        console.error("Erro ao atualizar dados do perfil:", err);
      });
  };

  const deleteAccountUser = async () => {
    ApiUser
      .deleteAccount(userId)
      .then((e) => {
        LocalStorageManager.clearUserDataFromLocalStorage();
        navigator("/login");
      })
      .catch((err) => {
        console.error("Erro ao atualizar dados do perfil:", err);
      });
  };

  const setInfomationUser = useCallback(async () => {
    if (!userId) return;
    await ApiUser
      .getUserById(userId)
      .then((data) => {
        setUserName(data.name);
        setUserNick(data.nickname);
        setUserEmail(data.email);
        setUserPassword(data.password);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados do perfil:", err);
      });
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigator("/login");
      return;
    } else {
      setInfomationUser();
    }
  }, [userId, navigator, setInfomationUser]);

  return (
    <div className="profilecontainer">
      <div id="full">
        <Sidebar activeItem="profile" />
        <div id="content">
          <div id="namecard">
            <div id="img-input">
              <img
                src={profileData || DefaultProfile}
                alt="Profile"
                id="img-holder"
                onClick={handleImageClick}
                title="Clique para alterar a imagem"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/png, image/jpeg, image/gif"
              />
            </div>
            <div id="information-names">
              <p id="user-nickname">{userNick}</p>
              <p id="user-name">{userName}</p>
            </div>
          </div>
          <div className="div-info-blocks-user">
            <div className="top-info-blocks-user">
              <p>Informações pessoais</p>
              <button onClick={updateInformationUser} className="button">
                <PencilIcon />
                Salvar edição
              </button>
            </div>
            <div className="line"></div>
            <div className="info-blocks-user">
              <InfoBlock
                label="Nome Completo:"
                name="name"
                value={userName}
                onChange={handleNameChange}
                type="text"
              />
              <InfoBlock
                label="Nickname:"
                name="nickname"
                value={userNick}
                onChange={handleNickNameChange}
                type="text"
              />
              <InfoBlock
                label="Email:"
                name="email"
                value={userEmail}
                onChange={handleEmailChange}
                type="email"
              />
              <InfoBlockPassoword
                label="Senha:"
                name="senha"
                value={userPassword}
                onChange={handlePassordChange}
              />
            </div>
            <div className="line" style={{ margin: "25px 0px" }}></div>
            <div className="actions-users">
              <button onClick={logoutUser} className="button">
                <IconLogout />
                Logout
              </button>
              <button onClick={openDialogOpen} className="button">
                <IconTrash />
                Deletar conta
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        header="Deletar sua conta permanentemente"
        isOpen={isDialogOpen}
        onClose={handleDialogAction}
        confirmLabel="Excluir"
      >
        <p>Tem certeza de que deseja excluir sua conta?</p>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
