import React from 'react';
import style from './About.module.css';
import logo from '../../assets/logoTituloC001.png'; 
import Navbar from '../Navbar/Navbar';
import Cover from '../Cover/Cover';
import { useNavigate } from "react-router-dom";

const AboutUs = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
      };

    return (
    <div className={style.contGral}>
        <Navbar/>
        <Cover/>
        <div className={style.contAll}>
            <div className={style.contButtonBack}>
                <button onClick={handleGoBack}>
                    Volver
                </button>
            </div>  
                {/* <h1 className={style.tituloAbout}>Sobre Nosotros</h1> */}
                <div className={style.contLogo}>
                    <img src={logo} alt="Logo" />
                </div>




            <div className={style.contContenido}>
                <p>
                    Bienvenido a Connectify, tu plataforma de conexión confiable entre profesionales y clientes.
                </p>
                <p>
                    En Connectify, nos enorgullece ofrecer una solución completa para aquellos que buscan contratar servicios profesionales o mostrar sus habilidades al mundo. Somos un equipo de programadores full stack comprometidos a proporcionar una experiencia segura y eficiente para todas las transacciones.
                </p>
                <p>
                    Nuestra plataforma abarca una amplia variedad de rubros, desde desarrollo web hasta servicios de diseño, cuidado personal, educación y más. Independientemente de tus necesidades, Connectify está aquí para ayudarte a encontrar el profesional perfecto para el trabajo.
                </p>
                <p>
                    La confianza es fundamental en nuestra comunidad, por lo que cada profesional en Connectify tiene una reputación construida a partir de experiencias reales de clientes anteriores. Puedes explorar perfiles, leer reseñas y tomar decisiones informadas sobre quién contratar.
                </p>
                <p>
                    Ya sea que busques un servicio presencial o remoto, Connectify simplifica el proceso de contratación y proporciona una pasarela de pagos segura para garantizar transacciones sin problemas.
                </p>
                <p>
                    ¡Conecta con confianza en Connectify y descubre la mejor manera de contratar y trabajar con profesionales talentosos!
                </p>
            </div>
        </div>
      
      
    </div>
  );
};

export default AboutUs;
