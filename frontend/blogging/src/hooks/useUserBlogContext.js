import { useContext } from "react";
import { UserBlogContext } from "../contexts/UserBlogContext";

function useUserBlogContext(){
    const context = useContext(UserBlogContext);

    if (!context) {
        console.log(2);
        throw new Error("Please use useUserBlogContext in context Provider");
    }
    
    return context;
}

export default useUserBlogContext