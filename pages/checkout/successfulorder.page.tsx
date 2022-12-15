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
                width: '500px', height: '100px', margin: '20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00a000', color: 'white',
                borderRadius: '30px'
            }}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h4"
                    component="div"
                >
                    Aproveite sua compra!
                </Typography>
            </Container >

            <Container sx={{ gap: '20px', margin: '20px', display: 'flex', flexDirection: 'column' }}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >
                    {order?.title}
                </Typography>

                <CardMedia sx={{ borderRadius: '30px' }}
                    component="img"
                    height="500"
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