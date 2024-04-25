import { FC, useState } from "react";
import { ContextData, MyContext } from "../MyContext/MyContext";
import { Episode } from "../../../network/response/episode.dto";
import { Character } from "../../../network/response/character.dto";
import { IS_ADMIN_LOCAL, IS_AUTHENTICATED_LOCAL, TOKEN_KEY } from "../../../constants/localStorage";
import axios, { CancelTokenSource } from "axios";
import { Location } from "../../../network/response/location.dto";

export interface ChildrenType {
    children: React.ReactNode;
}


const ContextProvider: FC<ChildrenType> = ({ children }) => {
    const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState<boolean>(false);
    const [isAdminLocal, setLocalIsAdmin] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [cancelToken, setCancelToken] = useState<CancelTokenSource>(axios.CancelToken.source());


    const isAuthenticated = isAuthenticatedLocal || (localStorage.getItem(IS_AUTHENTICATED_LOCAL) === "true" ? true : false);
    const setIsAuthenticated = (isAuthenticated: boolean) => {
        setIsAuthenticatedLocal(isAuthenticated);
        isAuthenticated ? localStorage.setItem(IS_AUTHENTICATED_LOCAL, String(isAuthenticated)) : localStorage.removeItem(IS_AUTHENTICATED_LOCAL);
    }

    const isAdmin = isAdminLocal || (localStorage.getItem(IS_ADMIN_LOCAL) === "true" ? true : false);
    const setIsAdmin = (isAdmin: boolean) => {
        setLocalIsAdmin(isAdmin);
        isAdmin ? localStorage.setItem(IS_ADMIN_LOCAL, String(isAuthenticated)) : localStorage.removeItem(IS_ADMIN_LOCAL);
    }

    const logout = () => {
        setIsAdmin(false);
        setIsAuthenticated(false);
        localStorage.removeItem(TOKEN_KEY);
    }

    const value: ContextData = { isAuthenticated, setIsAdmin, setIsAuthenticated, isAdmin, locations, setLocations, episodes, setEpisodes, characters, setCharacters, cancelToken, setCancelToken, logout };
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
}

export default ContextProvider;