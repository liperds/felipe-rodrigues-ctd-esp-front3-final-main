import { Button, CardMedia, Container, Typography } from "@mui/material";
import { getComic } from "dh-marvel/services/marvel/marvel.service"
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router"
import { Comic } from "shared/types/apiSchema"


export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "10200" } }],
        fallback: true
    };
}
export async function getStaticProps({ params }: any) {
    /* const { query } = useRouter() */
    const data = await getComic(Number(params.id))

    return {
        props: {
            data
        }
    }
}

type PropsDetails = {
    data: Comic

}



export default function ComicDetail(props: PropsDetails) {
    const data = props
    const comic = data?.data;



    console.log(data)
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Marvel - Comic</title>
            </Head>

            <Typography
                gutterBottom
                noWrap
                variant="h3"
                component="div"
            >
                {comic?.title}
            </Typography>
            <CardMedia
                component="img"
                height="350"
                image={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                alt={comic?.title}
            />
            <Typography
                gutterBottom
                noWrap
                variant="h5"
                component="div"
            >PRICE: $ {comic?.price}</Typography>
            {comic?.stock > 0 ?
                <Link href={`/checkout/${comic.id}`}>
                    <Button variant="contained">Comprar</Button>
                </Link>
                : <Typography
                    gutterBottom
                    noWrap
                    variant="h6"
                    component="div"
                >SEM ESTOQUE!!</Typography>
            }
            <Typography
                sx={{ margin: '10px 0', color: 'red' }}
                gutterBottom
                noWrap
                variant="h5"
                component="div"
            >CHARACTERS: </Typography>
            {comic?.characters.items.map((item) => (
                <Link href={`/characters/${item.resourceURI.split("characters/").pop()}`}>
                    <Typography key={item.name}
                        sx={{ cursor: 'pointer' }}
                        gutterBottom
                        noWrap
                        variant="h6"
                        component="div"
                    >{item.name}</Typography>
                </Link>

            ))}



        </Container>
    )
}