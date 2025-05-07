import { createContext, useContext, useState } from 'react';

type Profile = {
    id:string,
    pseudo:string,
    avatar:string
}

type User = { userId: string; profile: Profile, token: string, userRole:string}

type AuthContextType = {
  user: User | null
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
