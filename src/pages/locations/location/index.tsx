import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {  getLocations } from "../../../network";
import { MyContext } from "../../../components/context/MyContext/MyContext";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import SingleItem from "../../../components/singleItem";
import { Location, LocationResult } from "../../../network/response/location.dto";

const SingleLocation = () => {

    const [location, setLocation] = useState<Location>();
    const { cancelToken } = useContext(MyContext);
    const { id } = useParams();

    useEffect(() => {
        const perfomAsync = async () => {
            await mutateAsync();
        }
        perfomAsync();
    }, [])

    const { isPending, mutateAsync } = useMutation({
        mutationFn: async () => {
            const result = await getLocations({ params: [id!] }, { cancelToken, queryParams: "" });
            if (typeof result === "string") console.log("Canceled");
            return (result as LocationResult).locations[0];
        },
        onSuccess: (data: Location) => {
            setLocation(data);
        },
        onError: (error: Error | null) => {
            setLocation(undefined);
        }
    })

    return (
        <>
            <Typography variant="h2" marginTop={isMobile ? 20 : 40}>Location-{id}</Typography>
            {
                location && <SingleItem location={location} />
            }
        </>
    );
}

export default SingleLocation;