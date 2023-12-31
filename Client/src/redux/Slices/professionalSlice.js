import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_API_BASE = import.meta.env.VITE_API_BASE || "localhost";

// const URL = `http://localhost:3001`;
const URL = VITE_API_BASE;

export const professionalSlice = createSlice({
  name: "professionalSlice",
  initialState: {
    professionals: [],
    detail: {},
    deleted: {},
  },
  reducers: {
    getAllProfessionals: (state, action) => {
      state.professionals = action.payload;
    },
    getProfessionalByID: (state, action) => {
      state.detail = action.payload;
    },
    deleteProfessional: (state, action) => {
      state.deleted = action.payload;
    },
  },
});

export const { getAllProfessionals, getProfessionalByID, deleteProfessional } =
  professionalSlice.actions;

export default professionalSlice.reducer;

export const fetchProfsForAdmin = () => {
  return async (dispatch) => {
    const endpoint = URL + `/professional/`;
    try {
      const response = await axios.get(endpoint);
      const professionals = response.data;
      dispatch(getAllProfessionals(professionals));
      return professionals;
    } catch (error) {
      console.error(error);
      return "No hay profesionales disponibles";
    }
  };
};
export const deleteProfByIdAdmin = (id) => {
  return async (dispatch) => {
    const endpoint = URL + `/professional/${id}/delete`;
    try {
      const deleted = await axios.patch(endpoint, id);

      dispatch(deleteProfessional(deleted));
      return deleted;
    } catch (error) {
      console.error(error);
      return "No se pudo eliminar dicho profesional";
    }
  };
};
