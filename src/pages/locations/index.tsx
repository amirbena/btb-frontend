import { useMutation } from "@tanstack/react-query";
import { RegisterLoginOuterBox, RegisterLoginTypography } from "../../components/registerLogin/styledComponents"
import { getLocations } from "../../network";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../components/context/MyContext/MyContext";
import SearchBar from "../../components/SearchBar";
import { SearchBarNetworkProps } from "../../network/request/rickMorty.dto";
import { SnackbarProvider, useSnackbar } from 'notistack';
import ResultsTable from "../../components/ResultsTable";
import { isMobile } from "react-device-detect";
import { LocationResult } from "../../network/response/location.dto";
import IsLoading from "../../components/IsLoading";

const Locations = () => {

    const [nextPageURL, setNextPageUrl] = useState("");
    const { setLocations, cancelToken } = useContext(MyContext);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const perfomMutate = async () => {
            await mutateAsync({ queryParams: "", cancelToken })
        }
        perfomMutate();

    }, [])

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: async (searchBarProps: SearchBarNetworkProps) => {
            const result = await getLocations({ params: [] }, searchBarProps);
            if (typeof result === "string") console.log("Canceled");
            return result as LocationResult;
        },
        onSuccess: (data: LocationResult) => {
            const { nextPageURL, locations } = data;
            nextPageURL && setNextPageUrl(nextPageURL);
            setLocations(locations)
        },
        onError: (error: Error | null) => {
            const message = error?.message || "";
            setLocations([])
            enqueueSnackbar(message, { variant: "error" });
        }
    });
    return (
        <SnackbarProvider maxSnack={3}>
            <IsLoading isPending={isPending} size={isMobile ? 50 : 100}/>
            <RegisterLoginOuterBox>
                <RegisterLoginTypography variant="h2">Locations</RegisterLoginTypography>
                <SearchBar mutate={mutateAsync} />
                <ResultsTable />
            </RegisterLoginOuterBox>
        </SnackbarProvider>

    );
}

export default Locations;