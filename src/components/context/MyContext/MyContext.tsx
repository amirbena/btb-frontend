import { Dispatch, SetStateAction, createContext } from 'react';
import { Character } from '../../../network/response/character.dto';
import { Episode } from '../../../network/response/episode.dto';
import axios, { CancelTokenSource } from 'axios';
import { Location } from '../../../network/response/location.dto';

axios.CancelToken.source()

export const initialUserData: ContextData = {
    isAuthenticated: false,
    isAdmin: false,
    characters: [],
    locations: [],
    episodes: [],
    setIsAdmin: () => { },
    setIsAuthenticated: () => { },
    setCharacters: () => { },
    setLocations: () => { },
    setEpisodes: () => { },
    cancelToken: axios.CancelToken.source(),
    setCancelToken: () => { },
    logout: () => { }

}

export interface ContextData {
    isAuthenticated: boolean,
    isAdmin: boolean;
    characters: Character[],
    locations: Location[],
    episodes: Episode[],
    setCharacters: Dispatch<SetStateAction<Character[]>>,
    setLocations: Dispatch<SetStateAction<Location[]>>,
    setEpisodes: Dispatch<SetStateAction<Episode[]>>,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    setIsAdmin: (isAdmin: boolean) => void;
    cancelToken: CancelTokenSource,
    setCancelToken: Dispatch<SetStateAction<CancelTokenSource>>
    logout: () => void
}

export const MyContext = createContext<ContextData>(initialUserData);