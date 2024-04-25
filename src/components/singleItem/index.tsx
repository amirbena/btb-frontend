import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Episode } from "../../network/response/episode.dto";
import { Character } from "../../network/response/character.dto";
import { Location } from "../../network/response/location.dto";
import { Box, List, ListItem, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";

export interface SingleItemProps {
    episode?: Episode;
    character?: Character;
    location?: Location;
}

const SingleItem: FC<SingleItemProps> = ({ location, episode, character }) => {

    const renderLocation = () => {
        const { name, dimension, type, residents } = location!;
        const entries = [name, type, dimension, residents]

        return Object.entries(entries).map(([key, value], index) => (
            <ListItem>
                {index !== entries.length - 1 ? `${key.toLocaleLowerCase()}:${value}` : `${key.toLocaleLowerCase()}:${(value as string[]).join(',')}`}
            </ListItem>
        ))
    }


    const renderEpisode = () => {
        const { name, air_date, episode: episodeFromEpisode, characters } = episode!;
        const entries = [name, air_date, episodeFromEpisode, characters]

        return Object.entries(entries).map(([key, value], index) => (
            <ListItem>
                {index !== entries.length - 1 ? `${key.toLocaleLowerCase()}:${value}` : `${key.toLocaleLowerCase()}:${(value as string[]).join(',')}`}
            </ListItem>
        ))
    }

    const renderCharacter = () => {
        const { name, gender, type, status, species, image, origin: { name: originName }, location: { name: locationName }, episode } = character!;
        const entries = [name, gender, type, status, species, originName, locationName, image, episode]

        return Object.entries(entries).map(([key, value], index) => (
            <ListItem>
                {index < entries.length - 2 && `${key.toLocaleLowerCase()}:${value}`}
                {index === entries.length - 1 && `${key.toLocaleLowerCase()}:${(value as string[]).join(',')}`}
                {index === entries.length - 2 && `${key.toLocaleLowerCase()}:` && <img src={value as string} alt="" width={'150px'} height={'150px'} />}
            </ListItem>
        ))
    }
    return (
        <Box marginTop={isMobile ? 20 : 40}>
            <List>
                {location && renderLocation()}
                {character && renderCharacter()}
                {episode && renderEpisode()}
            </List>
        </Box>

    );
}

export default SingleItem;