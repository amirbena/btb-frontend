import { TableContainer, TableContainerProps, styled } from "@mui/material";

export const ResultsTableContainer = styled(TableContainer)<TableContainerProps>(({ theme }) => ({
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
    }

}));