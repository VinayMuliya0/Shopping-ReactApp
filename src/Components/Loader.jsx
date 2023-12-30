import { Box, Typography } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="caption" sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'inline-block',
                    borderTop: '3px solid #fff',
                    borderRight: '3px solid transparent',
                    animation: 'rotation 1s linear infinite',
                }}></Typography>
            </Box>
        </>
    )
}

export default Loader
