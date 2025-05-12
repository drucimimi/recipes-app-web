import { createContext, useContext, useState } from 'react'
import { UserResponse, AuthContextType } from '@/types/definitions'
import { setCookie, deleteCookie } from "cookies-next";


const AuthContext = createContext<AuthContextType | null>(null)

/**
 * 
 * @example ```
  // Dans le fichier layout.tsx
  import { AuthProvider } from "@/context/AuthContext"

  export default function App({ Component, pageProps }) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  }

  // Dans une page
  import { useAuth } from "@/context/AuthContext";

  export default function Page() {
    const { user, login, logout } = useAuth()

    return (
      <div>
        {!user ? (
          <button onClick={login}>Connecter</button>
        ) : (
          <button onClick={logout}>Déconnecter</button>
        )}
      </div>
    )
  }
```
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null)

  const login = (userData:UserResponse) => {
    setUser(userData)
    setCookie("userDetail", userData, { secure: true, sameSite: "strict" })
  }

  const logout = () => {
    setUser(null)
    deleteCookie("userDetail")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)