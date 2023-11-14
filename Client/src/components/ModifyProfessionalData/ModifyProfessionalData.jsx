import miApi from "../../../localidades.json";
import React, { useState, useEffect } from "react";
import style from "./ModifyProfessionalData.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchModifyDataProf } from "../../redux/Slices/modifyProfSlice";
import validationModify from "./validationModify";
import { AiFillCloseCircle } from "react-icons/ai";

const ModifyProfessionalData = ({ setPopUpModify }) => {
  const profById = useSelector((state) => state.modifyProf.detailProf);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: profById.name,
    lastName: profById.lastName,
    userName: profById.userName,
    email: profById.email,
    image: profById.image,
    profession: profById.profession,
    location: profById.location,
    province: profById.province,
    description: profById.description,
  });

  const [error, setError] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    image: "",
    profession: "",
    location: "",
    province: "",
    description: "",
  });

  const [popUpDataProf, setPopUpDataProf] = useState(false);

  const handlerChange = (e) => {
    const propiedad = e.target.id;
    const valor = e.target.value;

    setForm({ ...form, [propiedad]: valor });
    setError(validationModify({ ...form, [propiedad]: valor }));
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const errorValue = Object.values(error);
    const existError = errorValue.some((errorMessage) => errorMessage !== "");

    if (existError) {
      setPopUpDataProf(true);
    } else {
      await dispatch(fetchModifyDataProf(form, profById._id));
      setPopUpModify(false);
    }
  };

  const handlerClosePopUpDataProf = () => {
    setPopUpDataProf(false);
  };

  // function getProvinces(data) {
  //   const provinces = data.localidades.map((provincia) => {
  //     return provincia.provincia.nombre;
  //   });
  //   return [...new Set(provinces)];
  // }

  // const provincesList = getProvinces(miApi, form.province);

  // function getLocation(data) {
  //   const cities = data.localidades.filter((ciudad) => {
  //     return ciudad.ciudad.nombre === form.province;
  //   });
  //   return [...new Set(cities)];
  // }

  // const locationList = getProvinces(miApi, form.province);

  function getProvinces(data) {
    const provinces = data.localidades.map((provincia) => {
      return provincia.provincia.nombre;
    });
    return [...new Set(provinces)];
  }

  const provincesList = getProvinces(miApi);

  const selectedProvParticular = form.province;
  //console.log('Provincia seleccionada:', selectedProvParticular);

  function selectCitiesByProvince(data, selectedProvince) {
    const cities = data.localidades.filter((ciudad) => {
      return ciudad.provincia.nombre === selectedProvince;
    });
    const sortedCities = [...new Set(cities)].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
    return sortedCities;
  }

  const citiesInSelectedProvince = selectCitiesByProvince(
    miApi,
    selectedProvParticular
  );

  console.log(provincesList);
  // console.log(locationList);
  console.log(citiesInSelectedProvince);

  return (
    <div className={style.containerPopUp}>
      <div className={style.popUp}>
        <h1>Modificacion de datos</h1>
        <img src={form.image} alt="" />
        <form action="" onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={form.name}
            disabled
            onChange={handlerChange}
            id="name"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={form.lastName}
            disabled
            onChange={handlerChange}
            id="lastName"
          />
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={form.userName}
            disabled
            onChange={handlerChange}
            id="userName"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handlerChange}
            id="email"
          />
          <input
            type="text"
            placeholder="Profesion"
            value={form.profession}
            onChange={handlerChange}
            id="profession"
          />
          <select
            name="province"
            id="province"
            value={form.province}
            onChange={handlerChange}
            required
          >
            <option value="" disabled>
              {form.province}
            </option>
            {provincesList.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
          <select
            name="location"
            id="location"
            value={form.location}
            onChange={handlerChange}
            required
          >
            <option value="" disabled>
              {form.location}
            </option>
            {citiesInSelectedProvince.map((location, index) => (
              <option key={index} value={location.nombre}>
                {location.nombre}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Descripcion"
            value={form.description}
            onChange={handlerChange}
            id="descripcion"
          />
          <button type="submit">Modificar</button>
        </form>
        {popUpDataProf && (
          <div className={style.containerPopUpDataProf}>
            <div className={style.popUpDataProf}>
              <AiFillCloseCircle
                className={style.btnCloseDataProf}
                onClick={handlerClosePopUpDataProf}
              />
              <h3>Faltan completar Datos</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyProfessionalData;
