import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: number;
  clientName: string;
  clientEmail: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

interface InvoicesState {
  list: Invoice[];
  currentInvoice: Invoice | null;
  loading: boolean;
  error: string | null;
}

const initialState: InvoicesState = {
  list: [],
  currentInvoice: null,
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.list = action.payload;
    },
    setCurrentInvoice: (state, action: PayloadAction<Invoice>) => {
      state.currentInvoice = action.payload;
    },
    clearCurrentInvoice: (state) => {
      state.currentInvoice = null;
    },
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.list.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.list.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      if (state.currentInvoice && state.currentInvoice.id === action.payload.id) {
        state.currentInvoice = action.payload;
      }
    },
    deleteInvoice: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(invoice => invoice.id !== action.payload);
      if (state.currentInvoice && state.currentInvoice.id === action.payload) {
        state.currentInvoice = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setInvoices,
  setCurrentInvoice,
  clearCurrentInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  setLoading,
  setError
} = invoicesSlice.actions;

export default invoicesSlice.reducer;