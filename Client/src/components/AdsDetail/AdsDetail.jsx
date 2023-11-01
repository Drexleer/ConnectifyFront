import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Badge,
  Box,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import MercadoPago from '../Payments/MercadoPago';
import './DetailAd.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchDetail } from '../../redux/Slices/detailSlice';
import Navbar from '../Navbar/Navbar';
import { locationUser } from '../../redux/Slices/persistSlice';
<<<<<<< HEAD
// import { Link } from 'react-router-dom';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
=======
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
>>>>>>> 8ceec2519fa62db2971e7768c7c02dc5b3d94b1d

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth0 } from '@auth0/auth0-react';


import { addFavorite, removeFavorite } from '../../redux/Slices/favoritesSlice';


const DetailAd = () => {
  const {user} = useAuth0();
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const location = useLocation()
 
  const favorites = useSelector((state) => state.favorites.favoriteProfessionals);
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);

  const isSaved = favorites.some((prof) => prof._id === id);
    

  useEffect(() => {
    if (user) {
      console.log("USER >>> ", user);
    }
    console.log("DETAIL >>>", detail);
  }, [user, detail]);


  useEffect(() => {
    dispatch(fetchDetail(id)).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(locationUser(location.pathname));
  }, [location]);


  useEffect(()=>{
    setUserData(user);
  },[user])

  // Guardar los datos del profesional en el Local Storage
  const handleSaveOrRemoveProfile = () => {
    const localStorageKey = `favoritos-${id}`;
    if (isSaved) {
      localStorage.removeItem(localStorageKey);
      dispatch(removeFavorite(detail.detail));
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(detail.detail));
      dispatch(addFavorite(detail.detail));

    }
  };



  return (
    <div>
      <Navbar />
      <div className="principal">
        {loading ? (
          <div
            style={{ backgroundColor: 'white', width: '100%', height: '100vh' }}
          >
            Cargando...
          </div>
        ) : // Verifica si detail.detail.creator existe y tiene una longitud mayor que 0
        detail.detail.creator && detail.detail.creator.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item xs={8} align="left">
              <Grid item xs={8} align="left">
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Button
                    sx={{
                      backgroundColor: isSaved ? '#D9D9D9': '#3B7BA4',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    variant="contained"
                    onClick={handleSaveOrRemoveProfile}
                  >
                    {isSaved ? <StarBorderIcon /> : <StarIcon />}
                  </Button>

                  {/* <Badge
                    badgeContent={
                      savedProfileKeys.filter((key) =>
                        key.startsWith('favoritos-')
                      ).length
                    }
                    color="secondary"
                  >
                    <Link
                      to="/client/favorites"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant="outlined" // Esto establece el botón con borde
                        sx={{ margin: '0px' }}
                      >
                        Ver mis Favoritos{' '}
                        <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                      </Button>
                    </Link>
                  </Badge> */}

 
                {/* <FavoritesNotification/> */}
                
                <Link to={userData && userData.nickname && `/payments/${userData.nickname}`}>
                      <Button variant="outlined" sx={{ marginLeft: '15px' }}> Pagos </Button>
                </Link>
                
                </Box>
              </Grid>

              <Grid item xs={12} md={10} sx={{ margin: '16px' }}>
                <Typography
                  fontWeight="900"
                  variant="h3"
                  sx={{ margin: '10px' }}
                >
                  {detail.detail.profession}
                </Typography>
                <Typography
                  fontWeight="900"
                  variant="h5"
                  sx={{ margin: '10px' }}
                >
                  Ubicación: {detail.detail.location}
                </Typography>

                <Typography
                  fontWeight="900"
                  variant="h4"
                  sx={{ margin: '10px' }}
                >
                  Descripción:
                </Typography>
                <Typography
                  fontWeight="700"
                  variant="body1"
                  sx={{ margin: '10px' }}
                >
                  {detail.detail.description}
                </Typography>
                <Card
                  sx={{
                    width: '100%',
                    backgroundColor: '#D9D9D9',
                    padding: '10px',
                    margin: '0px',
                  }}
                  align="left"
                >
                  <CardContent>
                    <div className="profile-container">
                      <div className="profile-circle">
                        <img
                          src="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg?w=740&t=st=1698081873~exp=1698082473~hmac=aba3c7f8d2e33cab05a648b7e5cb8a3a44a0f1242b4bb85fb6022a36e463fc15"
                          alt="Imagen de perfil"
                        />
                      </div>
                      <div className="profile-text">
                        <Typography variant="h6">⭐5.0</Typography>
                        <Typography
                          fontWeight="900"
                          variant="h5"
                          component="div"
                        >
                          Maria Emilia Fuentes
                        </Typography>
                        <Typography variant="body2">
                          Muy amigable, amable y predispuesto a despejar dudas
                          07/08/23
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={8}></Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={detail.detail.creator[0].image}
                  title="tec"
                />
                <CardContent>
                  <Typography fontWeight="900" variant="h5" component="div">
                    {detail.detail.creator[0].name}{' '}
                    {detail.detail.creator[0].lastName}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <div>
                        <List>
                          <ListItem>
                            <Typography align="left">Tarifa: </Typography>
                            {detail.detail.price}$
                          </ListItem>
                          <ListItem>
                            <Typography>Modalidad: </Typography>
                            {detail.detail.workLocation}
                          </ListItem>
                        </List>
                      </div>
                    </Grid>
                  </Grid>

                  <MercadoPago/>

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <div>No hay creadores disponibles.</div>
        )}
      </div>
    </div>
  );
};

export default DetailAd;
