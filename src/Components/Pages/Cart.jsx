import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Container from '../Layout/Containre'
import { colors } from '../../style/colors'
import { useSelector } from 'react-redux'
import { Trash } from '../../Images/Icons/icons'
import CartTableRow from '../CartTableRow'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const promoDiscountStore = localStorage.getItem('promoDiscount');
    const promoCodeStore = localStorage.getItem('promoCode');
    const { cart } = useSelector(state => state.product);
    const [promoCode, setPromoCode] = useState();
    const [discount, setDiscount] = useState(localStorage.getItem('promoDiscount') !== null ? true : false);
    const navigate = useNavigate();
    const promocode = localStorage.getItem('promoCode');
    let localUser = JSON.parse(localStorage.getItem('user')).email;
    // const plusQut = () => {
    //     setQnt(Number(qnt) + 1)
    // }
    // const minusQut = () => {
    //     if (qnt > 1) {
    //         setQnt(Number(qnt) - 1)
    //     }
    // }
    const checkPromoHandle = () => {
        if (promoCode === promoCodeStore) {
            setDiscount(true)
            localStorage.setItem('promoDiscount', 20)
            localStorage.removeItem('promoCode')
        }
    }
    const totalPrice = cart?.filter(ele => ele?.email === localUser)[0]?.carts.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    const goToShopHandle = () => {
        navigate('/')
    }
    console.log('cart', cart)


    console.log('totalPrice:-', totalPrice);
    const checkoutHandle = () => {
        if (promocode === promoCode) {
            console.log('true');
            localStorage.setItem('promoDiscount', 20);
            navigate('/checkout')
        } else {
            navigate('/checkout')
            console.log(false);
            // localStorage.setItem('promoDiscount', 0);
        }
    }
    useEffect(() => {
        const logs = localStorage.getItem('promoCode')
        const logs2 = localStorage.getItem('promoDiscount')
        console.log('logs', logs, 'logs2', logs2);
        if (localStorage.getItem('promoCode') === null && localStorage.getItem('promoDiscount') === null) {
            // Store promoCode in local storage when it doesn't exist
            const generatePromoCode = () => {
                const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                let promoCode = '';
                for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    promoCode += characters[randomIndex];
                }
                return promoCode;
            }
            const promocode = generatePromoCode();
            localStorage.removeItem('promoDiscount');
            localStorage.setItem('promoCode', promocode);
        }
    }, []);

    console.log(cart?.filter(ele => ele?.email === localUser));



    return (
        <>
            <Box sx={{ minHeight: 'calc(100vh - 276px)', my: '30px', }}>
                <Container>
                    <Typography variant="h4" mb={'30px'} color={colors.basics.white}>Your Cart</Typography>
                    {cart?.filter(ele => ele?.email === localUser)?.length === 0 ?
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body1" sx={{ mb: '25px' }} >Your cart is empty</Typography>
                            <Button variant="outlined" onClick={goToShopHandle} color="primary" >Shop</Button>
                        </Box>
                        :
                        <>
                            <Box className='table-section'
                                sx={{
                                    border: '1px solid #fff',
                                    borderRadius: '8px',
                                    '& table td, & table th': {
                                        color: colors.basics.white
                                    }
                                }}>
                                <TableContainer>

                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>No.</TableCell>
                                                <TableCell>Image</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Total</TableCell>
                                                <TableCell><Trash /></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(cart?.filter(ele => ele?.email === JSON.parse(localStorage.getItem('user'))?.email)[0]?.carts)?.map((item, index) => {
                                                
                                                return (
                                                    <>
                                                        <CartTableRow item={item} index={index} key={index} />

                                                        {/* <TableRow sx={{ '&:last-child td': { border: 0 } }}>
                                                                <TableCell>{index}</TableCell>
                                                                <TableCell><img src={item.thumbnail} width={60} height={60} alt="product-img" /></TableCell>
                                                                <TableCell>{item.title}</TableCell>
                                                                <TableCell>${item.price}</TableCell>
                                                                <TableCell><QutBox plusQut={plusQut} qut={qnt} minusQut={minusQut} /></TableCell>
                                                                <TableCell>protein</TableCell>
                                                                <TableCell>protein</TableCell>
                                                            </TableRow> */}
                                                    </>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    '& .cols': {
                                        marginBottom: '10px',
                                        paddingBottom: '10px',
                                        borderBottom: '1px solid #ddd',
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
                                <Box>
                                    {!discount && <Box className={discount && 'cols'} sx={{ mt: '30px' }}>
                                        <Typography variant="body1" color="white">Apply promo code if you have</Typography>
                                        <Box className="">
                                            <>

                                                <TextField
                                                    id=""
                                                    placeholder='Your Promo code'
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    inputProps={{
                                                        maxLength: 6,
                                                        onInput: (e) => {
                                                            e.target.value = e.target.value.slice(0, 6);
                                                        }
                                                    }}
                                                    sx={{
                                                        maxWidth: '100%',
                                                        border: '1px solid #787878',
                                                        borderRadius: '5px',
                                                        margin: '8px 0',
                                                        '& .MuiInputBase-input ': {
                                                            padding: '8px 15px',
                                                            textAlign: 'center',
                                                            textTransform: 'uppercase'
                                                        }
                                                    }} />
                                                <Button type='button' onClick={checkPromoHandle} variant='outlined'>Apply</Button>
                                            </>



                                        </Box>
                                    </Box>}
                                </Box>

                                <Box
                                    className="total"
                                    sx={{
                                        marginTop: '30px',
                                        maxWidth: '400px',
                                        width: '100%',
                                        marginLeft: 'auto',
                                        '& .cols': {
                                            marginBottom: '10px',
                                            paddingBottom: '10px',
                                            borderBottom: '1px solid #ddd',
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
                                        <Typography variant="body1" color="white">${60}</Typography>
                                    </Box>
                                    {discount && <Box className={discount && 'cols'}>
                                        <Typography variant="body1" color="white">Promo code</Typography>
                                        <Typography variant="body1" color="white">-${promoDiscountStore}</Typography>
                                    </Box>}
                                    <Box className="cols">
                                        <Typography variant="body1" color="white">Grand Total</Typography>
                                        <Typography variant="body1" color="white"
                                            sx={{
                                                fontSize: '30px',
                                                fontWeight: '600'
                                            }}>${totalPrice + 60}</Typography>
                                    </Box>
                                    {/* <Box className="cols">
                                    <Typography variant="body1" color="white">Promo code</Typography>
                                    <TextField
                                        id=""
                                        placeholder='Your Promo code'
                                        onChange={(e)=>setPromoCode(e.target.value)}
                                        sx={{
                                            maxWidth: '200px',
                                            border: '1px solid #787878',
                                            borderRadius: '5px',
                                            margin: '8px 0',
                                            '& .MuiInputBase-input ': {
                                                padding: '8px 15px',
                                                textAlign: 'center',
                                                textTransform: 'uppercase'
                                            }
                                        }}
                                    />
                                </Box>   */}
                                    <Box sx={{ textAlign: 'end', mt: '30px' }}>
                                        <Button variant="outlined" onClick={checkoutHandle} color="primary">Checkout</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    }
                </Container>
            </Box>
        </>
    )
}

export default Cart
