import useAuthContext from "./useAuthContext";

const useLogOut = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({type: "LOG_OUT"});
    }

    return { logout };
}

export default useLogOut;