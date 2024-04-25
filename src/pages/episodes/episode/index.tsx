import { useContext, useEffect, useState } from "react";
import { Episode, EpisodeResult } from "../../../network/response/episode.dto";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getEpisodes } from "../../../network";
import { MyContext } from "../../../components/context/MyContext/MyContext";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import SingleItem from "../../../components/singleItem";

const SingleEpisode = () => {

    const [episode, setEpisode] = useState<Episode>();
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
            const result = await getEpisodes({ params: [id!] }, { cancelToken, queryParams: "" });
            if (typeof result === "string") console.log("Canceled");
            return (result as EpisodeResult).episodes[0];
        },
        onSuccess: (data: Episode) => {
            setEpisode(data);
        },
        onError: (error: Error | null) => {
            setEpisode(undefined);
        }
    })

    return (
        <>
            <Typography variant="h2" marginTop={isMobile ? 20 : 40}>Episode-{id}</Typography>
            {
                episode && <SingleItem episode={episode} />
            }
        </>
    );
}

export default SingleEpisode;