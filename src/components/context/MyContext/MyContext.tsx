import { Dispatch, SetStateAction, createContext } from 'react';


export const initialUserData: ContextData = {
    isAuthenticated: false,
    isAdmin: false,
    setIsAdmin: () => { },
    setIsAuthenticated: () => { }
}

export interface ContextData {
    isAuthenticated: boolean,
    isAdmin: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
    setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

export const MyContext = createContext<ContextData>(initialUserData);