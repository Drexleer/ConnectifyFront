import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE

// Define una función asincrónica para cargar los anuncios
export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
  const endpoint = `${VITE_API_BASE}/ads`;
  const response = await axios.get(endpoint);
  return response.data;
  //eliminado el tryCatch debido a que el createAsyncThunk ya maneja los errores.
});

const adsSlice = createSlice({
  name: 'ads',
  initialState: { ads: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAds = (state) => state.ads.ads;

export default adsSlice.reducer;
