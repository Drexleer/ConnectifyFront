import { Divider, Grid } from '@mui/material';
import AdsProfesional from '../../components/AdsProfessional/AdsProfessional';
import BookingProf from '../../components/BookingProf/BookingProf';
import { CardProfileProf } from '../../components/CardProfileProf/CardProfileProf';
import NavBar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import ModifyProfessionalData from '../../components/ModifyProfessionalData/ModifyProfessionalData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProfById } from '../../redux/Slices/modifyProfSlice';
import axios from 'axios';
import PaymentsProf from '../../components/PaymentsProf/PaymentsProf';
import Loading from '../../components/Utils/Loading/Loading';

import ButtonBack from '../../components/Utils/ButtonBack/ButtonBack';
import style from './DashboardProf.module.css';

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const DashboardProf = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersLogin.user);
  const [popUpModify, setPopUpModify] = useState(false);
  const [payments, setPayments] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(
        VITE_API_BASE + `/payments/search/professionals/${users._id}`
      );

      if (resp.status === 200) {
        setPayments(resp.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [users.userName]);

  useEffect(() => {
    dispatch(fetchGetProfById(users._id));
  }, [popUpModify]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <NavBar />

          <div className={style.contButtonBack}>
            <ButtonBack />
          </div>

          <h1 style={{ marginLeft: '65px', fontSize: '30px', fontWeight: 300, textAlign: 'center', marginTop: '-17px' }}>
            Mi Panel
          </h1>
          <Divider />
          <Grid container justifyContent={'space-evenly'} sx={{ pb: 25 }}>
            <Grid item>
              <CardProfileProf setPopUpModify={setPopUpModify} />
            </Grid>
            <Grid item>
              <AdsProfesional />
              <BookingProf />
              <PaymentsProf payments={payments} />
            </Grid>
          </Grid>
          {popUpModify && (
            <ModifyProfessionalData setPopUpModify={setPopUpModify} />
          )}

          <div>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardProf;
