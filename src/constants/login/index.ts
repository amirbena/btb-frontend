import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "../../network/request/userLogin.dto";

export enum LoginConstants {
    EMAIL = "email",
    PASSWORD = "password"
}

export const PASSWORD_EMPTY = "Password is empty";
export const PASSWORD_INVALID_LENGTH = `Length Suppose to be less than ${MAX_PASSWORD_LENGTH} characters`;
export const EMAIL_EMPTY = "Email is Empty";
export const EMAIL_INVALID_LENGTH = `Length Suppose to be less than ${MAX_EMAIL_LENGTH} characters`;
export const EMAIL_INVALID = "Email Invalid Format"
