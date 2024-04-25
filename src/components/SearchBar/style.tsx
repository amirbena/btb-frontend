import GridContainer from "../CustomMUI/GridContainer";
import { GridProps, TextField, TextFieldProps, styled } from "@mui/material";

export const SearchBarGridContainer = styled(GridContainer)<GridProps>(({ theme }) => ({
    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
        marginTop: 5,
    }

}));

export const SearchBarTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: 300,
    fontSize: 18,
    [theme.breakpoints.down('sm')]: {
        width: 200,
        fontSize: 14 
    }

}));