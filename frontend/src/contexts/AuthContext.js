import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase, signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from '../lib/supabase';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Set up Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name
          }
        });
      } else if (event === 'SIGNED_OUT') {
        dispatch({ type: 'LOGOUT' });
      }
    });

    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name
          }
        });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    
    checkSession();

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const register = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user } = await supabaseSignUp(credentials);
      if (!user) throw new Error('Registration failed');
      
      return user;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { user } = await supabaseSignIn(credentials);
      if (!user) throw new Error('Login failed');
      
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabaseSignOut();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      state, 
      register,
      login, 
      logout,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};