import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsForAdmin,
  deleteCommentByIdAdmin,
  checkCommentByIdAdmin,
} from "../../../redux/Slices/commentSlice";
import style from "./CommentsForAdmin.module.css";
import Cover from "../../Cover/Cover";

const CommentsForAdmin = () => {
  // const comments = useSelector((state) => state.comments.comments);
  const comments = useSelector((state) =>
    state.comment.comments.filter((comment) => !comment.isChecked)
  );

  const deleted = useSelector((state) => state.comment.deleted);
  const dispatch = useDispatch();
  const [allComments, setAllComments] = useState(comments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchCommentsForAdmin());
        const newState = response.filter((comment) => !comment.isChecked);
        setAllComments(newState);
      } catch (error) {
        console.error("Falló el fetcheo", error);
      }
    };
    fetchData();
  }, []);

  const [showReviewerDetails, setShowReviewerDetails] = useState(false);
  const [showRevieweeDetails, setShowRevieweeDetails] = useState(false);
  const [whoToShow, setWhoToShow] = useState();
  const [loading, setLoading] = useState(false);

  const handleClickReviewer = (Client) => {
    setShowReviewerDetails(true);
    setWhoToShow(Client);
  };
  const handleClickReviewee = (Professional) => {
    setShowRevieweeDetails(true);
    setWhoToShow(Professional);
  };
  const handleClose = () => {
    setShowReviewerDetails(false);
    setShowRevieweeDetails(false);
  };

  const handleCensura = async (_id) => {
    showLoading();
    await dispatch(deleteCommentByIdAdmin(_id));
    const response = await dispatch(fetchCommentsForAdmin());
    const newState = response.filter((comment) => !comment.isChecked);

    setAllComments(newState);
  };

  const handleCheck = async (_id) => {
    showLoading();
    await dispatch(checkCommentByIdAdmin(_id));
    const response = await dispatch(fetchCommentsForAdmin());
    const newState = response.filter((comment) => !comment.isChecked);
    setAllComments(newState);
  };

  function showLoading() {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 750);
  }
  const amount = allComments.length;
  return (
    <div className={style.containerCommentsAdmin}>
      <div className={style.titleCommentsAdmin}>
        <h2>Comentarios Recientes: ({amount})</h2>
      </div>
      <div className={style.containerAllCommentAdmin}>
        {allComments.length !== 0 ? (
          allComments.map((comment) => (
            <div key={comment._id} className={style.containesCommentAdmin}>
              <h4 className={style.commentClientToProfessional}>
                <div>
                  <div>
                    Client{" "}
                    <button
                      onClick={() => handleClickReviewer(comment.Client)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      {comment.Client.userName}
                    </button>{" "}
                  </div>
                  <div>
                    Professional{" "}
                    <button
                      onClick={() => handleClickReviewee(comment.Professional)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      {comment.Professional.userName}
                    </button>
                  </div>
                  <div>Fecha: {comment.date.substring(0, 10)}</div>
                </div>
                <div className={style.containerButtonCommentAdmin}>
                  <button
                    onClick={() => handleCensura(comment._id)}
                    className={
                      comment.isDeleted
                        ? style.buttonCommentAdminHabilitado
                        : style.buttonCommentAdminCensurado
                    }
                  >
                    {comment.isDeleted ? "Habilitar" : "Censurar"}
                  </button>{" "}
                  <button
                    onClick={() => handleCheck(comment._id)}
                    className={style.buttonCommentAdminLeido}
                  >
                    Leído
                  </button>{" "}
                </div>
              </h4>
              <div className={style.containerTextCommentAdmin}>
                <p className={style.commentAdmin}>
                  <span>Comentario:</span> {comment.comment}
                </p>
              </div>

              <hr></hr>
            </div>
          ))
        ) : (
          <h3>No Hay Comentarios por Revisar</h3>
        )}
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
      {showReviewerDetails && (
        <div className={style.vemos}>
          <div className={style.details}>
            <img
              src={
                whoToShow.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCMq4cGfAmaJAYVpXFPLY57EzVip1FTMK-ETQH1aU24VD-bYx5wJ4srHFP99zAgqXBvfQ&usqp=CAU"
              }
            />
            <button onClick={handleClose} className={style.closeButton}>
              X
            </button>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {whoToShow.name ? <h3>Nombre: {whoToShow.name}</h3> : null}
              {whoToShow.name ? <h3>Apellido: {whoToShow.lastName}</h3> : null}
              <h3>Nombre de Usarió: {whoToShow.userName}</h3>
              <h3>Email: {whoToShow.email}</h3>
            </div>
          </div>
        </div>
      )}
      {showRevieweeDetails && (
        <div className={style.vemos}>
          <div className={style.details}>
            <img src={whoToShow.image} />
            <button onClick={handleClose} className={style.closeButton}>
              X
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3>Nombre: {whoToShow.name}</h3>
              <h3>Apellido: {whoToShow.lastName}</h3>
              <h3>Nombre de Usarió: {whoToShow.userName}</h3>
              <h3>Profesión: {whoToShow.profession}</h3>
              <h3>Email: {whoToShow.email}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CommentsForAdmin;
