import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCharacters } from "../../../network";
import { MyContext } from "../../../components/context/MyContext/MyContext";
import { Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import SingleItem from "../../../components/singleItem";
import { Character, CharacterResult } from "../../../network/response/character.dto";

const SingleCharacter = () => {

    const [character, setCharacter] = useState<Character>();
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
            const result = await getCharacters({ params: [id!] }, { cancelToken, queryParams: "" });
            if (typeof result === "string") console.log("Canceled");
            return (result as CharacterResult).characters[0];
        },
        onSuccess: (data: Character) => {
            setCharacter(data);
        },
        onError: (error: Error | null) => {
            setCharacter(undefined);
        }
    })

    return (
        <>
            <Typography variant="h2" marginTop={isMobile ? 20 : 40}>Location-{id}</Typography>
            {
                character && <SingleItem character={character} />
            }
        </>
    );
}

export default SingleCharacter;