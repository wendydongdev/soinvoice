import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quote {
  id: number;
  client: string;
  amount: number;
  date: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface QuotesState {
  list: Quote[];
  loading: boolean;
  error: string | null;
}

const initialState: QuotesState = {
  list: [],
  loading: false,
  error: null,
};

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setQuotes: (state, action: PayloadAction<Quote[]>) => {
      state.list = action.payload;
    },
    addQuote: (state, action: PayloadAction<Quote>) => {
      state.list.push(action.payload);
    },
    updateQuote: (state, action: PayloadAction<Quote>) => {
      const index = state.list.findIndex(quote => quote.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteQuote: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(quote => quote.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setQuotes, addQuote, updateQuote, deleteQuote, setLoading, setError } = quotesSlice.actions;

export default quotesSlice.reducer;