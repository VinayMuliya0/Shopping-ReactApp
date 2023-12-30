import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { colors } from '../../style/colors';

const OrderItem = ({ orderList }) => {

    const [lessMore, setLessMore] = useState(false)


    const totalPrice = orderList?.cartList?.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    console.log(totalPrice);

    return (
        <>
            <Box className='order-item'
                sx={{
                    border: `1px solid ${colors.dark[100]}`,
                    padding: '20px 25px',
                    borderRadius: '12px',
                    backgroundColor: colors.dark[600]
                }}
            >
                <Typography variant="body2" color={colors.basics.white}>Order ID: #{orderList?.orderId}</Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                }}>
                    <Box className='product-list' mt='10px' sx={{ maxWidth: '300px', width: '100%' }}>
                        {orderList?.cartList?.map((item, num) => {
                            if (!lessMore && orderList?.cartList?.length > 1) {
                                return num === 0 ? (
                                    <Box key={num} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                    }}>
                                        <Box className='img-wrapper' sx={{
                                            '& img': {
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '5px',
                                                objectFit: 'cover',
                                                border: `1px solid ${colors.gray[500]}`
                                            }
                                        }}>
                                            <img src={item.thumbnail} width={50} height={50} alt="" />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color={colors.basics.white}>{item.title}</Typography>
                                            <Typography variant="caption" color={colors.basics.white}>{item.quantity} x ${item.price} <Typography variant="caption"
                                                sx={{
                                                    fontWeight: '400',
                                                    display: 'inline-block',
                                                    textDecoration: 'line-through',
                                                }}
                                                color={colors.gray[300]}>₹ {Math.round(item.price + (item.price * item.discountPercentage) / 100)}</Typography></Typography>
                                        </Box>
                                    </Box>
                                ) : null;
                            } else {
                                return (
                                    <Box key={num} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                    }}>
                                        <Box className='img-wrapper' sx={{
                                            '& img': {
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '5px',
                                                objectFit: 'cover',
                                                border: `1px solid ${colors.gray[500]}`
                                            }
                                        }}>
                                            <img src={item.thumbnail} width={50} height={50} alt="" />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color={colors.basics.white}>{item.title}</Typography>
                                            <Typography variant="caption" color={colors.basics.white}>{item.quantity} x ${item.price} <Typography variant="caption"
                                                sx={{
                                                    fontWeight: '400',
                                                    display: 'inline-block',
                                                    textDecoration: 'line-through',
                                                }}
                                                color={colors.gray[300]}>₹ {Math.round(item.price + (item.price * item.discountPercentage) / 100)}</Typography></Typography>
                                        </Box>
                                    </Box>
                                );
                            }
                        })}

                        {orderList?.cartList?.length > 1 && <Button variant="" sx={{
                            p: 0,
                            mt: '15px'
                        }} type='button' onClick={() => setLessMore(item => !item)} color={colors.basics.white}>{lessMore ? 'See Less' : `See ${orderList?.cartList?.length - 1} more`}</Button>}
                    </Box>
                    <Box sx={{
                        maxWidth: '350px',
                        width: '100%',
                    }}>
                        <Typography variant="h5" fontWeight={'500'} color="white">Address</Typography>
                        <Typography variant="body2" color={colors.gray[500]}>{orderList?.info?.address}, {orderList?.info?.city}-{orderList?.info?.pincode},{orderList?.info?.state}</Typography>
                        <Typography variant="body2" color="gray" pt='25px'>Product Shipped date &nbsp;<span style={{ color: colors.basics.white }}>{orderList.date}</span></Typography>
                        <Typography variant="body2" color="gray" pt='5px'>Product will Delivered in <span style={{ color: colors.basics.white }}>4 days</span></Typography>
                    </Box>
                    <Box sx={{
                        maxWidth: '300px',
                        width: '100%',
                        textAlign: 'end'
                    }}>
                        <Typography variant="body2" color="gray" pb='5px'>Delivery Status:- <span style={{ color: colors.basics.white }}> {!orderList.paymentType ? 'Done' : 'Pendding...'}</span></Typography>
                        <Typography variant="body2" color="gray" pb='20px'>Payment Type:- <span style={{ color: colors.basics.white }}> {!orderList.paymentType ? 'Online' : 'COD'}</span></Typography>
                        <Typography variant="body1" color="white">Total Payment</Typography>
                        <Typography variant="h4" color="white" fontWeight={'600'}>${totalPrice + Number(orderList?.shippingCharge) - Number(orderList.PromoDisc) + Number(orderList.gst)}</Typography>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default OrderItem
