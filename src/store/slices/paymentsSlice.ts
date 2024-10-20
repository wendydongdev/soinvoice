import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Payment {
  id: number;
  client: string;
  amount: number;
  date: string;
  method: string;
}

interface PaymentsState {
  list: Payment[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentsState = {
  list: [],
  loading: false,
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.list = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.list.push(action.payload);
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.list.findIndex(payment => payment.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePayment: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(payment => payment.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPayments, addPayment, updatePayment, deletePayment, setLoading, setError } = paymentsSlice.actions;

export default paymentsSlice.reducer;