import { useContext } from "react";
import { MyContext } from "../context/MyContext/MyContext";
import { useLocation, useNavigate } from "react-router-dom";
import { TableCell, TableContainer, TableHead, Paper, TableBody, TableRow, List, ListItem, Link, Typography, Box } from "@mui/material";
import { RouteNames } from "../../constants/react-router";
import { CharactersTable, EpisodesTable, LocationTable } from "../../constants/rickMorty/table";
import { ResultsTableContainer } from "./style";
import { isMobile } from "react-device-detect";

const ResultsTable = (): JSX.Element => {
    const { characters, episodes, locations, isAdmin } = useContext(MyContext);
    const { pathname } = useLocation();
    const navigate = useNavigate();


    const renderHeaders = (): JSX.Element => {
        let headers: JSX.Element[] = [];
        switch (pathname) {
            case RouteNames.EPISODES:
                headers = Object.values(EpisodesTable).map(episode => <TableCell>{episode}</TableCell>)
                break;
            case RouteNames.LOCATIONS:
                headers = Object.values(LocationTable).map(location => <TableCell>{location}</TableCell>)
                break;
            case RouteNames.CHARACTERS:
                headers = Object.values(CharactersTable).map(character => <TableCell>{character}</TableCell>)
                break;
        }
        return (
            <TableHead>
                <TableRow>
                    {headers}
                </TableRow>
            </TableHead>
        )
    }

    const navigateLocation = (id: number | string) => {
        navigate(`${RouteNames.LOCATIONS}/${id}`, { replace: true });
    }

    const navigateCharacter = (id: string | number) => {
        navigate(`${RouteNames.CHARACTERS}/${id}`, { replace: true });
    }

    const navigateEpisode = (id: string | number) => {
        isAdmin && navigate(`${RouteNames.EPISODES}/${id}`, { replace: true });
    }

    const renderBody = (): JSX.Element[] => {
        if (pathname === RouteNames.LOCATIONS) {
            return locations.map(({ id, name, type, dimension, residents }) => (
                <TableRow>
                    <TableCell><Link  href={`location/${id}`} onClick={() => navigateLocation(id)}>{name}</Link></TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{dimension}</TableCell>
                    <TableCell>
                        <>
                            {residents.map((resident, index) => (
                                <>
                                    <Link href="" marginRight={isMobile ? 1 : 3} onClick={() => navigateCharacter(resident)}>{resident}</Link>
                                    {!isMobile && index % 5 == 0 && index > 0 && <br />}
                                    {isMobile && index % 2 == 0 && index > 0 && <br />}
                                </>
                            ))}
                        </>

                    </TableCell>
                </TableRow>
            ))
        }
        if (pathname === RouteNames.EPISODES) {
            return episodes.map(({ id, name, air_date, episode, characters }) => (
                <TableRow>
                    <TableCell><Link href={`episode/${id}`} onClick={() => navigateEpisode(id)}>{name}</Link></TableCell>
                    <TableCell>{air_date}</TableCell>
                    <TableCell>{episode}</TableCell>
                    <TableCell>
                        <>
                            {characters.map((character, index) => (
                                <>
                                    <Link href="" marginRight={isMobile ? 1 : 3} onClick={() => navigateCharacter(character)}>{character}</Link>
                                    {!isMobile && index % 5 == 0 && index > 0 && <br />}
                                    {isMobile && index % 2 == 0 && index > 0 && <br />}
                                </>

                            ))}
                        </>
                    </TableCell>
                </TableRow>
            ))
        }
        return characters.map(({ id, name, status, species, type, origin, location, image, episode }) => (
            <TableRow>
                <TableCell><Link href={`character/${id}`} onClick={() => navigateCharacter(id)}>{name}</Link></TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{species}</TableCell>
                <TableCell>{type}</TableCell>
                <TableCell><Link href="" onClick={() => navigateLocation(origin.url)}>{origin.name}</Link></TableCell>
                <TableCell><Link href="" onClick={() => navigateLocation(location.url)}>{location.name}</Link></TableCell>
                <TableCell>
                    <img src={image} alt="" width='100px' height={'100px'} />
                </TableCell>
                <TableCell>
                    {episode.map((episode, index) => (
                        <>
                            {
                                isAdmin ?
                                    <>
                                        <Link href="" marginRight={isMobile ? 1 : 3} onClick={() => navigateEpisode(episode)}>{episode}</Link>
                                        {!isMobile && index % 5 == 0 && index > 0 && <br />}
                                        {isMobile && index % 2 == 0 && index > 0 && <br />}
                                    </> :
                                    <>
                                        <Typography variant="body2" color="gray">
                                            {episode}
                                        </Typography>
                                        {!isMobile && index % 5 == 0 && index > 0 && <br />}
                                        {isMobile && index % 2 == 0 && index > 0 && <br />}
                                    </>
                            }</>
                    ))}
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <ResultsTableContainer component={Paper}>
            {renderHeaders()}
            <TableBody>
                {renderBody()}
            </TableBody>
        </ResultsTableContainer>
    );
}

export default ResultsTable;