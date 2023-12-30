import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { images } from '../../Images/Image/image'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { colors } from '../../style/colors'
import { BackArrow } from '../../Images/Icons/icons'
import { useSelector } from 'react-redux'



const ForgotPassword = () => {

    const {signup} = useSelector(state=> state);
    console.log("Forgot signup",signup);

    const navigate = useNavigate()
    let val = [];
    for(let i = 0; i < 4; i++) {
        const rndv = Math.floor(Math.random(1)*10)
        if(i === 0 && rndv === 0) {
            val.push(rndv + 1);
        }else {
            val.push(rndv);
        }
    }
    const OTP = Number(val.map( (e) => (e) ).join(''))
    
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values) => {
            const emailVefy = signup.entities.find(state => state.email === values.email)
            const emailVefyIndex = signup.entities.findIndex(state => state.email === values.email)
            console.log(signup.entities); 
            console.log(emailVefyIndex); 
            if (emailVefy) {
                console.log('OTP sent, Check at local storage')
                localStorage.setItem('otp', OTP)
                console.log('otp', OTP)
                localStorage.setItem('forgotUser', JSON.stringify(values.email))
                setTimeout(() => {
                    navigate(`/otpverify`)

                }, 600);
            } else {
                formik.setFieldError('email', 'Email Address is not exist')
                // alert('Email Address is not exist')
            }
        },
        validate: (values) => {
            console.log(values, ":::")
            let errors = {};

            if (!values.email) {
                errors.email = 'Enter User-name or Email';
            }

            return errors;
        }
    });


    return (
        <>
            <form style={{ position: 'relative' }} onSubmit={formik.handleSubmit}>
                <Box sx={{
                    '& a': {
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        '& svg' :{
                            width:'30px',
                            height: 'auto'
                        }

                    }
                }}>
                    <Link to={'/signin'}>
                        <BackArrow />
                    </Link>
                </Box>
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
                            Forgot Password
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type='text'
                            placeholder="Email Or User name"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.email}</Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ textAlign: 'center', my: '30px' }}>
                        <Button variant='whiteBtn' type='submit'>Submit</Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default ForgotPassword
