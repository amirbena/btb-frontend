import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext/MyContext";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants/react-router";
import { isMobile } from "react-device-detect";

const StartPageMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { logout, isAdmin } = useContext(MyContext);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toCharacters = () => {
        navigate(RouteNames.CHARACTERS, { replace: true });
        handleClose();
    }

    const toLocations = () => {
        navigate(RouteNames.LOCATIONS, { replace: true });
        handleClose();
    }

    const toEpisodes = () => {
        navigate(RouteNames.EPISODES, { replace: true });
        handleClose();
    }

    const handleLogout = () => {
        logout();
        navigate(RouteNames.LOGIN, { replace: true });
        handleClose();
    }


    return (
        <div>
            <Button
                id="fade-button"
                color="info"
                style={{ fontSize: isMobile ? 10 : 30 }}
                onClick={handleClick}
            >
                APP ROUTES
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={toCharacters}>Characters</MenuItem>
                <MenuItem onClick={toLocations}>Locations</MenuItem>
                {isAdmin && <MenuItem onClick={toEpisodes}>Episodes</MenuItem>}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}

export default StartPageMenu;