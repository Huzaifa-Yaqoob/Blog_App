import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useUpdate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch }   = useAuthContext();

    const update = async (data) => {
        setError(null);
        setIsLoading(true);

        const user = localStorage.getItem("user");
        var userToken = "Wrong";
        if (user) {
            userToken = JSON.parse(user).token;
        }

        const response = await fetch("http://localhost:5000/user/update", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            body: data
        });
        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json);
        }

        if (response.ok) {
            setError(null);
            setIsLoading(false);
            json.token = userToken;
            dispatch({type: "LOG_IN", payload: json});
            localStorage.setItem("user", JSON.stringify(json));
        }
    }
    return {update, isLoading, error};
}

export default useUpdate;