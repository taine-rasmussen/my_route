import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getFromSecureStore,
  saveToSecureStore,
  deleteFromSecureStore,
} from '../utils';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  checkAuthStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface DecodedToken {
  exp: number;
  iat?: number;
  [key: string]: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}refresh-token/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        },
      );
      if (response.ok) {
        const data = await response.json();
        await saveToSecureStore('access_token', data.access_token);
        await saveToSecureStore('refresh_token', data.refresh_token);
        return true;
      } else {
        console.error('Failed to refresh token.');
        return false;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  };

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const accessToken = await getFromSecureStore('access_token');
      const refreshToken = await getFromSecureStore('refresh_token');

      if (accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else if (refreshToken) {
          const refreshed = await refreshAccessToken(refreshToken);
          setIsLoggedIn(refreshed);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await deleteFromSecureStore('access_token');
    await deleteFromSecureStore('refresh_token');
    setIsLoggedIn(false);
    router.push('/(auth)');
  };

  useEffect(() => {
    checkAuthStatus().then(() => {
      if (isLoggedIn) {
        router.push('/(main)');
      } else {
        router.push('/(auth)');
      }
    });
  }, [isLoggedIn, setIsLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loading, checkAuthStatus, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
