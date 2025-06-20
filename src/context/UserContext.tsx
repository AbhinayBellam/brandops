import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance';

type Role = 'franchisor' | 'franchisee' | 'customer';
type FranchiseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Not_applied';

type User = {
  _id: string;
  name: string;
  email: string;
  role: Role | string;
  franchiseStatus?: FranchiseStatus;
  token: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: Role
  ) => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'user';
const TOKEN_STORAGE_KEY = 'token';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and token from AsyncStorage on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

        if (userData && token) {
          const parsed = JSON.parse(userData);
          setUser({ ...parsed, token });

          // Set token in axios default header
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error('Failed to load user/token from AsyncStorage:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user and token in AsyncStorage on change
  useEffect(() => {
    console.log('User changed:', user);
    const saveUser = async () => {
      try {
        if (user) {
            console.log('Role:', user.role);
    console.log('Franchise Status:', user.franchiseStatus);
          const { token, ...rest } = user;
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(rest));
          await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);

          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
          await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);

          delete axiosInstance.defaults.headers.common['Authorization'];
        }
      } catch (err) {
        console.error('Failed to persist user/token in AsyncStorage:', err);
      }
    };

    saveUser();
  }, [user]);

  const normalizeUser = (userData: any, token: string): User => {
  const normalizedRole = typeof userData.role === 'string' ? userData.role : userData.role.name.toLowerCase();
  const normalizedFranchiseStatus =
    normalizedRole === 'franchisee' ? userData.franchiseStatus ?? 'Not_applied' : undefined;

  return {
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    role: normalizedRole as Role,
    franchiseStatus: normalizedFranchiseStatus,
    token,
  };
};

 const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.post('/users/login', { email, password });
    const { user: userData, token } = response.data;
    const normalized = normalizeUser(userData, token);
    setUser(normalized);
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  } finally {
    setIsLoading(false);
  }
};


  const register = async (
    name: string,
    email: string,
    password: string,
    role: Role
  ) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/users/register', {
        name,
        email,
        password,
        role,
      });

      const { user: userData, token } = response.data;
      const normalized = normalizeUser(userData, token);
    setUser(normalized);

    } catch (err) {
      console.error('Register error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  };

 const refreshUser = async () => {
  if (!user?.token) return;

  try {
    const response = await axiosInstance.get('/auth/me');
    setUser((prev) =>
      prev ? {
        ...prev,
        ...response.data,
        franchiseStatus:
          response.data.franchiseStatus ?? prev.franchiseStatus,
        token: prev.token
      } : null
    );
  } catch (err) {
    console.error('Refresh user error:', err);
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
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
