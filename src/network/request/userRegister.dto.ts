import { IsEmail, IsNotEmpty, IsString, MAX_LENGTH, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "./userLogin.dto";


export const MAX_NAME_LENGTH = 100;

export interface UserRegisterState {
    name: string;
    email: string;
    password: string;
}

export const initialRegisterState: UserRegisterState = {
    name: "",
    email: "",
    password: "",
}


export class UserRegisterDto implements UserRegisterState {
    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_NAME_LENGTH)
    name!: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(MAX_EMAIL_LENGTH)
    email!: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(MAX_PASSWORD_LENGTH)
    password!: string;
}