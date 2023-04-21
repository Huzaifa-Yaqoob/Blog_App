import { useContext } from 'react';
import { AuthContext } from "../contexts/AuthContext";

function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContex must be used in context provider");
    }
  return context;
}

export default useAuthContext
