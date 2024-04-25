import { Box, FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { FC, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RouteNames } from "../../constants/react-router";
import { CharacterTypes, EpisodesTypes, LocationTypes } from "../../constants/rickMorty/filters";
import { SearchBarGridContainer, SearchBarTextField } from "./style";
import { MyContext } from "../context/MyContext/MyContext";
import { EpisodeResult } from "../../network/response/episode.dto";
import { LocationResult } from "../../network/response/location.dto";
import { CharacterResult } from "../../network/response/character.dto";
import { SearchBarNetworkProps } from "../../network/request/rickMorty.dto";
import axios from "axios";
import { useDebounce } from "../../hooks/useDebounce.hook";


export interface SearchBarProps {
    mutate: UseMutateAsyncFunction<EpisodeResult | LocationResult | CharacterResult, Error | null, SearchBarNetworkProps, unknown>
}

const SearchBar: FC<SearchBarProps> = ({ mutate }) => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const { cancelToken, setCancelToken } = useContext(MyContext)
    const [selectedCategory, setSelectedCategory] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (selectedCategory) {
            handleSearch(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    const handleSearch = (search: string) => {
        if (selectedCategory) {
            cancelToken.cancel("CanceledToken");
            const newCancelToken = axios.CancelToken.source();
            setCancelToken(newCancelToken);
            mutate({ cancelToken: newCancelToken, queryParams: selectedCategory ? `${selectedCategory}=${search}` : "" })
        }
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedCategory(event.target.value);
        setSearchTerm("");
    };

    const renderRadioGroup = () => {
        let grids: JSX.Element[] = [];
        switch (location.pathname) {
            case RouteNames.EPISODES:
                grids = Object.entries(EpisodesTypes).map(([key, value]) => <FormControlLabel value={value} control={<Radio />} label={key} />);
                break;
            case RouteNames.LOCATIONS:
                grids = Object.entries(LocationTypes).map(([key, value])=> <FormControlLabel value={value} control={<Radio />} label={key} />);
                break;
            case RouteNames.CHARACTERS:
                grids = Object.entries(CharacterTypes).map(([key, value]) => <FormControlLabel value={value} control={<Radio />} label={key} />);
                break;
        }
        return (
            <RadioGroup value={selectedCategory} onChange={handleRadioChange}>
                {grids}
            </RadioGroup>
        )
    }


    return (
        <Box>
            <SearchBarGridContainer alignItems={"center"} justifyContent={"center"} spacing={6}>
                <Grid item>
                    <RadioGroup value={selectedCategory} onChange={handleRadioChange}>
                        {renderRadioGroup()}
                    </RadioGroup>
                </Grid>
                <Grid item>
                    <SearchBarTextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </Grid>
            </SearchBarGridContainer>


        </Box>
    );
}

export default SearchBar;