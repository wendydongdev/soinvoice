import api from './api';
import { setUser, setToken, setLoading, setError } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post('/auth/login', { email, password });
    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    localStorage.setItem('token', response.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  } catch (error) {
    dispatch(setError('Invalid email or password'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await api.post('/auth/register', { name, email, password });
    dispatch(setUser(response.data.user));
    dispatch(setToken(response.data.token));
    localStorage.setItem('token', response.data.token);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  } catch (error) {
    dispatch(setError('Registration failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  dispatch(setUser(null));
  dispatch(setToken(null));
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/me');
      dispatch(setUser(response.data));
      dispatch(setToken(token));
    } catch (error) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }
};