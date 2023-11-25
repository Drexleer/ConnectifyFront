import AdminDashboard from "../../components/DashboardData/Dashboard";
import ProfsForAdmin from "../../components/DashboardData/ProfsForAdmin/ProfsForAdmin";
import Header from "../../components/DashboardData/Header";
import Navbar from "../../components/Navbar/Navbar";
import style from "./DashboardAdmin.module.css";
import Cover from "../../components/Cover/Cover";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { GoCommentDiscussion } from "react-icons/go";
import { MdAdminPanelSettings } from "react-icons/md";
import Footer from "../../components/Footer/Footer";

const DashboardAdmin = () => {
  const [showComment, setShowComment] = useState(false);
  const [showPanelUser, setShowPanelUser] = useState(false);

  const viewComment = () => {
    if (!showComment && !showPanelUser) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  };

  const viewPanelUser = () => {
    if (!showComment && !showPanelUser) {
      setShowPanelUser(true);
    } else {
      setShowPanelUser(false);
    }
  };

  const backToPanel = () => {
    if (showComment) {
      setShowComment(false);
    } else if (showPanelUser) {
      setShowPanelUser(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Cover />
      <div
        className={
          showPanelUser
            ? style.containerDashPanelAdminInPanelUser
            : showComment
            ? style.containerDashPanelAdminInComment
            : style.containerDashPanelAdmin
        }
      >
        <Header />
        <div>
          {!showComment && !showPanelUser && (
            <div className={style.containerBtnPanel}>
              <button
                onClick={viewPanelUser}
                className={style.containerBtnUser}
              >
                <MdAdminPanelSettings className={style.iconPanelUser} />
                <span className={style.textPanelUser}>Panel de Usuarios</span>
              </button>
              <button
                onClick={viewComment}
                className={style.containerBtnComment}
              >
                <GoCommentDiscussion className={style.iconPanelComment} />
                <span className={style.textPanelComment}>
                  Comentarios
                </span>
              </button>
            </div>
          )}
        </div>
        <div className={style.containerBtnBackToPanel}>
          {showComment ? (
            <button onClick={backToPanel} className={style.backToPanel}>
              <FaArrowLeft />
              Volver
            </button>
          ) : (
            showPanelUser && (
              <button onClick={backToPanel} className={style.backToPanel}>
                <FaArrowLeft />
                Volver
              </button>
            )
          )}
        </div>
      </div>
      {showPanelUser && (
        <div className={style.containerDashAdminProf}>
          <ProfsForAdmin />
        </div>
      )}
      {showComment && (
        <div className={style.containerDashCommets}>
          <AdminDashboard />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default DashboardAdmin;
