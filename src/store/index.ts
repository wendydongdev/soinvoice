import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './slices/invoicesSlice';
import quotesReducer from './slices/quotesSlice';
import paymentsReducer from './slices/paymentsSlice';
import clientsReducer from './slices/clientsSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    quotes: quotesReducer,
    payments: paymentsReducer,
    clients: clientsReducer,
    products: productsReducer,
    auth: authReducer,
    theme: themeReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;