import axios from "axios";
import { UserLoginDto } from "./request/userLogin.dto";
import { User } from "./response/user.response";
import { UserRegisterDto } from "./request/userRegister.dto";
import { RickyMortyDto } from "./request/rickMorty.dto";
import { CharacterResult } from "./response/character.dto";
import { LocationResult } from "./response/location.dto";
import { EpisodeResult } from "./response/episode.dto";

export const BACKEND_URI = process.env.REACT_APP_BACKEND_URL || "http://localhost:3031";

axios.defaults.withCredentials = true;

export const userLogin = async (userLogin: UserLoginDto): Promise<User> => {
    const result = await axios.post(`${BACKEND_URI}/user/login`, userLogin);
    return result.data as User;
}

export const registerUser = async (userRegister: UserRegisterDto): Promise<User> => {
    const result = await axios.post(`${BACKEND_URI}/user`, userRegister);
    return result.data as User;
}


export const getCharacters = async (characterDto: RickyMortyDto, searchParameters: string): Promise<CharacterResult> => {
    const result = await axios.post(`${BACKEND_URI}/rickMorty/character${searchParameters.length ? `?${searchParameters}` : ""}`, characterDto);
    return result.data;
}

export const getLocations = async (locationDto: RickyMortyDto, searchParameters: string): Promise<LocationResult> => {
    const result = await axios.post(`${BACKEND_URI}/rickMorty/location${searchParameters.length ? `?${searchParameters}` : ""}`, locationDto);
    return result.data;
}


export const getEpisodes = async (episodeDto: RickyMortyDto, searchParameters: string): Promise<EpisodeResult> => {
    const result = await axios.post(`${BACKEND_URI}/rickMorty/location${searchParameters.length ? `?${searchParameters}` : ""}`, episodeDto);
    return result.data;
}
