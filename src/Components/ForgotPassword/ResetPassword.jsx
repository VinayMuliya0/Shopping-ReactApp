import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { images } from '../../Images/Image/image'
import { colors } from '../../style/colors'
import TextInput from '../TextInput'
import { Eye, EyeHidden } from '../../Images/Icons/icons'
// import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../../redux/features/signup/signupSlice'

const ResetPassword = () => {
    const localData = JSON.parse(localStorage.getItem('forgotUser'))
    const [password, setPassword] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state)
    const [confPassword, setConfPassword] = useState(false)
    
    const formik = useFormik({
        initialValues: {
            password: "",
            cPassword: "",
        },
        onSubmit: (values) => {
            console.log(values);
            if (values.password === values.cPassword) {
                dispatch(updatePassword(selector.signup.entities.map(user => {
                    if (user.email === localData) {
                        return {
                            ...user,
                            password: values.password
                        };
                    }
                    return user;
                })))
                navigate(`/signin`)
                localStorage.removeItem('setPassword')
                localStorage.removeItem('forgotUser')
                
            } else {
                alert('Enter valid password')
            }
        },
        validate: (values) => {
            // console.log(values, ":::")
            let errors = {};

            if (!values.password) {
                errors.password = 'Please enter the password';
            } else if (values.password.length < 8) {
                errors.password = 'Enter min 8 characters';
            }

            if (!values.cPassword) {
                errors.cPassword = 'Please enter the password';
            } else if (values.cPassword.length < 8) {
                errors.cPassword = 'Enter min 8 characters';
            }

            return errors;
        }
    });
    useEffect(() => {
        if (localStorage.getItem('setPassword') === null || localStorage.getItem('setPassword') === false) {
            
            navigate('/signin')
        }
    })


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
                            Reset Password
                        </Typography>
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
                                <Box sx={{ cursor: 'pointer', display: 'flex' }} onClick={() => { setPassword((show) => !show) }}>
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
                    <Box sx={{ mb: 2 }}>
                        <TextInput
                            name="cPassword"
                            type={confPassword ? 'text' : 'password'}
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
                                <Box sx={{ cursor: 'pointer', display: 'flex' }} onClick={() => { setConfPassword((show) => !show) }}>
                                    {confPassword ? <Eye /> : <EyeHidden />}
                                </Box>
                            }
                            value={formik.values.cPassword}
                            placeholder="Confirm Password"
                            onChange={formik.handleChange}
                            error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.cPassword && formik.errors.cPassword ? (
                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.cPassword}</Typography>
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

export default ResetPassword
