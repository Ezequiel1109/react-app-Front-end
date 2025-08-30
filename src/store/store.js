import { configureStore } from '@reduxjs/toolkit';
import productsReducer from "../features/productsSlice";
import authSlice from '../features/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions:['persist/PERSIST','persist/REHYDRATE']
      }
    }), 
    devTools: process.env.NODE_ENV !== 'production' && {
    // Configuración específica para DevTools
    name: 'React App',
    trace: true,
    traceLimit: 25
  } 
});
export default store;