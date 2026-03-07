import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type UserRole = 'admin' | 'manager' | 'therapist' | 'front_desk'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (phone: string, otp: string, rememberMe: boolean) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Add error handling for JSON parsing
  const loadStoredAuth = () => {
    try {
      const savedUser = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user')
      const savedToken = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')

      if (savedUser && savedToken) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
        setToken(savedToken)
      }
    } catch (error) {
      console.error('Error loading stored auth:', error)
      // Clear corrupted data
      localStorage.removeItem('auth_user')
      sessionStorage.removeItem('auth_user')
      localStorage.removeItem('auth_token')
      sessionStorage.removeItem('auth_token')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStoredAuth()
  }, [])



const login = async (phone: string, otp: string, rememberMe: boolean) => {
    const API_URL = import.meta.env.VITE_API_URL;

    const res = await fetch(`${API_URL}/auth/verify-otp`, {
 // const res = await fetch("http://localhost:5000/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });

  if (!res.ok) {
    throw new Error("Invalid OTP");
  }

  const data = await res.json();

  // Create minimal user object (since backend returns only token)
  const loggedUser: User = {
    id: "1", // temporary until you create user API
    name: "Admin",
    email: "admin@clinic.com",
    role: "admin",
    phone,
  };

  if (rememberMe) {
    localStorage.setItem("auth_user", JSON.stringify(loggedUser));
    localStorage.setItem("auth_token", data.token);
  } else {
    sessionStorage.setItem("auth_user", JSON.stringify(loggedUser));
    sessionStorage.setItem("auth_token", data.token);
  }

  setUser(loggedUser);
  setToken(data.token);
};


//   const login = async (phone: string, otp: string, rememberMe: boolean) => {
//     try{
//     const res = await fetch("http://localhost:5000/auth/verify-otp", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, otp }),
//   });

//   if (!res.ok) {
//     throw new Error("Invalid OTP");
//   }

//   const data = await res.json();
//   // Save token
//     if (rememberMe) {
//       localStorage.setItem("token", data.token);
//     } else {
//       sessionStorage.setItem("token", data.token);
//     }
//   } catch (error) {
//     throw error;
//   }

//  // localStorage.setItem("token", data.token);
//   };



  // const login = async (phone: string, otp: string, rememberMe: boolean) => {
  //   // Simulate API call delay
  //   await new Promise(resolve => setTimeout(resolve, 1000))
    
  //   // Validate OTP (demo validation)
  //   if (otp !== '123456' && otp !== '000000') {
  //     throw new Error('Invalid OTP. Use 123456 for demo.')
  //   }

  //   const mockUser: User = {
  //     id: '1',
  //     name: 'Admin User',
  //     email: 'admin@clinic.com',
  //     role: 'admin',
  //     phone,
  //     avatar: `https://ui-avatars.com/api/?name=Admin+User&background=0ea5e9&color=fff&bold=true`
  //   }

  //   const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock-jwt-token'

  //   if (rememberMe) {
  //     localStorage.setItem('auth_user', JSON.stringify(mockUser))
  //     localStorage.setItem('auth_token', mockToken)
  //   } else {
  //     sessionStorage.setItem('auth_user', JSON.stringify(mockUser))
  //     sessionStorage.setItem('auth_token', mockToken)
  //   }

  //   setUser(mockUser)
  //   setToken(mockToken)
  // }

  const logout = () => {
    // Clear specific auth items only
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
    setUser(null)
    setToken(null)
  }

  const refreshUser = async () => {
    // This would fetch fresh user data from API
    if (user) {
      const updatedUser = { ...user, name: `${user.name} (Updated)` }
      setUser(updatedUser)
      
      // Update storage if exists
      if (localStorage.getItem('auth_user')) {
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      }
      if (sessionStorage.getItem('auth_user')) {
        sessionStorage.setItem('auth_user', JSON.stringify(updatedUser))
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
