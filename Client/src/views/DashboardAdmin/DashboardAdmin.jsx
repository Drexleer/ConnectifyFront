import AdminDashboard from "../../components/DashboardData/Dashboard";
import ProfsForAdmin from "../../components/DashboardData/ProfsForAdmin/ProfsForAdmin";
import Header from "../../components/DashboardData/Header";
import Navbar from "../../components/Navbar/Navbar";
import style from './DashboardAdmin.module.css'
import Cover from "../../components/Cover/Cover";

const DashboardAdmin = () => {
  return (
    <div>
      <Navbar />
      <Cover/>
      <div>
        <Header />
      </div>
      <div className={style.containerDashAdmin}>
        <div className={style.containerDashAdminProf}>
          <ProfsForAdmin />
        </div>
        <div>
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};
export default DashboardAdmin;
