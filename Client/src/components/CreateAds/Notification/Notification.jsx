/* eslint-disable react/prop-types */
import {
  NotificationCard,
  NotificationPara,
  ButtonContainer,
  DetailBtn,
  Imagen,
  HomeBtn,
  DivContainer,
} from './StyledNotification';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoTituloC.png';

export default function Notification({ anuncio, setShowNotification }) {
  const handleClose = (e) => {
    e.preventDefault();
    setShowNotification(false);
  };

  return (
    <DivContainer>
      <NotificationCard>
        <Imagen src={logo} alt="logo" />
        <NotificationPara>
          Tu anuncio ha sido creado con éxito! Nos complace informarte que hemos
          recibido y registrado tu anuncio de manera satisfactoria. Gracias por
          confiar en nuestros servicios.
        </NotificationPara>
        <ButtonContainer>
          <DetailBtn>
            <Link
              to={`/detail/${anuncio}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Ir al Anuncio
            </Link>
          </DetailBtn>
          <HomeBtn onClick={handleClose}>Cerrar Notificación</HomeBtn>
        </ButtonContainer>
      </NotificationCard>
    </DivContainer>
  );
}
