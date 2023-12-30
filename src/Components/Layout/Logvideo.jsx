import { Box } from '@mui/material'
import React from 'react'
import { images } from '../../Images/Image/image'

const LogVideo = ({ children }) => {

    return (
        <>
            <Box sx={{
                display: 'flex',
                minHeight: '100vh',
                '& > img': {
                    position: 'fixed',
                    left: '0',
                    top: '0',
                    width: { sm: '50%', xs: '100%' },
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    zIndex: '0',

                }
            }}>
                <img src={images.lighthouse} alt="img" />
                {/* <video width="320" height="240" autoPlay muted loop>
                    <source src='https://media.istockphoto.com/id/1413207061/video/road-traffic-in-delhi-roads.mp4?s=mp4-640x640-is&k=20&c=KnGos4ZVgHxZSV-zGAJk0mWsjR2kLGumoVcKI-PanEw=' type="video/mp4" />
                </video> */}
                <Box sx={{
                    marginLeft: 'auto',
                    position: 'relative',
                    width: { sm: '50%', xs: '100%' },
                    '& form': {
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: { sm: 'auto', xs: '0 20px' },
                    }
                }}>
                    {children}
                </Box>
            </Box>
        </>
    )
}

export default LogVideo
