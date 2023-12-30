import React from 'react'
import { Box, Button } from '@mui/material';

const QutBox = ({ plusQut, minusQut, qut }) => {

    return (
        <>
            <Box className='qut-box' sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 0'
            }}>
                <Button variant="text" onClick={plusQut} sx={{ fontSize: '26px', width: '40px', padding: '8px', maxHeight: 'fit-content', display: 'block', flexShrink: '0', backgroundColor: '#00bbff42' }}>
                    +
                </Button>

                <Box sx={{
                    backgroundColor: '#f2f2f2',
                    color: '#000',
                    fontWeight: '500',
                    maxWidth: '60px',
                    width: '100%',
                    height: '40px',
                    lineHeight: '40px',
                    textAlign: 'center',
                    borderRadius: '8px',
                }}>
                    {qut}
                </Box>
                <Button variant="text" onClick={minusQut} sx={{ fontSize: '26px', width: '40px', padding: '8px', maxHeight: 'fit-content', display: 'block', flexShrink: '0', backgroundColor: '#00bbff42' }}>
                    -
                </Button>
            </Box>
        </>
    )
}

export default QutBox
