import Sidebar from "../../components/sidebar/sidebar";
import imgperfil from "../../assets/images/imgperfil.png"

const PerfilPage = () => {

    return (
        <div className="perfilcontainer">
            <div id="full">
                <Sidebar />
                <div id="content">
                    <div id="namecard">
                        <div id="img-holder" style={{ backgroundImage: `url(${imgperfil})`}}> </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilPage; 