import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, UserLoginState } from "./userLogin.dto";


export const MAX_NAME_LENGTH = 100;

export interface UserRegisterState extends UserLoginState {
    name: string;
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