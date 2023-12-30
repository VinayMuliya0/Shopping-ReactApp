import { Box, Typography, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { colors } from '../../../style/colors'
import { useSelector } from 'react-redux'
import { Edit } from '../../../Images/Icons/icons'
import { useNavigate } from 'react-router-dom'

const ShippingInfo = ({  nextClick, backClick}) => {
    const navigate = useNavigate();
    const { cart,information } = useSelector(state => state.product);
    console.log(information);
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/')
        }
        if(information.length === 0 ) {
            backClick(1)
        }
    }, [cart.length, navigate, backClick, information.length])
    

    return (
        <>
            <Box>
                <Box sx={{ marginBottom: '30px' }}>
                    <Typography variant="body1" color={colors.basics.white}>Contact Id <Button variant="text" type='button' onClick={() => backClick(1)} color="primary" sx={{ padding: '0', float: 'right', '& svg': { width: '20px' } }}><Edit /></Button></Typography>
                    <Typography variant="body2"
                        sx={{
                            color: colors.basics.white,
                            bgcolor: colors.dark[200],
                            padding: '10px 15px',
                            minWidth: '450px',
                            borderRadius: '8px',
                            marginTop: '10px'
                        }}>{information.email}</Typography>
                </Box>
                <Box sx={{ marginBottom: '30px' }}>
                    <Typography variant="body1" color={colors.basics.white}>Address <Button variant="text" type='button' onClick={() => backClick(1)} color="primary" sx={{ padding: '0', float: 'right', '& svg': { width: '20px' } }}><Edit /></Button></Typography>
                    <Typography variant="body2"
                        sx={{
                            color: colors.basics.white,
                            bgcolor: colors.dark[200],
                            padding: '10px 15px',
                            minWidth: '450px',
                            borderRadius: '8px',
                            marginTop: '10px',
                            minHeight: '100px'
                        }}>
                        {information.address}, &nbsp;
                        {information.city}-
                        {information.pincode}, &nbsp;
                        {information.state}
                    </Typography>

                </Box>
                <Box sx={{ gridArea: '7 / span 2' }}>
                    <Button variant="outlined" type='submit' sx={{marginRight: '15px'}} onClick={() => { backClick(1) }} color="primary">Back</Button>
                    <Button variant="outlined" type='submit' onClick={()=>{nextClick(3)}} color="primary">Next</Button>
                </Box>
            </Box>

        </>
    )
}

export default ShippingInfo
