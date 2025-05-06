import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You could also fetch user data here if needed
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An error occurred during login' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUser(data.user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'An error occurred during registration' 
      };
    }
  };

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 