import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignUp = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch }   = useAuthContext();

    const signup = async (data) => {
        setError(null);
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json);
        }

        if (response.ok) {
            setError(null);
            setIsLoading(false);
            dispatch({type: "LOG_IN", payload: json});
            localStorage.setItem("user", JSON.stringify(json));
        }
    }
    return {signup, isLoading, error};
}

export default useSignUp;