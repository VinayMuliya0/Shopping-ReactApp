import { Box, Typography } from '@mui/material'
import React from 'react'
import { images } from '../../Images/Image/image'
import { colors } from '../../style/colors'
import { Link } from 'react-router-dom'
import Container from '../Layout/Containre'

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Box className='logo-wrapper' sx={{ display: 'flex', flexDirection: {sm:'row',xs: 'column'}, alignItems: 'start' }}>
            <img src={images.logoText} width={150} height={73} alt="Logo-Text" />
            <Box sx={{ maxWidth: '300px', marginLeft: {sm:'15px'}, marginTop: {sm:'0',xs:'15px'} }}>
              <Typography variant="subtitle1" sx={{ fontWeight: '400' }} color={colors.basics.white}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non aperiam ad dolore a? Quo, saepe!</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Box
              sx={{
                '& ul': {
                  listStyle: 'none',
                  padding: '0',
                  display: 'flex',
                  margin: '20px 0 0',
                  '& a': {
                    color: colors.basics.white,
                    textDecoration: 'none',
                    marginRight: '20px'
                  }
                }
              }}
            >
              <ul>
                <li>
                  <Link to={'/'}>Home</Link>
                </li>
                <li>
                  <Link to={'/'}>About</Link>
                </li>
                <li>
                  <Link to={'/'}>Lists</Link>
                </li>
                <li>
                  <Link to={'/'}>Contact Us</Link>
                </li>
              </ul>
            </Box>
          </Box>
        </Container>
      </footer>
    </>
  )
}

export default Footer