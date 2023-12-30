import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { images } from '../../Images/Image/image'
import OTPInput from 'react-otp-input';
import { colors } from '../../style/colors';
import { useNavigate } from 'react-router-dom';

const OtpVerify = () => {
    const [otpValue, setOtpValue] = useState('');
    const navigate = useNavigate()
    const Otp = localStorage.getItem('otp')
    const submitForm = () => {
        if(otpValue === Otp) {
            navigate(`/resetpassword`)
            localStorage.removeItem('otp')
            localStorage.setItem('setPassword',true)
        } else {
            alert('Invalid OTP')
        }
    }
    console.log(Otp === null);
    useEffect(() => {
      if(Otp === null || Otp === false) {
        navigate('/signin')
      }
        
    })
    

    return (
        <>
            <form>
                <Box sx={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '30px',
                    backgroundColor: '#000',
                }}>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <img src={images.logoText} width={150} alt="" />
                    </Box>
                    <Box>
                        <Typography variant="h1" color="white"
                            sx={{
                                textAlign: 'center',
                                fontSize: '30px',
                                display: 'block',
                                mb: '20px',
                            }}>
                            OTP Verification
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center',
                            my: '30px',
                            '& > div' :{
                                justifyContent:'center'
                            },
                            '&  input' :{
                                width:"50px !important",
                                height:'50px',
                                borderRadius:'8px',
                                background:colors.dark[100],
                                border:'0',
                                color:colors.basics.white,
                                fontSize:'20px',
                                mr:'15px',
                                '&:last-child': {
                                    mr:0
                                }
                            }
                        }}
                    >
                        <OTPInput
                            value={otpValue}
                            onChange={setOtpValue}
                            numInputs={4}
                            renderSeparator={<></>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </Box>
                    <Box sx={{ textAlign: 'center', my: '30px' }}>
                        <Button variant='whiteBtn' onClick={submitForm} disabled={otpValue.length >3? false: true} >Submit</Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default OtpVerify
