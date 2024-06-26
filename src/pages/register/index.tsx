import { FC, useContext, useState } from "react";
import { MAX_NAME_LENGTH, UserRegisterDto, UserRegisterState, initialRegisterState } from "../../network/request/userRegister.dto";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../components/context/MyContext/MyContext";
import { Box, Grid } from "@mui/material";
import { EMAIL_EMPTY, EMAIL_INVALID, NAME_EMPTY, NAME_INVALID_LENGTH, PASSWORD_EMPTY, PASSWORD_INVALID_LENGTH, RegisterConstants } from "../../constants/register";
import { ButtonToOtherScreen, RegisterLoginOuterBox, ActionButton, RegisterLoginGridContainer, RegisterLoginTextField, RegisterLoginTypography } from "../../components/registerLogin/styledComponents";
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH } from "../../network/request/userLogin.dto";
import isEmail from "validator/lib/isEmail";
import { RouteNames } from "../../constants/react-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../network";
import { User } from "../../network/response/user.response";
import { UserLoginStateError } from "../login";
import NetworkError from "../../components/networkError";
import IsLoading from "../../components/IsLoading";


interface UserRegisterStateError extends UserLoginStateError {
    name: boolean;
}

const initialStateError: UserRegisterStateError = {
    email: false,
    name: false,
    password: false
}




const Register: FC = () => {
    const [state, setState] = useState<UserRegisterState>(initialRegisterState);
    const [stateError, setStateError] = useState<UserRegisterStateError>(initialStateError);
    const [errorTexts, setErrorTexts] = useState<UserRegisterState>(initialRegisterState);
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsAdmin } = useContext(MyContext);


    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (registerUserDto: UserRegisterDto) => {
            const result = await registerUser(registerUserDto);
            if (typeof result === "string") console.log("Canceled");
            return result as User;
        },
        onSuccess: (data: User) => {
            setIsAuthenticated(true);
            setIsAdmin(data.isAdmin);
            setState(initialRegisterState);
            setStateError(initialStateError);
            setErrorTexts(initialRegisterState);
            navigate(RouteNames.CHARACTERS);
        },
        onError: (error: Error | null) => {
            console.log(error?.message);
        }
    });


    const defineErrorTexts = (name: RegisterConstants): string => {
        const errors = {
            [RegisterConstants.NAME]: () => {
                const { name } = state;
                return !name ? NAME_EMPTY : (name.length > MAX_NAME_LENGTH) ? NAME_INVALID_LENGTH : ""
            },
            [RegisterConstants.PASSWORD]: () => {
                const { password } = state;
                if (!password) return PASSWORD_EMPTY;
                if (password.length > MAX_PASSWORD_LENGTH) return PASSWORD_INVALID_LENGTH;
                return "";
            },
            [RegisterConstants.EMAIL]: () => {
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
        const name = event.target.name as RegisterConstants;
        const errorText = defineErrorTexts(name);
        setStateError(state => ({ ...state, [name]: !!errorText }));
        setErrorTexts(state => ({ ...state, [name]: errorText }));

    };

    const navigateToLogin = () => navigate(RouteNames.LOGIN, { replace: true });

    const handleRegisterClick = async () => {
        await mutateAsync(state);
    }

    const renderInputs = (): JSX.Element[] => {
        return Object.values(RegisterConstants).map(name => (
            <Grid item xs={12}>
                <RegisterLoginTextField
                    label={name}
                    name={name}
                    value={state[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={name === RegisterConstants.PASSWORD ? "password" : "text"}
                    required
                    error={stateError[name]}
                    helperText={errorTexts[name]}
                />
            </Grid>
        ));
    }


    return (
        <RegisterLoginOuterBox>
            <RegisterLoginTypography variant="h2">Register</RegisterLoginTypography>
            <RegisterLoginGridContainer spacing={3}>
                {renderInputs()}
            </RegisterLoginGridContainer>
            <Box>
                <ButtonToOtherScreen onClick={navigateToLogin}>
                    To Login Page
                </ButtonToOtherScreen>
            </Box>
            <Box>
                <ActionButton variant="contained" onClick={handleRegisterClick} disabled={isPending}>
                    {isPending ? <IsLoading isPending={isPending} size={24} /> : 'Register'}
                </ActionButton>
            </Box>
            <NetworkError error={error} />



        </RegisterLoginOuterBox>
    );
}

export default Register;