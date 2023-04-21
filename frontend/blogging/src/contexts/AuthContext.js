import React from 'react'
import { useReducer } from 'react';

export const AuthContext = React.createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {user: action.payload};
        case "LOG_OUT":
            return {user: null};
        default:
            return state;
    }
}

export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {user: null});
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}

