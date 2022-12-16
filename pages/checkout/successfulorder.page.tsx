import { CardMedia, Container, Typography } from "@mui/material";
import { useCheckoutState } from "contexts/Context";
import Head from "next/head";

export default function SuccessFullOrder() {

    const { checkout, order } = useCheckoutState()

    return (

        <Container>
            <Head>
                <title>Marvel - Aproveite sua compra!</title>
            </Head>
            <Container sx={{
                width: '400px', height: '100px', margin: '15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#551dec', color: 'white', borderRadius: '35px'}}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h4"
                    component="div"
                >
                    Aproveite sua compra!
                </Typography>
            </Container >

            <Container sx={{ gap: '20px', margin: '20px', display: 'flex', flexDirection: 'column', width:"350px" }}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >
                    {order?.title}
                </Typography>

                <CardMedia sx={{ borderRadius: '25px', boxShadow:"20px -12px 13px -1px rgb(151 117 245)" }}
                    component="img"
                    width="52%"
                    height="250"
                    image={`${order?.path}.${order?.extension}`}
                    alt={order?.title}
                />

                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >Valor pago: R$ {order?.price}
                </Typography>

                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >
                    Comprador: {checkout.name} {checkout.lastname}
                </Typography>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >
                    Entregar no endereço: {checkout.address1}
                </Typography>


            </Container>

        </Container >
    )
}