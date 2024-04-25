import { useMutation } from "@tanstack/react-query";
import { RegisterLoginOuterBox, RegisterLoginTypography } from "../../components/registerLogin/styledComponents"
import { getCharacters } from "../../network";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/context/MyContext/MyContext";
import SearchBar from "../../components/SearchBar";
import { SearchBarNetworkProps } from "../../network/request/rickMorty.dto";
import { SnackbarProvider, useSnackbar } from 'notistack';
import ResultsTable from "../../components/ResultsTable";
import { isMobile } from "react-device-detect";
import { CharacterResult } from "../../network/response/character.dto";
import IsLoading from "../../components/IsLoading";

const Characters = () => {

    const [nextPageURL, setNextPageUrl] = useState("");
    const { setCharacters, cancelToken } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const perfomMutate = async () => {
            await mutateAsync({ queryParams: "", cancelToken })
        }
        perfomMutate();

    }, [])

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (searchBarProps: SearchBarNetworkProps) => {
            const result = await getCharacters({ params: [] }, searchBarProps);
            if (typeof result === "string") console.log("Canceled");
            return result as CharacterResult;
        },
        onSuccess: (data: CharacterResult) => {
            const { nextPageURL, characters } = data;
            nextPageURL && setNextPageUrl(nextPageURL);
            setCharacters(characters);
        },
        onError: (error: Error | null) => {
            const message = error?.message || "";
            setCharacters([]);
            enqueueSnackbar(message, { variant: "error" });
        }
    });
    return (
        <SnackbarProvider maxSnack={3}>
            <IsLoading isPending={isPending} size={isMobile ? 50 : 100}/>
            <RegisterLoginOuterBox>
                <RegisterLoginTypography variant="h2">Characters</RegisterLoginTypography>
                <SearchBar mutate={mutateAsync} />
                <ResultsTable />
            </RegisterLoginOuterBox>
        </SnackbarProvider>

    );
}

export default Characters;