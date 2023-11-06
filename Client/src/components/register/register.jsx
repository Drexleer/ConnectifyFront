import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserRegister } from "../../redux/Slices/registerSlice";
import style from "./register.module.css";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputLabel , Box} from "@mui/material";
import NavBarDemo2 from "../NavBarDemo2/NavBarDemo2";
import Button from "@mui/material/Button";

const Registration = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [clientRegister, setClientRegister] = useState(() => {
    let localStorageData = localStorage.getItem("clientRegisterData");
    return localStorageData
      ? JSON.parse(localStorageData)
      : {
          name: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          profession: [],
          description: "",
          province: "",
          location: "",
          provinceJob: "",
          locationJob: "",
        };
  });

  const routeLocation = useLocation();
  const ifProfRoute = routeLocation.pathname === "/professional/registration";
  const ifClientRoute = routeLocation.pathname === "/client/registration";

  const [passwordType, setPasswordType] = useState();
  const [remoteWork, setRemoteWork] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [email, setEmail] = useState("")
  const [error, setError] = useState({
    error: false,
    message:""
  })

  const renderPasswordToggle = () => (
    <Button type="button" onClick={handleHidePassword}>
      {passwordType ? (
        <Visibility style={{ fontSize: 18 }} />
      ) : (
        <VisibilityOff style={{ fontSize: 18 }} />
      )}
    </Button>
  );
  const handleHidePassword = () => {
    setPasswordType(!passwordType);
  };

  function validateEmail(email) {
    if (!email) {
      setError({
        error: true,
        message: "El campo de correo electrónico no puede estar vacío.",
      });
      return false;
    }
  
    // Verificar si el valor contiene el carácter "+"
    if (email.includes("+")) {
      setError({
        error: true,
        message: "El correo electrónico no puede contener el carácter '+'",
      });
      return false;
    }
  
    // Verificar la validez del formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!emailRegex.test(email)) {
      setError({
        error: true,
        message: "Correo electrónico no válido.",
      });
      return false;
    }
  
    // El correo electrónico es válido y no contiene caracteres no permitidos, puedes limpiar el mensaje de error
    setError({
      error: false,
      message: "",
    });
  
    // Actualizar el estado del campo "email"
    setEmail(email);
  
    return true;
  }
  
  

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    // Validación de formato de imagen
    errors.image = validateImageFormat(formData.get("image"));

    setErrorMessages(errors);
    console.log(errors);

    if (validateEmail(email)) {
    
          setError({
            error: false,
            message: "",
          });

        } else {
          // El correo electrónico es inválido, muestra un mensaje de error y no envíes el formulario
          setError({
            error: true,
            message: "Email no valido, no puede contener caracteres especiales",
          });
        }
        

    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }
    formData.set("name", clientRegister.name);
    formData.set("lastName", clientRegister.lastName);
    formData.set("userName", clientRegister.userName);
    formData.set("email", clientRegister.email);
    formData.set("province", clientRegister.province);
    formData.set("location", clientRegister.location);
    formData.set("password", clientRegister.password);
    formData.set("profession", clientRegister.profession);
    formData.set("description", clientRegister.description);
    formData.set("locationJob", clientRegister.locationJob);
    formData.set("provinceJob", clientRegister.provinceJob);
    formData.set("remoteWork", remoteWork);

    if (clientRegister.profession.length === 0) {
      const response = await dispatch(fetchUserRegister(formData, "client"));
      if (response === "Successfully registered client.") {
        alert(response);
        localStorage.removeItem("clientRegisterData");
        navigate("/home");
      } else {
        if (response) {
          alert(response);
        } else {
          alert("Vuelva a intentarlo más tarde");
        }
      }
    } else {
      if (clientRegister.profession !== "") {
        const response = await dispatch(
          fetchUserRegister(formData, "professional")
        );
        if (response === "Profesional registrado exitosamente") {
          alert(response);
          localStorage.removeItem("clientRegisterData");
          navigate("/home");
        } else {
          if (response) {
            alert(response);
          } else {
            alert("Ocurrió un error durante su registración");
          }
        }
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("clientRegisterData", JSON.stringify(clientRegister));
  }, [clientRegister]);

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    if (name === "email") {
      // Verificar si el valor contiene el carácter "+"
      if (value.includes("+")) {
        setError({
          error: true,
          message: "El correo electrónico no puede contener el carácter '+'",
        });
      } else {
        // El correo electrónico es válido, puedes limpiar el mensaje de error
        setError({
          error: false,
          message: "",
        });
      }
      // Actualizar el estado del campo "email"
      setEmail(value);
    }
    if (type === "checkbox") setRemoteWork(e.target.checked);
    const nameArray = name.split(".");

    if (nameArray.length === 2) {
      const [outer, inner] = nameArray;
      setClientRegister({
        ...clientRegister,
        [outer]: {
          ...clientRegister[outer],
          [inner]: value,
        },
      });
    } else {
      setClientRegister({ ...clientRegister, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setErrorMessages((prevErrors) => ({ ...prevErrors, image: null }));

    if (image) {
      formData.set("image", image);
      setClientRegister({
        ...clientRegister,
        image: URL.createObjectURL(image),
      });
    }

    const imageFile = formData.get("image");

    const imgElement = document.createElement("img");
    imgElement.src = URL.createObjectURL(image);
  };

  const areAllProfFieldsCompleted = () => {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      province,
      provinceJob,
      location,
      locationJob,
      profession,
      description,
      image,
    } = clientRegister;

    return (
      name &&
      lastName &&
      userName &&
      email &&
      password &&
      province &&
      location &&
      provinceJob &&
      locationJob &&
      profession &&
      description &&
      image
    );
  };
  const areAllClienFieldsCompleted = () => {
    const {
      name,
      lastName,
      userName,
      email,
      password,
      image,
      province,
      location,
    } = clientRegister;

    return (
      name &&
      lastName &&
      userName &&
      email &&
      password &&
      province &&
      location &&
      image
    );
  };

  return (
    <div>
      <NavBarDemo2 />

      <div
        style={{
          padding: " 6rem ",
          justifyContent: "center",
          alignItems: "center",
          width: "800px",
          backgroundColor: "transparent",
        }}
      >
        <Box component="form" onSubmit={(e) => handleSubmit(e)}>
          <div style={{ padding: "5px" }}>
            
            <TextField
            id="name"
            label="Nombre"
              type="text"
              name="name"
              value={clientRegister.name}
              onChange={handleChange}
              placeholder="Nombre"
              fullWidth
            />
          </div>
          <div style={{ padding: "5px" }}>
            <TextField
            id="Apellido"
            label="Apellido"
              type="text"
              name="lastName"
              value={clientRegister.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              fullWidth
            />
          </div>
          <div style={{ padding: "5px" }}>
            <TextField
            id="Usuario"
            label="Nombre de usuario"
              type="text"
              name="userName"
              value={clientRegister.userName}
              onChange={handleChange}
              placeholder="Nombre de Usuario"
              fullWidth
            />
            {errorMessages.name && (
              <div className="error">{errorMessages.name}</div>
            )}
          </div>
          <div style={{ padding: "5px" }}>
            <TextField
            id="email"
            label="Email"
              type="email"
              name="email"
              value={clientRegister.email}
              onChange={handleChange}
              placeholder="Email"
              fullWidth
              helperText= {error.message}
              error={error.error}
            />
            
          </div>
          <div style={{ padding: "5px" }}>
            
            <TextField
            id="contraseña"
            label="Contraseña"
              type={passwordType ? "text" : "password"}
              value={clientRegister.password}
              name="password"
              onChange={handleChange}
              placeholder="Contraseña"
              fullWidth
            />
            {renderPasswordToggle()}
          </div>
          <div style={{ padding: "5px" }}>
            <h2>Dirección personal</h2>
            <TextField
            label="Provincia"
              type="text"
              name="province"
              value={clientRegister.province}
              onChange={handleChange}
              placeholder="Provincia"
              fullWidth
            />
            <div style={{ padding: "5px" }}></div>
            <TextField
            label="Cuidad"
              type="text"
              name="location"
              value={clientRegister.location}
              onChange={handleChange}
              placeholder="Localidad"
              fullWidth
            />
          </div>
          {ifProfRoute && (
            <div style={{ backgroundColor: "transparent" }}>
              <div>
                <h2>Area de trabajo</h2>
                <TextField
                label="Provincia (laboral)"
                  type="text"
                  name="provinceJob"
                  value={clientRegister.provinceJob}
                  onChange={handleChange}
                  placeholder="Provincia"
                  fullWidth
                />
                <div style={{ padding: "5px" }}></div>
                <TextField
                label="Cuidad (laboral)"
                  type="text"
                  name="locationJob"
                  value={clientRegister.locationJob}
                  onChange={handleChange}
                  placeholder="Localidad"
                  fullWidth
                />
              </div>
              <div style={{ padding: "5px" }}></div>
              <InputLabel htmlFor="profession">Profesión u oficio.</InputLabel>
              <TextField
                type="text"
                name="profession"
                value={clientRegister.profession}
                onChange={handleChange}
                placeholder="profesión u oficio."
                fullWidth
              />
              <div style={{ padding: "5px" }}></div>
              <InputLabel htmlFor="description">Biografia descriptiva</InputLabel>
              <TextField
                type="text"
                name="description"
                value={clientRegister.description}
                onChange={handleChange}
                placeholder="Comparte tus habilidades con la comunidad de Connectify"
                fullWidth
                rows="5"
              />
              <div style={{ padding: "5px" }}></div>
              <InputLabel htmlFor="remoteWork">Trabajo Remoto</InputLabel>
              <TextField
                type="checkbox"
                name="remoteWork"
                value={remoteWork}
                onChange={handleChange}
              />
            </div>
          )}
          <div style={{ padding: "5px" }}></div>
          <InputLabel htmlFor="image">Imagen</InputLabel>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageUpload}
          />
          {errorMessages.image && (
            <div style={{ color: "red" }}>{errorMessages.image}</div>
          )}
          <div>
            <div style={{ padding: "10px" }}></div>
            {areAllProfFieldsCompleted() && ifProfRoute && (
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{
                  width: "100%",
                  paddingInline: "35px",
                  paddingBlock: "10px",
                  marginBottom: "20px",
                }}
              >
                Enviar formulario
              </Button>
            )}
            {areAllClienFieldsCompleted() && ifClientRoute && (
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{
                  width: "100%",
                  paddingInline: "35px",
                  paddingBlock: "10px",
                  marginBottom: "20px",
                }}
              >
                Enviar formulario
              </Button>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Registration;
