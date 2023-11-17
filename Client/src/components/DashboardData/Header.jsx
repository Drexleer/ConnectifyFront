import { useSelector } from "react-redux";

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
        <h1>Panel de Control</h1>
        <h2>Bienvenido, {users.userName}</h2>
      </div>
    </div>
  );
};
export default Header;
