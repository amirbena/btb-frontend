import { CircularProgress } from "@mui/material";
import { FC } from "react";



export interface IsLoadingProps {
    isPending: boolean;
    size: number;
}

const IsLoading: FC<IsLoadingProps> = ({ isPending, size }) => {
    return (
        <>
            {isPending && <CircularProgress size={size}  />}
        </>
    );
}

export default IsLoading; 