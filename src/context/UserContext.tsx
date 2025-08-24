import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance';

type Role = 'franchisor' | 'franchisee' | 'customer';
type FranchiseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Not_applied';

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  franchiseStatus?: FranchiseStatus;
  token: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'user';
const TOKEN_STORAGE_KEY = 'token';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize user and token
  const normalizeUser = (userData: any, token: string): User => {
    const normalizedRole = typeof userData.role === 'string'
      ? userData.role.toLowerCase()
      : userData.role.name.toLowerCase();

    const normalizedFranchiseStatus =
      normalizedRole === 'franchisee'
        ? userData.franchiseStatus ?? 'Not_applied'
        : undefined;

    return {
      _id: userData._id || userData.id,
      name: userData.name,
      email: userData.email,
      role: normalizedRole,
      franchiseStatus: normalizedFranchiseStatus,
      token,
    };
  };

  // Initial load from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (userData && token) {
          const parsed = JSON.parse(userData);
          const restoredUser: User = { ...parsed, token };

          setUser(restoredUser);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log(' Token restored and set in axiosInstance:', token);
        }
      } catch (err) {
        console.error(' Failed to load user/token from AsyncStorage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
  const saveUser = async () => {
    try {
      if (user) {
        const { token, ...rest } = user;
        await AsyncStorage.setItem('user', JSON.stringify(rest));
        await AsyncStorage.setItem('token', token);
      } else {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
      }
    } catch (err) {
      console.error('Failed to persist user/token:', err);
    }
  };

  saveUser();
}, [user]);

useEffect(() => {
  if (user?.token) {
    console.log('UserContext: Token set in axiosInstance', user.token);
  }
}, [user]);



  // Login method
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/users/login', { email, password });
      const { user: userData, token } = res.data;
      const normalized = normalizeUser(userData, token);
      setUser(normalized);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Token set in axiosInstance:', token);
      await AsyncStorage.setItem('token', token);
      console.log(' Token saved:', token); 
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Register method
  const register = async (
    name: string,
    email: string,
    password: string,
    role: Role
  ) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post('/users/register', {
        name,
        email,
        password,
        role,
      });
      const { user: userData, token } = res.data;
      const normalized = normalizeUser(userData, token);
      setUser(normalized);
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = async () => {
    
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Refresh user from backend
  const refreshUser = async () => {
    if (!user?.token) return;

    try {
      const res = await axiosInstance.get('/users/me');
      const updatedUserData = res.data;

      setUser((prev) =>
        prev
          ? {
              ...prev,
              ...updatedUserData,
              franchiseStatus:
                updatedUserData.franchiseStatus ?? prev.franchiseStatus,
              token: prev.token,
            }
          : null
      );
    } catch (err: any) {
      console.error('Refresh user error:', err);

      if (err.response?.status === 401) {
        console.warn('Token expired or invalid. Logging out.');
        logout();
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoading, login, logout, register, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
