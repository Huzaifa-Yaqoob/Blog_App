import { useState } from "react";

const useDeleteBlog = () => {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const user = localStorage.getItem("user");
    var userToken = "Wrong";
    if (user) {
        userToken = JSON.parse(user).token;
    }

    const deleteBlog = async (str) => {
        setError(null)
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/blogs/deleted/${str}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            },
        });
        if (response.ok) {
            setError(false);
            setIsLoading(false);
        }
        if (!response.ok) {
            setError(true);
            setIsLoading(false);
        }
    }

    return {deleteBlog, error, isLoading};
}

export default useDeleteBlog