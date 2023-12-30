import React from 'react'
import Typography from '@mui/material/Typography'
import { colors } from '../../../style/colors'
import Container from '../../Layout/Containre'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import OrderItem from '../OrderItem'

const OrderList = () => {
    const {  orderList } = useSelector(state => state.product)
    const localUser = JSON.parse(localStorage.getItem('user')).email
    const userOrderDetails = orderList.filter(ele => ele?.email === localUser)[0]?.orders
    console.log('orderList', orderList);
    console.log('userOrderDetails', userOrderDetails);

    return (
        <>
            <Box sx={{ minHeight: 'calc(100vh - 276px)', my: '30px', }}>
                <Container>
                    <Typography variant="body1" color={colors.basics.white}>Order List</Typography>

                    <Box className='oderList-wrapper' mt='30px'>
                            {userOrderDetails?.length !== 0 ?
                                userOrderDetails?.map((orderItem, index) => {
                                    return (
                                        <Box key={index} mb={'15px'}>
                                            <OrderItem orderList={orderItem} />
                                        </Box>
                                    )
                                })
                                :
                                <Box>
                                    <Typography variant="body1" color={colors.basics.white}>No Recodes</Typography>
                                </Box>
                            }
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default OrderList
