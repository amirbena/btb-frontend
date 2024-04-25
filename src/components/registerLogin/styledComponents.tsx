import { Box, BoxProps, GridProps, TextField, Typography, TypographyProps, TextFieldProps, Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import GridContainer from '../CustomMUI/GridContainer';


export const RegisterLoginOuterBox = styled(Box)<BoxProps>(({ theme }) => ({
    marginTop: 30,
    [theme.breakpoints.down('sm')]: {
        marginTop: 18,
    }
}));


export const RegisterLoginTypography = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontSize: 50,
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
        marginTop: 30,
        fontSize: 30
    }
}))


export const RegisterLoginGridContainer = styled(GridContainer)<GridProps>(({ theme }) => ({
    marginTop: 5,
    [theme.breakpoints.down('sm')]: {
        marginTop: 3,
    }

}));

export const RegisterLoginTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: 500,
    [theme.breakpoints.down('sm')]: {
        width: 350,
    }
}));

export const ButtonToOtherScreen = styled(Button)<ButtonProps>(({ theme }) => ({
    marginTop: 20,
    color: 'blue',
    textDecoration: 'none',
    '&:hover': {
        color: 'primary.main',
        background: 'yellow'
    },
    [theme.breakpoints.down('sm')]: {
        marginTop: 10
    }
}));

export const ActionButton = styled(Button)<ButtonProps>(({ theme }) => ({
    marginTop: 40,
    [theme.breakpoints.down('sm')]: {
        marginTop: 10
    }
}));