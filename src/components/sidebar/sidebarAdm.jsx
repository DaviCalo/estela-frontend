import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { ReactComponent as ReportIcon } from "../../assets/icons/report.svg";
import { ReactComponent as GameIcon } from "../../assets/icons/game.svg";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/contact-book.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import SidebarButton from "./SidebarButton";
import "./sidebar.css";

const menuItems = [
    { label: "RELATÓRIOS", id: "reports", Icon: ReportIcon, route: "/adm/reports" },
    { label: "JOGOS", id: "games", Icon: GameIcon, route: "/adm/games" },
    { label: "VENDAS", id: "sales", Icon: CartIcon, route: "/adm/sales" },
    { label: "MEU PERFIL", id: "profile", Icon: UserIcon, route: "/adm/profile" },
    { label: "LOJA", id: "store", Icon: HomeIcon, route: "/adm/store" },
];

const SidebarAdm = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState('reports');

    const handleItemClick = (id, route) => {
        setActiveItem(id);
        navigate(route);
    };
    
    return (
        <div id="sidebar">
            <img src={logo} alt="Logo" id="Logo" />
            <div id="sidebar-button-wrapper">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <SidebarButton
                            label={item.label}
                            Icon={item.Icon}
                            isActive={activeItem === item.id}
                            onClick={() => handleItemClick(item.id, item.route)}
                        />
                        {index < menuItems.length - 1 && <div className="line"></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default SidebarAdm;