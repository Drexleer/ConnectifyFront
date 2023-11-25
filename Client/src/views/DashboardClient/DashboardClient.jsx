/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import UserInfoCard from "./UserInfoCardClient";
import { updateClientOnServer } from "../../redux/Slices/clientSlice";
import Navbar from "../../components/Navbar/Navbar";
import ReviewItem from "../../components/ReusableComponents/ReviewShow";
import { getComments } from "./CommentsOrganized";
import { Link } from "react-router-dom";
import RenderReservs from "./RenderReservs";
import { Button, Card } from "@mui/material";
import { setUserType } from "../../redux/Slices/userTypeSlice";
import { fetchClientsForAdmin } from "../../redux/Slices/clientSlice";
import Cover from '../../components/Cover/Cover'

const DashboardClient = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchClientsForAdmin());
  }, [dispatch]);

  const userLocal = useSelector((state) => state.usersLogin.user); 
  const googleUser = useSelector((state) => state.googleLogin.user); 

  const usersLog =
    googleUser && Object.keys(googleUser).length !== 0 ? googleUser : userLocal;

 
  const users = useSelector(
    (state) =>
      state.clients.clients.filter((client) => client._id === usersLog._id)[0]
  );
  const userId = userLocal._id || googleUser._id || "";
  const userName = userLocal.name || googleUser.name || "";
  const userUserName = userLocal.userName || googleUser.userName || "";
  const userLastName = userLocal.lastName || googleUser.lastName || "";
  const userLocation = userLocal.location || googleUser.location || "";
  const userEmail = userLocal.email || googleUser.email || "";
  const userImage = userLocal.image || googleUser.image || "";
  const userProvince = userLocal.province || googleUser.province || "";

  const [user, setUser] = useState({
    id: userId,
    name: userName,
    LastName: userLastName,
    userName: userUserName,
    email: userEmail,
    province: userProvince,
    location: userLocation,
    image: userImage,
  });

  const [comments, setComments] = useState([]);
  const userComments = comments.filter(
    (comment) => comment.client_id === user.id
  );

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    const updatedUser = {
      _id: user.id,
      name: user.name,
      lastName: user.LastName,
      userName: user.userName,
      location: user.location,
      province: user.province,
    }; 
    try {
      // Envía la solicitud PATCH al servidor para actualizar el cliente
      const response = await dispatch(updateClientOnServer(updatedUser));
      if (response) {
        setEditMode(false);
        alert("Su cambio se ha guardado con éxito");
        dispatch(fetchClientsForAdmin());
      } else {
      
        console.error("Error al actualizar el cliente:", response);
      }
    } catch (error) {
      
      console.error("Error al actualizar el cliente:", error);
    }
  };

  useEffect(() => {
    
    // Llamada a la función getComments para obtener los comentarios
    const fetchComments = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (error) {
        console.error("Error al obtener comentarios:", error);
      }
    };

    fetchComments(); 
  }, [userLocal._id, googleUser._id]); 

  const confirmAction = (actionType) => {
    const confirmationMessage = `¿Está seguro de que desea hacer un pedido para ${actionType}?`;

    if (window.confirm(confirmationMessage)) {
      if (actionType === "cambio de contraseña") {
        const userType = "professional";
        dispatch(setUserType(userType));
        window.location.href = "/password";
      } else {
        alert(`Va a ser redirigido para realizar su pedido de ${actionType}.`); 
      }
    }
  };

  return (
    <div>
      <Cover />
      <Navbar />{" "}
      <div style={{ margin: "0em 2em" }}>
        {" "}
        <Grid container spacing={3}>
          {" "}
          <Grid item xs={12} md={8}>
            {" "}
            <UserInfoCard
              user={user}
              userImage={userImage}
              editMode={editMode}
              handleEdit={handleEdit}
              handleSave={handleSave}
              setUser={setUser}
            />{" "}
            <Card style={{ margin: "1em", borderRadius: "16px" }}>
              {" "}
              <div style={{ margin: "1.5em " }}>
                <h3>Mis reservas realizadas</h3>
                <RenderReservs userName={user.userName} />
                <div style={{ margin: " 1.5em" }}></div>{" "}
                <Link to={`/payments/${user.userName}`}>
                  {" "}
                  <Button variant="outlined">Ver pagos realizados</Button>{" "}
                </Link>{" "}
              </div>{" "}
            </Card>{" "}
            <Card
              style={{
                margin: "1em",
                borderRadius: "16px",
                backgroundColor: "#868484",
              }}
            >
              {" "}
              <div style={{ margin: "1.5em " }}>
                <h3> Administración de cuenta </h3>{" "}
                <div style={{ margin: " 1em 0em" }}>
                  {" "}
                  {!googleUser._id && (
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginRight: "2em", marginBottom: '1em'}}
                        onClick={() => confirmAction("cambio de contraseña")}
                      >
                        Pedido de cambio de contraseña{" "}
                      </Button>
                  )}
                  <Link to="/contact">
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginRight: "2em" }}
                    >
                      Pedido de eliminación de cuenta{" "}
                    </Button>{" "}
                  </Link>
                </div>{" "}
              </div>{" "}
            </Card>{" "}
          </Grid>{" "}
          <Grid item xs={12} md={4}>
            {" "}
            <h3>
              Reseñas realizadas a profesionales luego de los servicios
              prestados:{" "}
            </h3>{" "}
            {userComments.length > 0 ? (
              userComments.map(
                (
                  comment,
                  index 
                ) => (
                  <ReviewItem
                    key={index}
                    review={{
                      rating: comment.rating,
                      text: comment.comment,
                      clientProfileImage: comment.professionalPhoto,
                      clientName: comment.professionalName,
                      date: comment.date,
                      professionalName: comment.professionalName,
                      professionalProfileImage: comment.professionalPhoto,
                    }}
                  /> // </Link>
                )
              )
            ) : (
              <p>No tienes reseñas aún</p>
            )}{" "}
          </Grid>{" "}
        </Grid>{" "}
      </div>{" "}
    </div>
  );
};

export default DashboardClient;
