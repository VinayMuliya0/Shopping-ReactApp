import React from 'react'
import { useFormik } from 'formik'
import state from '../../JSON/states.json'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { colors } from '../../../style/colors'
import { useEffect } from 'react'
import { setInformation } from '../../../redux/features/product/product'
import { useState } from 'react'


const Information = ({ nextClick }) => {
    const stat = state;
    const { cart, information } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [response, setResponse] = useState()
    const localUser = JSON.parse(localStorage.getItem('user'))

    console.log('information', information);

    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Enter your Full Name'),
        email: Yup.string().email('Invalid email').required('Enter your Email'),
        phone: Yup.string().length(10, 'Enter required phone number!').required('Enter your Phone Number'),
        pincode: Yup.string().required(),
        address: Yup.string().required('Enter your Address'),
        state: Yup.string().required('Select your State'),
        city: Yup.string().required('Select your City'),
    });


    const formik = useFormik({
        initialValues: {
            username: localUser?.username,
            email: localUser?.email,
            phone: information?.phone,
            address: information?.address,
            state: information?.state,
            city: information?.city,
            pincode: information?.pincode,
        },
        onSubmit: async (values) => {
            console.log(values.city);
            console.log(response);
            dispatch(setInformation(formik.values))
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Optional: Scroll behavior, provides a smooth scroll effect
            });
            nextClick(2)

            // console.log("error:- ", values);

            // if (response === "Success") {
            //     dispatch(setInformation(values))
            //     nextClick(2)

            // }
            // console.log("statesList:- ", statesList[0].District);

            // if(formik.values.state && !formik.errors.pincode) await fetchData()
            //     else if(formik.errors.state && formik.values.pincode) {
            // console.log("select cioty error set")
            // formik.setFieldError('pincode','pincode erro rselct state')
            //     }

            // if (statesList?.Status === "Error") {
            //     formik.setFieldError('pincode','Enter Enter valid Pincode');
            // }
        },
        validationSchema: SignupSchema,
        // validate: (values) => {
        //     // console.log(values, ":::")
        //     let errors = {};

        //     if (!values.username) {
        //         errors.username = 'Enter Your Name';
        //     }
        //     if (!values.email) {
        //         errors.email = 'Enter Your email';
        //     }
        //     if (!values.phone) {
        //         errors.phone = 'Enter Your phone';
        //     }
        //     if (!values.address) {
        //         errors.address = 'Enter Your address';
        //     }
        //     if (!values.state) {
        //         errors.state = 'Enter Your state';
        //     }
        //     if (!values.city) {
        //         errors.city = 'Enter Your city';
        //     }

        //     if (!values.pincode) {
        //         errors.pincode = 'Enter Your pincode';
        //     } else if (statesList?.Status === "Error") {
        //         errors.pincode = 'Enter Enter valid Pincode';
        //     } else if (values?.city === '') {
        //         errors.pincode = 'Please Select District';

        //     }
        //     if (statesList?.PostOffice === null) {
        //         errors.pincode = 'Enter Your District pincode';
        //     }

        //     return errors;
        // }
    });
    const pincodeAPI = 'https://api.postalpincode.in/pincode/' + formik.values.pincode

    // setUserLogged(user !== null)
    // console.log(data);
    // Function to fetch data from the API

    // if(formik.values.state && !formik.errors.pincode) await fetchData()
    //     else if(formik.errors.state && formik.values.pincode) {
    // console.log("select cioty error set")
    // formik.setFieldError('pincode','pincode erro rselct state')
    //     }
    const fetchData = async () => {
        try {
            formik.setFieldError('pincode', 'Loading...'); // Show loading message while fetching data
            var response = await axios.get(pincodeAPI);
            console.log(response);
            setResponse(response)
            if (response.data[0].Status === "Success" && response.data[0].PostOffice[0].District === formik.values.city) {
                formik.setFieldError('pincode', ''); // Clear the error if data is successful
                if (response.data[0].PostOffice[0].District === formik.values.city) {
                    formik.submitForm()
                }

                // console.log('response.data[0].PostOffice if success', response.data[0].PostOffice[0].Division === formik.values.city);
                if (response.data[0].PostOffice[0].Division !== 'Surat') {
                    // localStorage.setItem('localState', false)
                } else {
                    console.log('information', information)
                    // localStorage.setItem('localState', true)
                }
                // console.log('response.data[0].PostOffice if success', response.data[0].PostOffice);
            } else {
                /*if (!formik.values.pincode) {
                    formik.setFieldError('pincode', 'Please Enter Your Pincode');
                } else */ if (!formik.values.state) {
                    formik.setFieldError('pincode', 'Please Select State');
                } else if (!formik.values.city) {
                    formik.setFieldError('pincode', 'Please Select District');
                } else if (response.data[0].PostOffice[0].District !== formik.values.city) {
                    formik.setFieldError('pincode', 'Invalid Pincode');
                }
                // console.log('response.data[0] error else failed', response.data[0]);

            }
        } catch (error) {
            // if(response.data[0].PostOffice[0].Division !== formik.values.city) {
                if(formik.values.pincode !== ''){
                    console.log('formik.values.pincode.length if', formik.values.pincode);
                    formik.setFieldError('pincode', 'Pincode Not Found');
                }
            // }
            // console.log('Error fetching data:', error);
            // formik.setFieldError('pincode', 'Error fetching data'); // Set error message for fetch error
        }
    }

    useEffect(() => {

        // console.log('useeffect called : ', pincodeAPI)
        if (cart.length === 0) {
            navigate('/')
        }
        // console.log(formik.values.pincode)


    }, [cart.length, navigate])
    // console.log('formik.values.pincode', formik.values.pincode)
    return (
        <>
            <Box className="box-item">
                <form action="" className='form' onSubmit={formik.handleSubmit}>
                    <Box className='form-wrapper'
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '15px',
                            '& .form-control': {
                                '& label': {
                                    mb: '15px',
                                    display: 'block',
                                    fontSize: '18px'
                                }
                            }
                        }}>
                        <Box className="form-control" sx={{ gridArea: '1 / span 2' }}>
                            <label htmlFor="userName" className='label-text'>Full Name</label>
                            <TextField
                                id="userName"
                                name="username"
                                placeholder='Enter Your Name'
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username}
                            />
                            {formik.errors.username && formik.touched.username ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.username}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control" sx={{ gridArea: '2 / span 2' }}>
                            <label htmlFor="email" className='label-text'>Email</label>
                            <TextField
                                id="email"
                                name="email"
                                placeholder='Enter Your Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.email}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control" sx={{ gridArea: '3 / span 2' }}>
                            <label htmlFor="phone" className='label-text'>Phone Number</label>
                            <TextField
                                id="phone"
                                type='number'
                                name="phone"
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                }}
                                placeholder='Enter Your Phone number'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                sx={{
                                    '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button, ': {
                                        appearance: 'none',
                                    }
                                }}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.phone}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control" sx={{ gridArea: '4 / span 2' }}>
                            <label htmlFor="address" className='label-text'>Address</label>
                            <TextField
                                id="address"
                                name="address"
                                type=''
                                placeholder='Enter Your Address'
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.address}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control">
                            <label htmlFor="state" className='label-text'>State</label>
                            <Select
                                value={formik.values.state}
                                id="state"
                                name="state"
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue("city", "");
                                }}
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    color: colors.basics.white,
                                    backgroundColor: colors.dark[600],
                                    width: '100%',
                                    fontSize: '16px',
                                    '& > .MuiSelect-select': {
                                        padding: '15px 20px'
                                    },
                                    '& svg': {
                                        color: '#ffffff8a'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: '0'
                                    }
                                }}
                            >
                                {stat?.states?.map((item, index) => {
                                    return (
                                        <MenuItem value={item.state}>{item.state}</MenuItem>
                                    )

                                })}
                            </Select>
                            {formik.touched.state && formik.errors.state ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.state}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control">
                            <label htmlFor="city" className='label-text'>City</label>
                            <Select
                                value={formik.values.city}
                                id="city"
                                name="city"
                                onChange={formik.handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{
                                    color: colors.basics.white,
                                    backgroundColor: colors.dark[600],
                                    width: '100%',
                                    fontSize: '16px',
                                    '& > .MuiSelect-select': {
                                        padding: '15px 20px'
                                    },
                                    '& svg': {
                                        color: '#ffffff8a'
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: '0'
                                    }
                                }}
                            >
                                {stat?.states?.filter((items) => items.state === formik.values.state)[0]?.districts?.map((item) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )

                                })}
                            </Select>
                            {formik.touched.city && formik.errors.city ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.city}</Typography>
                            ) : null}
                        </Box>
                        <Box className="form-control">
                            <label htmlFor="pincode" className='label-text'>Pincode</label>
                            <TextField
                                id="pincode"
                                name="pincode"
                                type='number'
                                onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                }}
                                placeholder='Enter Your Pincode'
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                sx={{
                                    '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button, ': {
                                        appearance: 'none',
                                    }
                                }}
                            />
                            {formik.touched.pincode && formik.errors.pincode ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.pincode}</Typography>
                            ) : null}
                        </Box>
                        <Box sx={{ gridArea: '7 / span 2' }}>
                            <Button variant="outlined" type='submit' onClick={fetchData} color="primary">Next</Button>
                        </Box>

                    </Box>
                </form>
            </Box>

        </>
    )
}

export default Information
