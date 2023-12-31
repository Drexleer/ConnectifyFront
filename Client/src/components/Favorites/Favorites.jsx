/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
    IconButton,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetAllFavorites,
  fetchRemoveFavorites,
} from "../../redux/Slices/favoritesSlice";
import Cover from '../Cover/Cover';
import style from './Favorites.module.css';
import ButtonBack from '../Utils/ButtonBack/ButtonBack';
import { AiFillDelete } from "react-icons/ai";
import Loading from "../Utils/Loading/Loading";

const Favorites = () => {
  const usersLocal = useSelector((state) => state.usersLogin.user);
  const usersGoogle = useSelector((state) => state.googleLogin.user);
  const [idUser, setIdUser] = useState()
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state) => state.favorites.favoriteProfessionals
  );
  const ads = useSelector((state) => state.ads.ads);
  const navigate = useNavigate();

  useEffect(() => {
    const idGoogle = usersGoogle && usersGoogle._id;
    const idLocal = usersLocal && usersLocal._id;
    if (idGoogle) {
      setIdUser(idGoogle);
    }
    if (idLocal) {
      setIdUser(idLocal);
    }
  }, []);

  // Loading
  useEffect(() => {
    dispatch(fetchGetAllFavorites(idUser)).then(() => {
      setLoading(false)
    });
  }, [dispatch, idUser]);

  const handleRemoveFavorite = (e) => {
    const formFav = {
      clientId: e.currentTarget.value,
      professionalId: e.currentTarget.id,
    };

      dispatch(fetchRemoveFavorites(formFav))

  };

  const handleAdsDetails = (id) => {
    ads.forEach((ad) => {
      if (ad.creator[0]._id === id) {
        navigate(`/detail/${ad._id}`);
      }
    });
  };

  return (
    <div >
      
      <Navbar />
      <Cover />
      <ButtonBack />
      <h4 className={style.titulo}>
          Perfiles Guardados
        </h4>
      <div >
      {loading ? (
            <Loading />
          ) : favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div key={fav.professional._id}>
              {fav.professional && (
                
                    <div >
                      
                        <div className={style.contALL}>

                            <div className={style.contImg}>
                                <img className={style.profilePic}
                                    src={fav.professional.image}
                                    alt={`Imagen de ${fav.professional.name}`}
                                />
                            </div>
                            
                            <div className={style.contDetails}>
                                <h4 className={style.h4}>
                                    {fav.professional.name} {fav.professional.lastName}
                                </h4>
            
                                <p className={style.description}>
                                    {fav.professional.description}...
                                </p>
                            </div>
                            
                            <div className={style.contButtons}>

                              <div className={style.contButtonDEL}>
                                  <button className={style.deleteButton}
                                    onClick={handleRemoveFavorite}
                                    id={fav.professional._id}
                                    value={fav.client}
                                  >
                                      <AiFillDelete className={style.deleteSvgIcon} />
                                  </button>
                              </div>

                              <div className={style.contButtonDetail}>
                                  <button
                                      className={style.buttonContratar}
                                      onClick={() =>
                                        handleAdsDetails(fav.professional._id)
                                      }
                                  >
                                      Ver Detalle
                                  </button>
                              </div>
                            </div>
                            
                        </div>
                                               
                    </div>
                 
              )}
            </div>
            
          ))
        ) : (
          <p>No tienes perfiles guardados.</p>
        )}
        
      </div>
    </div>
  );
};

export default Favorites;
