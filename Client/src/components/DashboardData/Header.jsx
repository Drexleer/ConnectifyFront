import { useSelector } from "react-redux";
import style from './CSSDash/Header.module.css'

const Header = () => {
  const users = useSelector((state) => state.usersLogin.user);

  return (
    <div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className={style.titleDashAdmin}>Panel de control del Administrador</h2>
      </div>
    </div>
  );
};
export default Header;
