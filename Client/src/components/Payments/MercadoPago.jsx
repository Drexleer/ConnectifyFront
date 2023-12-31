/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";


function mercadoPago(pay) {
  // USER es el Usuario registrado
  const { user, isAuthenticated } = useAuth0();
  const users = useSelector((state) => state.usersLogin.user);

  // DETAIL es el detalle del Professional
  const detail = useSelector((state) => state.detail);

  const PUBLIC_KEY = "TEST-50156f30-252b-4623-bbba-ed453620d49f";

  const [preferenceId, setPreferenceId] = useState(null);
  const [descriptionBuy, setDescriptionBuy] = useState(
    "Gracias por la compra!"
  );
  const [servicePrice, setServicePrice] = useState(1);
  const [cargandoSiNo, setCargandoSiNo] = useState("");
  const [walletVisible, setWalletVisible] = useState(false);

  const [userDataOk, setUserDataOk] = useState(null);
  const [detailProf, setDetailProf] = useState(null);
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      setUserDataOk(user.nickname);
    }
    if (users) {
      setUserDataOk(users.userName);
    }
  }, [user, users, userDataOk, isAuthenticated]);

  useEffect(() => {}, [userDataOk]);

  useEffect(() => {
    if (preferenceId) {
      setCargandoSiNo("");
      setWalletVisible(true); //Evito que se repita el botón repetido de MP
    }
  }, [preferenceId]);

  useEffect(() => {
    if (detail.detail.price) setServicePrice(detail.detail.price);
    if (detail.detail.title) setDescriptionBuy(detail.detail.title);
  }, [userDataOk, detail]);

  initMercadoPago(PUBLIC_KEY);

  //Mercado Pago functions
  const createPreference = async () => {
    try {
      const response = await axios.post(
        "https://connectifyback-dp-production.up.railway.app/create_preference",
        
        {
          idProf: detail.detail.creator[0]._id, //detailProf.detail._id,
          userName: userDataOk,
          description: descriptionBuy,
          price: detail.detail.price,
          quantity: 1,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error en solicitud MercadoPago... ", error);
    }
  };

  const handleButton = async () => {
    setCargandoSiNo("Cargando pago...");
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  useEffect(() => {
    if (pay.pay && !walletVisible) handleButton();
  }, [pay]);

  return (
    <>
      <h4>{cargandoSiNo}</h4>
      {(walletVisible && preferenceId && pay.pay) && (
        <>
          {console.log('Renderizando el componente Wallet')}
          <Wallet initialization={{ preferenceId }} />
        </>
      )}
    </>

  )
}
export default mercadoPago;
