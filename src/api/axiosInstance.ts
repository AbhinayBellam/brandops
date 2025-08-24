import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { logout } from '../context/UserContext';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://10.0.2.2:3000/api';
// const BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL, 

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '', 
  },
});


// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    
    if (token) {
      
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Interceptor token:', token);
    } else {
      console.warn('No token found for interceptor');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const logout = await AsyncStorage.getItem('logout'); // optional: use context if needed
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      Alert.alert('Session expired', 'Please log in again.');
      // Optionally reset navigation if available
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


