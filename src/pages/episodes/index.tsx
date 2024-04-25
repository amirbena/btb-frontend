import { useMutation } from "@tanstack/react-query";
import { RegisterLoginOuterBox, RegisterLoginTypography } from "../../components/registerLogin/styledComponents"
import { getEpisodes } from "../../network";
import { EpisodeResult } from "../../network/response/episode.dto";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/context/MyContext/MyContext";
import SearchBar from "../../components/SearchBar";
import { SearchBarNetworkProps } from "../../network/request/rickMorty.dto";
import { SnackbarProvider, useSnackbar } from 'notistack';
import ResultsTable from "../../components/ResultsTable";
import { isMobile } from "react-device-detect";
import IsLoading from "../../components/IsLoading";

const Episodes = () => {

    const [nextPageURL, setNextPageUrl] = useState("");
    const { setEpisodes, cancelToken } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const perfomMutate = async () => {
            await mutateAsync({ queryParams: "", cancelToken })
        }
        perfomMutate();

    }, [])

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (searchBarProps: SearchBarNetworkProps) => {
            const result = await getEpisodes({ params: [] }, searchBarProps);
            if (typeof result === "string") console.log("Canceled");
            return result as EpisodeResult;
        },
        onSuccess: (data: EpisodeResult) => {
            const { nextPageURL, episodes } = data;
            nextPageURL && setNextPageUrl(nextPageURL);
            setEpisodes(episodes);
        },
        onError: (error: Error | null) => {
            const message = error?.message || "";
            setEpisodes([]);
            enqueueSnackbar(message, { variant: "error" });
        }
    });
    return (
        <SnackbarProvider maxSnack={3}>
            <IsLoading isPending={isPending} size={isMobile ? 50 : 100}/>
            <RegisterLoginOuterBox>
                <RegisterLoginTypography variant="h2">Episodes</RegisterLoginTypography>
                <SearchBar mutate={mutateAsync} />
                <ResultsTable />
            </RegisterLoginOuterBox>
        </SnackbarProvider>

    );
}

export default Episodes;