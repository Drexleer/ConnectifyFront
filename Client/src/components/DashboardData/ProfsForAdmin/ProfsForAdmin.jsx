/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import style from "./ProfsForAdmin.module.css";

import {
  fetchProfsForAdmin,
  deleteProfByIdAdmin,
} from "../../../redux/Slices/professionalSlice";
import {
  fetchClientsForAdmin,
  deleteClientByIdAdmin,
} from "../../../redux/Slices/clientSlice";
import {
  fetchAdsForAdmin,
  deleteAdByIdAdmin,
} from "../../../redux/Slices/adsSlice";
import SupportPopUp from "../SupportPopUp/SupportPopUp";

const ProfsForAdmin = () => {
  const dispatch = useDispatch();
  const professionals = useSelector(
    (state) => state.professionals.professionals
  );
  const clients = useSelector((state) => state.clients.clients);
  const ads = useSelector((state) => state.ads.ads);

  const [currentPage, setCurrentPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [dataPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  const indexOfLastAd = currentPage * dataPerPage;
  const indexOfFirstAd = indexOfLastAd - dataPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchClientsForAdmin());
        await dispatch(fetchProfsForAdmin());
        await dispatch(fetchAdsForAdmin());
      } catch (error) {
        console.error("falló el fetcheo", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, prof) => {
    showLoading();
    let newState = [];
    if (!prof.profession) {
      try {
        const banned = await dispatch(deleteClientByIdAdmin(prof._id));
        const update = await dispatch(fetchClientsForAdmin());
        setSelectedData(update);
      } catch (error) {}
    } else if (prof.creator) {
      try {
        const banned = await dispatch(deleteAdByIdAdmin(prof._id));
        const update = await dispatch(fetchAdsForAdmin());
        
        setSelectedData(update);
      } catch (error) {}
    } else if (prof.locationJob) {
      try {
        const banned = await dispatch(deleteProfByIdAdmin(prof._id));
        const update = await dispatch(fetchProfsForAdmin());
       
        newState = selectedData.map((sel) =>
          sel._id === banned.data._id ? banned.data : sel
        );
        setSelectedData(newState);
      } catch (error) {}
    }
  };

  const handleUserType = (e) => {
    setCurrentPage(1);
    if (e === "professionals") setSelectedData(professionals);
    setShowButton(false);
    if (e === "clients") setSelectedData(clients);
    setShowButton(false);
    if (e === "ads") setSelectedData(ads);
    setShowButton(false);
  };
  const [selectedData, setSelectedData] = useState(professionals);

  const uniqueProfessions = new Set();
  professionals.forEach((item) => {
    item.profession.forEach((profession) => {
      uniqueProfessions.add(profession);
    });
  });
  const profession = Array.from(uniqueProfessions);

  const handleSelentProfession = (e) => {
    if (e.target.value === "Todas las Profesiones") {
      setSelectedData(professionals);
      setShowButton(false);
    } else {
      setCurrentPage(1);
      const profClass = e.target.value;
      const toScrub = professionals.filter(
        (prof) => prof.profession == profClass
      );

      setSelectedData(toScrub);
      setShowButton(true);
    }
  };
  const currentData = selectedData
    ? selectedData.slice(indexOfFirstAd, indexOfLastAd)
    : [];

  const handleBanProf = async () => {
    showLongLoading();
    try {
      const update = [];
      await Promise.all(
        selectedData.map(async (prof) => {
          if (prof.isDeleted) update.push(prof);
          if (!prof.isDeleted) {
            const banned = await dispatch(deleteProfByIdAdmin(prof._id));
            await dispatch(fetchProfsForAdmin());


            update.push(banned.data);
          }
        })
      );
      setSelectedData(update);
    } catch (error) {
      console.error(error)
    }
  };
  const handleUnbanProf = async () => {
    showLongLoading();
    try {
      const update = [];
      await Promise.all(
        selectedData.map(async (prof) => {
          if (!prof.isDeleted) update.push(prof);
          if (prof.isDeleted) {
            const banned = await dispatch(deleteProfByIdAdmin(prof._id));
            await dispatch(fetchProfsForAdmin());
            console.log("ID del profecional a bannear", banned);

            update.push(banned.data);
          }
        })
      );
      setSelectedData(update);
    } catch (error) {
      console.error(error)
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handlePopUp = (prof) => {
    setSelectedProfessional(prof);
    console.log(prof);
    !isModalVisible ? setIsModalVisible(true) : setIsModalVisible(false);
    
  };

  const handleClosePopUp = () => {
    setSelectedProfessional(null);
    setIsModalVisible(false);
  };

  function showLoading() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 950);
  }
  function showLongLoading() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 1250);
  }

  return (
    <div className={style.containerAllPanelUser}>
      <div className={style.containerPanelUserAdmin}>
        <div className={style.containerAllPanelSelectAdmin}>
          <div className={style.containerPanelSelectAdmin}>
            <select
              name="user"
              id="user type"
              onChange={(e) => handleUserType(e.target.value)}
              className={style.selectPanelAdmin}
            >
              <option value="professionals" className={style.optionPanelAdmin}>
                Profesionales
              </option>
              <option value="clients" className={style.optionPanelAdmin}>
                Clientes
              </option>
              <option value="ads" className={style.optionPanelAdmin}>
                Anuncios
              </option>
            </select>
            {selectedData !== clients && selectedData !== ads && (
              <select
                name="profession"
                id="profession"
                onChange={(e) => handleSelentProfession(e)}
                className={style.selectPanelAdmin}
              >
                <option
                  key="0"
                  value="Todas las Profesiones"
                  className={style.optionPanelAdmin}
                >
                  Todas las Profesiones
                </option>
                {profession.map((prof, index) => (
                  <option
                    key={index}
                    value={prof}
                    className={style.optionPanelAdmin}
                  >
                    {prof}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            {showButton && (
              <div className={style.containerBtnsPanelAdminProf}>
                <button
                  onClick={(e) => handleBanProf(e)}
                  className={style.btnPanelAdminProfLayOff}
                >
                  Suspender Profesión
                </button>
                <button
                  onClick={(e) => handleUnbanProf(e)}
                  className={style.btnPanelAdminProfEnable}
                >
                  Habilitar Profesión
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={style.containerPanelUser}>
          {selectedData.length > 0 ? (
            currentData?.map((prof, index) => (
              <tr
                key={prof.id}
                className={
                  prof.isDeleted
                    ? style.containerUserPanelAdminLayOff
                    : style.containerUserPanelAdmin
                }
              >
                <div className={style.containerUser}>
                  <div className={style.containerimageNameUserLocation}>
                    <td>
                      {prof.creator ? (
                        <img
                          src={prof.creator[0].image}
                          alt=""
                          className={style.imagePanelUserAdmin}
                        />
                      ) : (
                        <img
                          src={
                            prof.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMq4cGfAmaJAYVpXFPLY57EzVip1FTMK-ETQH1aU24VD-bYx5wJ4srHFP99zAgqXBvfQ&usqp=CAU"
                          }
                          alt="Default Image"
                          className={style.imagePanelUserAdmin}
                        />
                      )}
                    </td>
                    <td className={style.nameUserPanelAdmin}>
                      <span className={style.nameUserPanelAdminSpan}>
                        Nombre de Usuario:
                      </span>
                      <span>{prof.userName || prof.creator[0].userName}</span>
                    </td>
                    <td className={style.nameUserPanelAdmin}>
                      <span className={style.nameUserPanelAdminSpan}>
                        Localidad:
                      </span>
                      <span>
                        {prof.locationJob ||
                          prof.province ||
                          prof.postingDate?.substring(0, 10)}
                      </span>
                    </td>
                  </div>

                  <div className={style.containerEmailProfUserPanel}>
                    <td className={style.nameUserPanelAdmin}>
                      <span className={style.nameUserPanelAdminSpan}>
                        Email:
                      </span>
                      <span>{prof.email || prof.creator[0].email}</span>
                    </td>

                    <td className={style.nameUserPanelAdmin}>
                      {prof.profession && (
                        <span className={style.nameUserPanelAdminSpan}>
                          Profesion:
                        </span>
                      )}
                      <span>
                        {prof.profession ? prof.profession : "Cliente"}
                      </span>
                    </td>
                  </div>
                </div>
                <div>
                  <td className={style.containerBtnActionsPanelUser}>
                    <button
                      onClick={(e) => handleDelete(e, prof)}
                      className={
                        prof.isDeleted
                          ? style.btnActionEnableUser
                          : style.btnActionLayOffUser
                      }
                    >
                      {prof.isDeleted ? "Habilitar" : "Suspender"}
                    </button>
                    <button
                      onClick={() => handlePopUp(prof)}
                      className={style.btnSupportPanelUser}
                    >
                      Soporte
                    </button>
                    {isModalVisible && selectedProfessional === prof && (
                      <div className={style.vemos}>
                        <SupportPopUp
                          isVisible={isModalVisible}
                          professional={selectedProfessional}
                          onClose={handleClosePopUp}
                        />
                      </div>
                    )}
                  </td>
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No se encontraron profecionales</td>
            </tr>
          )}
        </div>
      </div>
      <div>
        {selectedData.length !== 0 ? (
          <Pagination
            currentPage={currentPage}
            adsPerPage={dataPerPage}
            totalAds={selectedData.length}
            onPageChange={paginate}
            currentAds={currentData}
          />
        ) : null}
      </div>
      <div
        className={style.loadingMessage}
        style={{ display: loading ? "flex" : "none" }}
      >
        <div className={style.spinner}>
          <span className={style.ball1}></span>
          <span className={style.ball2}></span>
          <span className={style.ball3}></span>
          <span className={style.ball4}></span>
          <span className={style.ball5}></span>
          <span className={style.ball6}></span>
          <span className={style.ball7}></span>
          <span className={style.ball8}></span>
        </div>
      </div>
    </div>
  );
};

export default ProfsForAdmin;
