import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { isMobile } from "react-device-detect";

export interface ErrorProps {
    error: Error | null
}

const NetworkError: FC<ErrorProps> = ({ error }) => {
    return (<>
        {error?.message &&
            <Box>
                <Typography variant="body1" color="red" fontSize={isMobile ? 10 : 20} marginTop={isMobile ? 10 : 20}>{error?.message}</Typography>
            </Box>
        }</>);
}

export default NetworkError;