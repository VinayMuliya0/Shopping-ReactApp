import { Box, Typography } from '@mui/material'
import React from 'react'
import Container from '../../Layout/Containre'
import { colors } from '../../../style/colors'
import Information from './Information'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { LeftArrow } from '../../../Images/Icons/icons'
import ShippingInfo from './ShippingInfo'
import PaymentMethod from './PaymentMethod'


const Checkout = () => {

    const promoDiscountStore = localStorage.getItem('promoDiscount')
    const navigate = useNavigate()
    const { cart, information } = useSelector(state => state.product)
    const [steps, setSteps] = useState(1);
    // const history = useHistory();
    let GST = 60
    let stateShipping = 20
    let distShipping = 10
    const promoCodeStore = localStorage.getItem('promoCode')
    const prodList = cart?.filter(ele => ele?.email === JSON.parse(localStorage.getItem('user'))?.email)[0]?.carts

    console.log('promoDiscountStore', promoDiscountStore);
    console.log('steps', steps);

    const totalPrice = cart?.filter(ele => ele?.email === JSON.parse(localStorage.getItem('user'))?.email)[0]?.carts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    const nextClick = (e) => {
        setSteps(e)
    }
    const backClick = (e) => {
        setSteps(e)
    }


    // const handleGoBack = () => {
    //     history.goBack(); // This will navigate to the previous page.
    // };

    useEffect(() => {
        if (promoDiscountStore !== null) {
            localStorage.removeItem('promoCode')
        }
        if (information.length !== 0) {
            localStorage.setItem('shippingCharge', information.state !== 'Gujarat' ? stateShipping : information.city !== 'Surat' ? distShipping : 0)
            localStorage.setItem('gst', GST)

            setSteps(2)
            console.log('information', information);
        }
    }, [ promoCodeStore, promoDiscountStore, information, stateShipping, distShipping, GST])

    return (
        <>
            <Box sx={{ minHeight: 'calc(100vh - 276px)', my: '30px', }}>
                <Container>
                    <Box
                        sx={{
                            '& svg': {
                                width: '30px',
                                height: 'auto',
                                marginBottom: '10px'
                            }
                        }}>
                        <Link to={'/cart'}><LeftArrow /></Link>
                    </Box>
                    <Typography variant="h4" mb={'30px'} color={colors.basics.white} fontWeight={'600'} >Checkout</Typography>
                    <Box className='step-wrapper'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '15px'
                        }}>
                        <Typography variant="body1" color={steps === 1 || steps === 2 || steps === 3 ? '#00bbff' : colors.basics.white}>Information &gt;</Typography>&nbsp;
                        <Typography variant="body1" color={steps === 2 || steps === 3 ? '#00bbff' : colors.basics.white}>Shipping &gt;</Typography>&nbsp;
                        <Typography variant="body1" color={steps === 3 ? '#00bbff' : colors.basics.white}>Payment</Typography>

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'self-start',
                        justifyContent: 'space-between',
                        '& > div': {
                            width: 'calc(50% - 20px)'
                        }
                    }}>
                        <Box className="box-wrapper" >
                            {steps === 1 && <Information nextClick={nextClick} />}
                            {steps === 2 && <ShippingInfo nextClick={nextClick} backClick={backClick} />}
                            {steps === 3 && <PaymentMethod nextClick={nextClick} backClick={backClick} />}

                        </Box>
                        <Box className="product-checklist">
                            <Typography variant="h5" mb={'30px'} color={colors.basics.white} fontWeight={'600'} >Order Summary</Typography>
                            <Box className="product-list"
                                sx={{
                                    borderBottom: `1px solid ${colors.gray[500]}`,
                                    paddingBottom: '15px'

                                }}>
                                {prodList?.map((item, index) => {
                                    return (
                                        <Box key={index} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            '&:not(:last-child)': {
                                                marginBottom: '15px',
                                            },

                                        }}>
                                            <Box className="img" sx={{
                                                position: 'relative',
                                                marginRight: '15px',
                                                '& img': {
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }
                                            }}>
                                                <Typography variant="caption"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        right: '-10px',
                                                        backgroundColor: '#00bbff',
                                                        width: '25px',
                                                        height: '25px',
                                                        borderRadius: '50px',
                                                        textAlign: 'center',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: colors.basics.black
                                                    }}>
                                                    {item.quantity > 9 ? <Typography variant="caption">9<sup>+</sup></Typography> : item.quantity}
                                                </Typography>
                                                <img src={item.thumbnail} alt="img" />
                                            </Box>
                                            <Box>
                                                <Typography variant="body1" onClick={() => { navigate(`/product/${item.id}`) }} sx={{ lineHeight: '1.2', cursor: 'pointer' }}>{item.title}</Typography>
                                                <Typography variant="caption" color={colors.gray[300]}>{item.brand}</Typography>
                                            </Box>
                                            <Box sx={{ width: 'fit-content', ml: 'auto' }}>
                                                <Typography variant="body1" sx={{ lineHeight: '1.2', fontWeight: '400' }}>{item.quantity} x ${item.price}</Typography>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box
                                className="total"
                                sx={{
                                    marginTop: '30px',
                                    maxWidth: '400px',
                                    marginLeft: 'auto',
                                    '& > div:not(:last-child)': {
                                        borderBottom: '1px solid #ddd',
                                        marginBottom: '10px',
                                        paddingBottom: '10px',
                                    },
                                    '& .cols': {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        '&:last-child': {
                                            borderBottom: '0',
                                            marginBottom: '0',
                                            paddingBottom: '0',
                                        }
                                    }
                                }}>
                                <Box className="cols">
                                    <Typography variant="body1" color="white">Subtotal</Typography>
                                    <Typography variant="body1" color="white">${totalPrice}</Typography>
                                </Box>
                                <Box className="cols">
                                    <Typography variant="body1" color="white">GST</Typography>
                                    <Typography variant="body1" color="white">${GST}</Typography>
                                </Box>
                                <Box className="cols">
                                    <Typography variant="body1" color="white">Shipping Charges</Typography>
                                    <Typography variant="body1" color="white">${information?.state !== 'Gujarat' ? stateShipping : information?.city !== 'Surat' ? distShipping : 0}</Typography>
                                </Box>
                                {promoDiscountStore  && <Box className={'cols'}>
                                    <Typography variant="body1" color="white">Promo code</Typography>
                                    <Typography variant="body1" color="white">{promoDiscountStore ? `-$${promoDiscountStore}`: '$0'}</Typography>
                                </Box>}
                                <Box className="cols">
                                    <Typography variant="body1" color="white">Grand Total</Typography>
                                    <Typography variant="body1" color="white"
                                        sx={{
                                            fontSize: '30px',
                                            fontWeight: '600'
                                        }}>${totalPrice + GST - Number(promoDiscountStore) + Number(information.state !== 'Gujarat' ? stateShipping : information.city !== 'Surat' ? distShipping : 0)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Checkout
