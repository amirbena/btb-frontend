import { Grid, GridProps } from "@mui/material";
import { FC } from "react";

const GridContainer: FC<GridProps> = (props) => {
    return (
        <Grid {...props} container />
    )
}

export default GridContainer;