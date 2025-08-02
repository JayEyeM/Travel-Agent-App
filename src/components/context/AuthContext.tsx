// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // On mount, check session validity from backend
    fetch('http://localhost:8000/auth/session', {
      credentials: 'include', // send cookie
    })
      .then(res => {
        if (res.ok) setIsLoggedIn(true);
        else setIsLoggedIn(false);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
