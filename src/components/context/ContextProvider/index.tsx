import { FC, useState } from "react";
import { ContextData, MyContext } from "../MyContext/MyContext";

export interface ChildrenType {
    children: React.ReactNode;
}


const ContextProvider: FC<ChildrenType> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const value: ContextData = { isAuthenticated, setIsAdmin, setIsAuthenticated, isAdmin };
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
}

export default ContextProvider;