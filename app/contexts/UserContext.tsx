import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFromSecureStore } from '../utils';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';
import { ThemePreference, IUser } from '../types';
import usePostRequest from '@/hooks/usePostRequest';

interface TokenUser {
  email: string;
  exp: number;
  id: number;
  [key: string]: any;
}

interface UserContextType {
  tokenUser: TokenUser | null;
  fullUser: IUser | null;
  setFullUser: React.Dispatch<React.SetStateAction<IUser | null>>;
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
  const [tokenUser, setTokenUser] = useState<TokenUser | null>(null);
  const [fullUser, setFullUser] = useState<IUser | null>(null);
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
        const decodedToken = jwtDecode(accessToken) as TokenUser;
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp > currentTime) {
          setTokenUser(decodedToken);
          const { data, loading } = usePostRequest(
            `get_user/?id=${tokenUser?.id}`,
          );
          setFullUser(fullUserData);
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
      setTokenUser(null);
      setFullUser(null);
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        tokenUser,
        fullUser,
        setFullUser,
        themePreference,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
