import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { images } from '../../Images/Image/image'
import TextInput from '../TextInput'
import { Eye, EyeHidden } from '../../Images/Icons/icons'
import { useFormik } from 'formik'
import { colors } from '../../style/colors'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userAdded } from '../../redux/features/signup/signupSlice'

const SignUp = () => {
    const [password, setPassword] = useState(false)
    const selector = useSelector(state => state)


    console.log('selector:-', selector)
    // debugger
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            number: "",
            info: {
                "address": "",
                "state": "",
                "city": "",
                "pincode": ''
            }
        },
        onSubmit: (values) => {
            // const localData = [localStorage.getItem('user') , JSON.stringify(values)]
            // console.log(localData);
            // dispatch(setSignupState(values))
            if (selector.signup.entities.find(state => state.email === values.email)) {
                alert('Email is already exist')
                console.log('lgs:-', selector.signup.entities.includes(values.email))
            } else {
                console.log(values.email);
                dispatch(userAdded(values))
                navigate(`/signin`)
            }
            // debugger
        },
        validate: (values) => {
            // console.log("values:- ",values)
            let errors = {};

            if (!values.username) {
                errors.username = 'Please enter the username';
            } else if (values.username.length > 20) {
                errors.username = 'Enter the short username';
            } else if (values.username.length < 3) {
                errors.username = 'Name is to short username';
            }

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Please enter the password';
            } else if (values.password.length < 8) {
                errors.password = 'Enter min 8 characters';
            }

            if (!values.number) {
                errors.number = 'Please enter the number';
            } else if (values.number.toString().length < 10) {
                errors.number = 'Enter Valid number';
            }

            return errors;
        }
    });


    console.log('values.password.length',formik.values.number.toString().length)

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
                            Sign Up
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextInput
                            type='text'
                            placeholder="User Name"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.username}</Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type='email'
                            placeholder="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={
                                formik.handleChange
                            }
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.email}</Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            type='number'
                            placeholder="number"
                            name="number"
                            value={formik.values.number}
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            onChange={
                                formik.handleChange
                            }
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.number}</Typography>
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
                            onChange={
                                formik.handleChange
                            }
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.password}</Typography>
                        ) : null}
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="white"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '30px',
                                flexDirection: { sm: 'row', xs: 'column' },
                                color: colors.gray[500],
                                '& .link-tag': {
                                    color: colors.basics.white,
                                    textDecoration: 'none',
                                }
                            }}
                        >Already you have an account? <NavLink className='link-tag' style={{ flexShrink: '0' }} to='/signin'>Sign In</NavLink></Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button variant='whiteBtn' type='submit' >Submit</Button>
                    </Box>
                </Box>
            </form>
        </>

    )
}

export default SignUp