import React, { createContext, useState, useEffect, useContext } from 'react';
import { getFromSecureStore } from '../utils';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from './AuthContext';
import { ThemePreference, IUser } from '../types';

interface TokenUser {
  email: string;
  exp: number;
  id: number;
  [key: string]: any;
}

interface UserContextType {
  tokenUser: TokenUser | null;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [themePreference, setThemePreference] =
    useState<ThemePreference>('system');

  const toggleTheme = (preference: ThemePreference) => {
    setThemePreference(preference);
  };

  const getUserData = async () => {
    if (!tokenUser?.id) return;
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}get_user/?id=${tokenUser?.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to get user data');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
    }
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
      setUser(null);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (tokenUser?.id) {
      getUserData();
    }
  }, [tokenUser]);

  console.log(user);

  return (
    <UserContext.Provider
      value={{
        tokenUser,
        user,
        setUser,
        themePreference,
        toggleTheme,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
