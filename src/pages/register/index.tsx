import { FC, useContext, useState } from "react";
import { UserRegisterDto, UserRegisterState, initialRegisterState } from "../../network/request/userRegister.dto";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../components/context/MyContext/MyContext";
import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { RegisterConstants } from "../../constants/register";
import { isMobile } from "react-device-detect";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

interface UserRegisterStateError {
    name: boolean;
    email: boolean,
    password: boolean;
}

const initialStateError: UserRegisterStateError = {
    email: false,
    name: false,
    password: false
}

const Register: FC = () => {
    const [state, setState] = useState<UserRegisterState>(initialRegisterState);
    const [stateError, setStateError] = useState<UserRegisterStateError>(initialStateError);
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsAdmin } = useContext(MyContext);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleBlur = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const dto = plainToInstance(UserRegisterDto, state);
        const { name } = event.target;
        const errors = await validate(dto);
        const propertyErrors = errors.filter(error => error.property === name);
        setStateError(state => ({ ...state, [name]: !!propertyErrors.length }));
    };


    return (
        <Box marginTop={isMobile ? 10 : 20}>
            <Typography variant="h2" fontSize={isMobile ? 30 : 50}>Register</Typography>
            <Grid container spacing={2} marginTop={isMobile ? 3 : 5}>
                <Grid item xs={12}>
                    <TextField
                        label={RegisterConstants.NAME}
                        name={RegisterConstants.NAME}
                        value={state.name}
                        onChange={handleChange}
                        margin="normal"
                        style={{ width: isMobile ? "160px" : "300px" }}
                        required
                        error={stateError.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={RegisterConstants.PASSWORD}
                        name={RegisterConstants.PASSWORD}
                        type="password"
                        value={state.password}
                        onChange={handleChange}
                        style={{ width: isMobile ? "160px" : "300px" }}
                        margin="normal"
                        required
                        error={stateError.password}
                    />
                </Grid>
            </Grid>

            {/*   <Button variant="contained" type="submit" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="secondary" /> : 'Login'}
            </Button> */}
        </Box>
    );
}

export default Register;