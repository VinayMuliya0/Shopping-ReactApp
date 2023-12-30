import React, { useState } from 'react'
import { Box, Button, FormControlLabel, TextField, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { images } from '../../Images/Image/image'
import TextInput from '../TextInput'
import { Eye, EyeHidden, Google } from '../../Images/Icons/icons'
import { useFormik } from 'formik'
import { colors } from '../../style/colors'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userAdded } from '../../redux/features/signup/signupSlice'

const SignIn = () => {
    const [password, setPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { signup } = useSelector(state => state)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values) => {
            // console.log("values:- ", values);
            const datasd = signup.entities.find(person => person.email === values.email && person.password === values.password)
            console.log('SignUn Datas:- ', signup.entities);
            // console.log("find datasd", datasd);
            if (datasd) {
                localStorage.setItem('user', JSON.stringify({ 'email': values.email, 'logged': true, 'username': datasd.username, phone: datasd.number}))
                setTimeout(() => {
                    navigate(`/`)
                }, 600);
            } else {
                alert('Invalid Credential')
            }
        },
        validate: (values) => {
            // console.log(values, ":::")
            let errors = {};


            if (!values.email) {
                errors.email = 'Enter User-name or Email';
            }

            if (!values.password) {
                errors.password = 'Please enter the password';
            }
            return errors;
        }
    });
    const dummyUserHandle = () => {

        const initialValues = {
            username: "Vinay",
            email: "vinay.muliya@tecocraft.com",
            password: "12345678",
            number: '7984011042',
            info: {
                "address": "",
                "state": "",
                "city": "",
                "pincode": ''
            }
        }
        const userIs = signup.entities.some(ele => ele.email === initialValues.email)
        console.log('userIs', userIs);
        localStorage.setItem('user', JSON.stringify({ email: 'vinay.muliya@tecocraft.com', logged: true, username: 'Vinay', phone: '7984011042' }))
        if(!userIs) {
            dispatch(userAdded(initialValues))
        }
        setTimeout(() => {
            navigate(`/`)
        }, 600);
    }


    return (
        <>

            <form onSubmit={formik.handleSubmit}>
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
                            Sign In
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type='email'
                            placeholder="Email Or User name"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        // onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.email}</Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextInput
                            name="password"
                            type={password ? 'text' : 'password'}
                            style={{
                                '& .MuiInputAdornment-root': {
                                    mx: '10px',
                                    height: '100%',
                                },
                                '& svg': {
                                    width: '24px',
                                    height: '24px',
                                }
                            }}
                            EndIcon={
                                <Box sx={{ cursor: 'pointer' }} onClick={() => { setPassword((show) => !show) }}>
                                    {password ? <Eye /> : <EyeHidden />}
                                </Box>
                            }
                            value={formik.values.password}
                            placeholder="Password"
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.password}</Typography>
                        ) : null}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: { sm: 'row', xs: 'column' },
                            '& .link-tag': {
                                color: colors.basics.white,
                                textDecoration: 'none',
                                fontWeight: '500'
                            }
                        }} >
                        <FormControlLabel
                            sx={{
                                ml: '0',
                                mr: '0',
                                mb: { sm: '0', xs: '10px' },
                                '& .MuiButtonBase-root': {
                                    p: '0px',
                                    mr: '12px'
                                },
                                '& .MuiTypography-root': {
                                    fontSize: '16px'
                                },
                                '& .MuiButtonBase-root path': {
                                    fill: "#fff"
                                }
                            }}
                            control={<Checkbox defaultChecked />} label="Remind Me"
                        />
                        <NavLink className='link-tag' to='/forgotpassword'>Forgot Password?</NavLink>
                    </Box>
                    <Box sx={{ textAlign: 'center', my: '30px' }}>
                        <Button variant='whiteBtn' type='submit'>Submit</Button>
                    </Box>
                    <Box sx={{ textAlign: 'center', my: '30px' }}>
                        <Button variant='outlined' type='button' onClick={dummyUserHandle} sx={{
                            padding: '10px 35px',
                            '& svg': {
                                width: '30px',
                                height: 'auto',
                                marginRight: '20px'
                            }
                        }}><Google /> Continue with Google </Button>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="white"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: '0',
                                color: colors.gray[500],
                                '& .link-tag': {
                                    color: colors.basics.white,
                                    textDecoration: 'none',
                                }
                            }}
                        >You don't have an account? <NavLink className='link-tag' to='/signup'>Sign Up</NavLink></Typography>
                    </Box>
                </Box>
            </form>
        </>

    )
}

export default SignIn