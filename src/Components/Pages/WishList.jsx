import { Box, Typography } from '@mui/material'
import React from 'react'
import { colors } from '../../style/colors'
import Container from '../Layout/Containre'
import { useSelector } from 'react-redux'
import WishListProduct from '../WishListProduct'

const WishList = () => {

    const { wishList } = useSelector(state => state.product)
    console.log("wishList:- ", wishList);
    return (
        <>
            <Box sx={{minHeight: 'calc(100vh - 276px)', my: '30px',}}>
                <Container>
                    <Typography variant="h4" mb={'30px'} color={colors.basics.white}>WishList</Typography>
                    <Box sx={{
                        display: wishList.length === 0 ? 'flex' : 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: '20px',
                        alignItems: wishList.length === 0 && 'center',
                        justifyContent: wishList.length === 0 && 'center',
                        minHeight: wishList.length === 0 && 'calc(100vh - 326px)'
                    }}>
                        {wishList && (
                            <>
                                {wishList.map((item) => (
                                    <>
                                        <WishListProduct item={item}></WishListProduct>
                                    </>
                                ))}
                            </>
                        )}
                        {wishList.length === 0 && <Typography variant="h5" sx={{ gridColumn: '1 / span 4', textAlign: 'center', color: "white" }} >Data not Found</Typography>}                        
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default WishList
