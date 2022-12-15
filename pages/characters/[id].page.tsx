import { Button, CardMedia, Container, Typography } from "@mui/material";
import { getCharacter } from "dh-marvel/services/marvel/marvel.service"
import Head from "next/head";
import { Comic, Character } from "shared/types/apiSchema"


export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "10200" } }],
        fallback: true
    };
}
export async function getStaticProps({ params }: any) {

    const data = await getCharacter(Number(params.id))

    return {
        props: {
            data
        }
    }
}

type PropsDetails = {
    data: Character

}



export default function CharacterDetail({ data }: PropsDetails) {

    const character = data;



    console.log(character)
    return (
        <Container>

            <Head>
                <title>Marvel - Personagens!</title>
            </Head>
            <Typography
                gutterBottom
                noWrap
                variant="h3"
                component="div"
            >
                {character?.name}
            </Typography>
            <CardMedia
                component="img"
                height="350"
                image={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
                alt={character?.name}
            />
            <Typography
                gutterBottom
                noWrap
                variant="subtitle1"
                component="div"
            >
                {character?.description}
            </Typography>




        </Container>
    )
}