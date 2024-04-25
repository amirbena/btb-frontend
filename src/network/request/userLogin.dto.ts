import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export const MAX_EMAIL_LENGTH =  408;
export const MAX_PASSWORD_LENGTH = 29;

export interface UserLoginState {
    email: string;
    password: string;
}

export const initialLoginState: UserLoginState = {
    email: "",
    password: "",
}


export class UserLoginDto {

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