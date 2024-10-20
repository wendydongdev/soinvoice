import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ClientsState {
  list: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  list: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.list = action.payload;
    },
    addClient: (state, action: PayloadAction<Client>) => {
      state.list.push(action.payload);
    },
    updateClient: (state, action: PayloadAction<Client>) => {
      const index = state.list.findIndex(client => client.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteClient: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(client => client.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setClients, addClient, updateClient, deleteClient, setLoading, setError } = clientsSlice.actions;

export default clientsSlice.reducer;