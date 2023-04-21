import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { dispatch }   = useAuthContext();

    const login = async (data) => {
        setError(null);
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/user/login", {
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
    return {login, isLoading, error};
}

export default useLogIn;