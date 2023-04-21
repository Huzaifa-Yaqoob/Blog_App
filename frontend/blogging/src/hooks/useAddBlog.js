import { useState } from "react";
// import useAuthContext from "./useAuthContext";

const useAddBlog = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const addBlog = async (data) => {
        setIsLoading(true);
        setError(null);
        const user = localStorage.getItem("user");
        var userToken = "Wrong";
        if (user) {
            userToken = JSON.parse(user).token;
        }
        const response = await fetch("http://localhost:5000/blogs/write", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const json = await response.json()
            setError(json);
            setIsLoading(false);
        }
        if (response.ok) {
            setIsLoading(false);
        }
    }

    return {addBlog, isLoading, error};
}

export default useAddBlog