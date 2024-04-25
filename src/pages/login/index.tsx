import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../components/context/MyContext/MyContext";
import { Box, Grid } from "@mui/material";
import { EMAIL_EMPTY, EMAIL_INVALID, PASSWORD_EMPTY, PASSWORD_INVALID_LENGTH, LoginConstants } from "../../constants/login";
import { ButtonToOtherScreen, RegisterLoginOuterBox, ActionButton, RegisterLoginGridContainer, RegisterLoginTextField, RegisterLoginTypography } from "../../components/registerLogin/styledComponents";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, UserLoginDto, UserLoginState, initialLoginState } from "../../network/request/userLogin.dto";
import isEmail from "validator/lib/isEmail";
import { RouteNames } from "../../constants/react-router";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../network";
import { User } from "../../network/response/user.response";
import NetworkError from "../../components/networkError";
import IsLoading from "../../components/IsLoading";

export interface UserLoginStateError {
    email: boolean,
    password: boolean;
}

const initialStateError: UserLoginStateError = {
    email: false,
    password: false
}


const Login: FC = () => {
    const [state, setState] = useState<UserLoginState>(initialLoginState);
    const [stateError, setStateError] = useState<UserLoginStateError>(initialStateError);
    const [errorTexts, setErrorTexts] = useState<UserLoginState>(initialLoginState);
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsAdmin } = useContext(MyContext);


    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (loginUserDto: UserLoginDto) => {
            return await userLogin(loginUserDto);
        },
        onSuccess: (data: User) => {
            setIsAuthenticated(true);
            setIsAdmin(data.isAdmin);
            setState(initialLoginState);
            setStateError(initialStateError);
            setErrorTexts(initialLoginState);
            navigate(RouteNames.CHARACTERS);
        },
        onError: (error: Error | null) => {
            console.log(error?.message);
        }
    });


    const defineErrorTexts = (name: LoginConstants): string => {
        const errors = {
            [LoginConstants.PASSWORD]: () => {
                const { password } = state;
                if (!password) return PASSWORD_EMPTY;
                if (password.length > MAX_PASSWORD_LENGTH) return PASSWORD_INVALID_LENGTH;
                return "";
            },
            [LoginConstants.EMAIL]: () => {
                const { email } = state;
                if (!email) return EMAIL_EMPTY;
                if (email.length > MAX_EMAIL_LENGTH) return PASSWORD_INVALID_LENGTH;
                if (!isEmail(email)) return EMAIL_INVALID;
                return "";
            }
        }
        return errors[name]();
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = event.target.name as LoginConstants;
        const errorText = defineErrorTexts(name);
        setStateError(state => ({ ...state, [name]: !!errorText }));
        setErrorTexts(state => ({ ...state, [name]: errorText }));

    };

    const navigateToRegister = () => navigate(RouteNames.REGISTER, { replace: true });

    const handleLoginClick = async () => {
        await mutateAsync(state);
    }

    const renderInputs = (): JSX.Element[] => {
        return Object.values(LoginConstants).map(name => (
            <Grid item xs={12}>
                <RegisterLoginTextField
                    label={name}
                    name={name}
                    value={state[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={name === LoginConstants.PASSWORD ? "password" : "text"}
                    required
                    error={stateError[name]}
                    helperText={errorTexts[name]}
                />
            </Grid>
        ));
    }


    return (
        <RegisterLoginOuterBox>
            <RegisterLoginTypography variant="h2">Log In</RegisterLoginTypography>
            <RegisterLoginGridContainer spacing={3}>
                {renderInputs()}
            </RegisterLoginGridContainer>
            <Box>
                <ButtonToOtherScreen onClick={navigateToRegister}>
                    To Register
                </ButtonToOtherScreen>
            </Box>
            <Box>
                <ActionButton variant="contained" onClick={handleLoginClick} disabled={isPending}>
                    {isPending ? <IsLoading isPending={isPending} size={24} /> : 'LOGIN'}
                </ActionButton>
            </Box>
            <NetworkError error={error} />



        </RegisterLoginOuterBox>
    );
}

export default Login;