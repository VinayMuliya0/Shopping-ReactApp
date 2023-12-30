import { Box } from '@mui/material'
import React from 'react'

const Container = ({children}) => {
    return (
        <>
            <Box sx={{maxWidth:{xl:'1170px',lg:'991px',md:'962px',sm:'570px',xs:'100%'},margin:'auto',padding:'0 15px'}} className='container'>
                {children}
            </Box>
        </>
    )
}

export default Container
