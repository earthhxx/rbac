// app/context/AuthContext.tsx
"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types/cookies"; 
import { AuthContextType } from "@/types/auth_context";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = async () => {
    await fetch("/api/auth/Logout", { method: "POST" });
    setUser(null);
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, open, setOpen, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
