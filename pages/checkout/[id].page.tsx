import { Button, CardMedia, Container, Input, InputLabel, TextField, Typography } from "@mui/material";
import { getComic } from "dh-marvel/services/marvel/marvel.service"
import { Comic } from "shared/types/apiSchema"
import { FormControl } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "shared/yupValidations/schemas";
import { useCheckout } from "dh-marvel/services/checkout/checkout.service";
import { success } from "helpers/notify/success";
import { useCheckoutDispatch, useCheckoutState } from "contexts/Context";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { formatCEP } from "utils/formatters/formatCEP";
import { formatCreditCardAddSpace } from "utils/formatters/formatCreditCArdAddSpace";
import { formatCreditCardExpiration } from "utils/formatters/formatCreditCardExpiration";


export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "10200" } }],
        fallback: true
    };
}
export async function getStaticProps({ params }: any) {

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



export default function Checkout({ data }: PropsDetails) {

    const comic = data;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { mutate: createCheckout } = useCheckout()
    const router = useRouter()
    const { checkout } = useCheckoutState()
    const { registerCheckout, registerOrder } = useCheckoutDispatch()

    const onSubmit = (data: any) => {
        createCheckout(data, {
            onSuccess: () => {
                success("Compra realizada com sucesso!")
                registerCheckout(data)
                registerOrder({
                    title: comic.title,
                    price: comic.price,
                    path: comic.thumbnail.path,
                    extension: comic.thumbnail.extension
                })
                router.push('successfulorder')

                console.log(checkout)
            }

        })

    }

    useEffect(() => {
        console.log(checkout)
    }, [checkout])


    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Marvel - Checkout</title>
            </Head>

            <Container sx={{
                marginTop: '10px', width: '50%', margin: '0px auto', display: 'flex', flexDirection: 'column'
            }}>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ marginTop: '20px', gap: '10px' }}>
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                    >
                        Preencha seus dados pessoais:
                    </Typography>
                    <TextField {...register("name")} id="name" label="Nome" variant="outlined" />

                    {errors.name?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.name?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("lastname")} id="lastname" label="Sobrenome" variant="outlined" />

                    {errors.lastname?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.lastname?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("email")} id="email" label="E-mail" variant="outlined" />
                    {errors.email?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.email?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("address1")} id="address1" label="Endereço" variant="outlined" />
                    {errors.address1?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.address1?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("address2")} id="address2" label="Complemento" variant="outlined" />
                    <TextField {...register("city")} id="city" label="Cidade" variant="outlined" />
                    {errors.city?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.city?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("state")} id="state" label="Estado" variant="outlined" />
                    {errors.state?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.state?.message}`}
                        </Typography>
                        : ''}
                    <TextField  {...register('zipCode', {
                        onChange: e => {
                            setValue('zipCode', formatCEP(e.target.value));
                        },
                    })}
                        id="zipCode" label="CEP" variant="outlined" />
                    {errors.zipCode?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.zipCode?.message}`}
                        </Typography>
                        : ''}
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                    >
                        Dados para pagamento:
                    </Typography>

                    <TextField {...register('number', {
                        onChange: e => {
                            setValue('number', formatCreditCardAddSpace(e.target.value));
                        },
                    })} id="number" label="Número cartão" variant="outlined" />
                    {errors.number?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.number?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("nameOnCard")} id="nameOnCard" label="Nome no cartão" variant="outlined" />
                    {errors.nameOnCard?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.nameOnCard?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register('expDate', {
                        onChange: e => {
                            setValue('expDate', formatCreditCardExpiration(e.target.value));
                        },
                    })} id="expDate" label="Data de validade" variant="outlined" />
                    {errors.expDate?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.expDate?.message}`}
                        </Typography>
                        : ''}


                    <TextField {...register("cvc")} id="cvc" label="Código de segurança" variant="outlined" />
                    {errors.cvc?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.cvc?.message}`}
                        </Typography>
                        : ''}
                    <Button type="submit" variant="contained">Finalizar compra</Button>
                </FormControl>
            </Container >
            <Typography
                gutterBottom
                noWrap
                variant="h4"
                component="div"
            >
                Produtos:
            </Typography>

            <Container sx={{ margin: '20px', display: 'flex', flexDirection: 'row' }}>
                <CardMedia sx={{ width: '250px', borderRadius: '50px', boxShadow:"20px -12px 13px -1px rgb(151 117 245)"  }}
                    component="img"
                    height="200"
                    image={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                    alt={comic?.title}
                />

                <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                    >
                        {comic?.title}
                    </Typography>

                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                    >Preço: R$ {comic?.price}</Typography>

                </Container>

            </Container>


        </Container >
    )
}