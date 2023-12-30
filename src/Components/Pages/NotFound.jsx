import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from '../../style/colors';

const NotFound = () => {
    return (
        <Box sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            // minHeight: 'calc(100vh - 256px)',
            minHeight: 'calc(100vh - 61px)',
            padding: '20px',
            '& .btn': {
                fontSize: '16px',
                backgroundColor: colors.basics.white,
                color: colors.basics.black,
                borderRadius: 8,
                textTransform: 'capitalize',
                textDecoration: 'none',
                padding: '10px 35px',
                display: 'block',
                width: 'fit-content',
                margin: '0 auto',
                marginTop: '20px',
                fontWeight: '600',
            }
        }}>
            <Typography variant='h1' sx={{ mb: '10px', fontSize: '40px' }}>404 - Page Not Found</Typography>
            <Typography variant='subtitle1' sx={{ fontSize: '16px' }}>The page you are looking for does not exist.</Typography>
            <Link to="/" className='btn'>Home Page</Link>
        </Box>
    );
};

export default NotFound;