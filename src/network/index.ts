import axios, { AxiosError } from "axios";
import { UserLoginDto } from "./request/userLogin.dto";
import { User, UserResponse } from "./response/user.response";
import { UserRegisterDto } from "./request/userRegister.dto";
import { RickyMortyDto, SearchBarNetworkProps } from "./request/rickMorty.dto";
import { CharacterResult } from "./response/character.dto";
import { LocationResult } from "./response/location.dto";
import { EpisodeResult } from "./response/episode.dto";
import { TOKEN_KEY } from "../constants/localStorage";

export const BACKEND_URI = process.env.REACT_APP_BACKEND_URL || "http://localhost:3031";
axios.defaults.withCredentials = true;

const handleError = (error: unknown): string => {
    if (axios.isCancel(error)) {
        return error.message || "";
    }
    else if (error instanceof AxiosError) {
        throw error.response?.data;
    }
    else if (error instanceof Error) {
        throw error.message
    }
    else throw error;
}

export const userLogin = async (userLogin: UserLoginDto): Promise<User> => {
    try {
        const result = await axios.post(`${BACKEND_URI}/user/login`, userLogin);
        const { token, user } = result.data as UserResponse;
        localStorage.setItem(TOKEN_KEY, token);
        return user;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw error.response?.data;
        }
        if (error instanceof Error) {
            throw error.message
        }
        else throw error;
    }

}

export const registerUser = async (userRegister: UserRegisterDto): Promise<User | string> => {
    try {
        const result = await axios.post(`${BACKEND_URI}/user/`, userRegister);
        const { token, user } = result.data as UserResponse;
        localStorage.setItem(TOKEN_KEY, token);
        return user;
    } catch (error) {
        return handleError(error);
    }

}



export const getCharacters = async (characterDto: RickyMortyDto, searchBarProps: SearchBarNetworkProps): Promise<CharacterResult | string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    const { cancelToken, queryParams } = searchBarProps;
    try {
        const result = await axios.post(`${BACKEND_URI}/rickMorty/character${queryParams.length ? `?${queryParams}` : ""}`, characterDto, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cancelToken: cancelToken.token
        });
        return result.data;
    } catch (error) {
        return handleError(error);
    }

}

export const getLocations = async (locationDto: RickyMortyDto, searchBarProps: SearchBarNetworkProps): Promise<LocationResult | string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    const { cancelToken, queryParams } = searchBarProps;
    try {
        const result = await axios.post(`${BACKEND_URI}/rickMorty/location${queryParams.length ? `?${queryParams}` : ""}`, locationDto, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cancelToken: cancelToken.token
        });
        return result.data;
    } catch (error) {
        return handleError(error);
    }


}


export const getEpisodes = async (episodeDto: RickyMortyDto, searchBarProps: SearchBarNetworkProps): Promise<EpisodeResult | string> => {
    const token = localStorage.getItem(TOKEN_KEY);
    const { cancelToken, queryParams } = searchBarProps;
    try {
        const result = await axios.post(`${BACKEND_URI}/rickMorty/episode${queryParams.length ? `?${queryParams}` : ""}`, episodeDto, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cancelToken: cancelToken.token
        });
        return result.data;
    } catch (error) {
        return handleError(error);
    }

}
