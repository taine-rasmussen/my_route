import React, { createContext, useState, useEffect, useContext } from "react";
import { getFromSecureStore } from "./utils";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  exp: number;
  id: number;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const accessToken = await getFromSecureStore("access_token");
        if (accessToken) {
          const decodedToken = jwtDecode(accessToken) as User;

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp > currentTime) {
            setUser(decodedToken);
          } else {
            console.log("Access token expired");
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
