import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFromSecureStore } from '../utils';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';
import { ThemePreference } from '../types';

interface User {
  email: string;
  exp: number;
  id: number;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  themePreference: string;
  toggleTheme: (preference: ThemePreference) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [themePreference, setThemePreference] =
    useState<ThemePreference>('system');

  const toggleTheme = (preference: ThemePreference) => {
    setThemePreference(preference);
  };

  const loadUserData = async () => {
    setLoading(true);
    try {
      const accessToken = await getFromSecureStore('access_token');
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken) as User;
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          setUser(decodedToken);
        } else {
          console.log('Access token expired');
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadUserData();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{ user, setUser, themePreference, toggleTheme, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
