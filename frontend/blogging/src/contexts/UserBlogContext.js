import React from 'react'
import { useReducer } from 'react';

export const UserBlogContext = React.createContext();

export const UserBlogReducer = (state, action) => {
    switch (action.type) {
        case "GET_DATA":
            return {userBlog: action.payload};
        default:
            return state;
    }
}

export function UserBlogContextProvider ({ children }){
    const [state, dispatch] = useReducer(UserBlogReducer, {userBlog: [{}]});
    return (
        <UserBlogContext.Provider value={{state, dispatch}}>
            { children }
        </UserBlogContext.Provider>
    );
}