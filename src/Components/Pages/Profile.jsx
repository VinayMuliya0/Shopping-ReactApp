import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem } from '@mui/material'
import React from 'react'
import Container from '../Layout/Containre'
import state from '../JSON/states.json'
import { colors } from '../../style/colors'
import { images } from '../../Images/Image/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import axios from 'axios'
import styled from 'styled-components'
import { ImageEdit } from '../../Images/Icons/icons'
import { updateUser } from '../../redux/features/signup/signupSlice'

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const stat = state;
    const { information } = useSelector(state => state.product);
    const selector = useSelector(state => state)
    // const dispatch = useDispatch()
    const [response, setResponse] = useState();
    const localUser = JSON.parse(localStorage.getItem('user'));
    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Enter your Full Name'),
        pincode: Yup.string().required(),
        address: Yup.string().required('Enter your Address'),
        state: Yup.string().required('Select your State'),
        city: Yup.string().required('Select your City'),
    });
    const datasd = selector.signup.entities.find(person => person.email === localUser.email)

    console.log('datasd', datasd);
    const formik = useFormik({
        initialValues: {
            username: datasd?.username,
            email: datasd?.email,
            number: datasd?.number,
            address: datasd?.info?.address,
            state: datasd?.info?.state,
            city: datasd?.info?.city,
            pincode: datasd?.info?.pincode,
            images: datasd?.info?.images
        },
        onSubmit: async (values) => {
            console.log('values', values);
            console.log(response);
            dispatch(updateUser(selector.signup.entities.map(user => {
                if (user.email === localUser.email) {
                    return {
                        ...user,
                        username: values?.username,
                        info: {
                            address: values?.address,
                            state: values?.state,
                            city: values?.city,
                            pincode: values?.pincode,
                            images: values?.images
                        }
                    };
                }
                return user;
            })))
            setIsOpen(false)
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // Optional: Scroll behavior, provides a smooth scroll effect
            });
        },
        validationSchema: SignupSchema,
    });
    const pincodeAPI = 'https://api.postalpincode.in/pincode/' + formik.values.pincode
    const fetchData = async () => {
        // formik.setFieldError('pincode', 'Loading...'); // Show loading message while fetching data
        try {
            var response = await axios.get(pincodeAPI);
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
                    alert('lll')
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
            if (formik.values.pincode !== '') {
                console.log('formik.values.pincode.length if', formik.values.pincode);
                formik.setFieldError('pincode', 'Pincode Not Found');
            }
            if (formik.values.pincode === '') {
                formik.setFieldError('pincode', 'Enter Pincode');
            }
            // }
            // console.log('Error fetching data:', error);
            // formik.setFieldError('pincode', 'Error fetching data'); // Set error message for fetch error
        }
    }
    const handleClose = () => {
        formik.setValues({
            username: datasd?.username,
            email: datasd?.email,
            number: datasd?.number,
            address: datasd?.info?.address,
            state: datasd?.info?.state,
            city: datasd?.info?.city,
            pincode: datasd?.info?.pincode,
            images: datasd?.info?.images
        })
        formik.setErrors({})
        setIsOpen(false)
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            // The base64 image data is available in reader.result
            const base64Image = reader.result;
            console.log('Base64 Image:', base64Image);
            formik.values.images = base64Image
            formik.setFieldValue('images', base64Image)
            // You can now use the base64Image in your application.
            // For example, set it in state or send it to an API.
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    console.log(formik.values.images === '');

    return (
        <>
            <Box sx={{ minHeight: 'calc(100vh - 276px)', my: '30px', }}>
                <Container>
                    <Typography variant="h4" mb={'30px'} color={colors.basics.white} fontWeight={'600'} >Profile</Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1px 1fr',
                        gap: '30px',
                        '& .user-box': {
                            marginBottom: '15px',
                            '&:last-child': {
                                marginBottom: '0',
                            },
                            '& .user-filed': {
                                padding: '10px 15px',
                                backgroundColor: colors.dark[100],
                                borderRadius: '8px',
                                color: colors.gray[300],
                                minHeight: '22.88px'
                            },
                        },
                        '& .img-wrapper': {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            '& img': {
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: `1px solid ${colors.basics.white}`,
                                padding: '5px',
                                flexShrink: '0'
                            }
                        }

                    }}>
                        <Box className="profile-img" >
                            <Box className='img-wrapper'>
                                <img src={datasd?.info?.images ? datasd?.info?.images : images.logo} width={90} height={90} alt="" />
                                <Box className='user-name' sx={{ mt: '15px' }}>
                                    <Typography variant="h4" fontWeight={600} pb='10px' color="white">{datasd?.username}</Typography>
                                    <Typography variant="body2" color="gray">{datasd?.email}</Typography>
                                </Box>
                            </Box>
                            <Box className='user-details' sx={{ mt: '30px' }}>
                                <Box className='user-box'
                                    sx={{
                                        marginBottom: '15px',
                                    }}>
                                    <Typography variant="body2" pb='5px'>Name</Typography>
                                    <Typography className='user-filed' variant="body2">{datasd?.username}</Typography>
                                </Box>
                                <Box className='user-box'
                                    sx={{
                                        marginBottom: '15px',
                                    }}>
                                    <Typography variant="body2" pb='5px'>Email</Typography>
                                    <Typography className='user-filed' variant="body2">{datasd?.email}</Typography>
                                </Box>
                                <Box className='user-box'>
                                    <Typography variant="body2" pb='5px'>Number</Typography>
                                    <Typography className='user-filed' variant="body2">{datasd?.number}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box className='line' sx={{
                            backgroundColor: colors.gray[300]
                        }}></Box>
                        <Box className='address-details'>
                            <Typography variant="h5" fontWeight={600} pb='15px'>Address Details</Typography>
                            <Box className='user-box'>
                                <Typography variant="body2" pb='5px'>Address</Typography>
                                <Typography className='user-filed' variant="body2">{datasd?.info?.address ? datasd?.info?.address : '-'}</Typography>
                            </Box>
                            <Box className='user-box'>
                                <Typography variant="body2" pb='5px'>State</Typography>
                                <Typography className='user-filed' variant="body2">{datasd?.info?.state ? datasd?.info?.state : '-'}</Typography>
                            </Box>
                            <Box className='user-box'>
                                <Typography variant="body2" pb='5px'>City</Typography>
                                <Typography className='user-filed' variant="body2">{datasd?.info?.city ? datasd?.info?.city : '-'}</Typography>
                            </Box>
                            <Box className='user-box'>
                                <Typography variant="body2" pb='5px'>Pincode</Typography>
                                <Typography className='user-filed' variant="body2">{datasd?.info?.pincode ? datasd?.info?.pincode : '-'}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ mt: '30px' }}>
                        <Button variant="outlined" onClick={() => { setIsOpen(true); formik.setErrors({}) }} >Edit</Button>
                    </Box>
                </Container>
            </Box>

            {/* Modal */}
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth='lg'
                fullWidth={true}
                scroll={'body'}
                sx={{
                    '& .MuiPaper-elevation ': {
                        backgroundColor: colors.dark[200]
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        fontSize: '30px',
                        fontWeight: '600',
                        borderBottom: '1px solid #fff',
                        marginBottom: '30px',
                        color: colors.basics.white,
                    }}>Edit Profile
                </DialogTitle>
                <DialogContent>
                    <form action="" className='form' onSubmit={formik.handleSubmit}>
                        <Box className='profile'
                            sx={{
                                '& .img-wrapper': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    position: 'relative',
                                    margin: '0 auto 30px',
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    width: 'fit-content',
                                    padding: '5px',
                                    border: `1px solid ${colors.basics.white}`,
                                    '& img': {
                                        width: '90px',
                                        height: '90px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        flexShrink: '0'
                                    }
                                }
                            }}>
                            <Box className='img-wrapper'>
                                <img src={formik?.values?.images ?formik?.values?.images :images.logo} width={90} height={90} alt="" />
                                <Button component="label" onChange={handleFile} variant="contained"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#00000050',
                                        opacity: 0,
                                        transition: 'all .5s ease',
                                        '&:hover': {
                                            opacity: 1,
                                            backgroundColor: '#00000050',
                                        }
                                    }}>
                                    <ImageEdit />
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Box>
                        </Box>
                        <Box className='form-wrapper'
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                                gap: '15px',
                                '& .label-text': {
                                    color: colors.basics.white
                                },
                                '& .form-control': {
                                    '& label': {
                                        mb: '15px',
                                        display: 'block',
                                        fontSize: '18px'
                                    }
                                }
                            }}>
                            <Box className="form-control" sx={{ gridArea: '1 / span 3' }}>
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
                            <Box className="form-control" sx={{
                                gridArea: '1 / span 3',
                                '& .Mui-disabled': {
                                    WebkitTextFillColor: '#8d8d8d',
                                    cursor: 'not-allowed'
                                }
                            }}>
                                <label htmlFor="email" className='label-text'>Email</label>
                                <TextField
                                    id="email"
                                    name="email"
                                    placeholder='Enter Your Email'
                                    value={formik.values.email}
                                    aria-readonly={true}
                                    disabled

                                />
                            </Box>
                            <Box className="form-control" sx={{
                                gridArea: '2 / span 3',
                                '& .Mui-disabled': {
                                    '-webkit-text-fill-color': '#8d8d8d',
                                    cursor: 'not-allowed'
                                }
                            }}>
                                <label htmlFor="number" className='label-text'>Phone Number</label>
                                <TextField
                                    id="number"
                                    type='number'
                                    name="number"
                                    placeholder='Enter Your Phone number'
                                    value={formik.values.number}
                                    aria-readonly={true}
                                    disabled
                                    sx={{
                                        '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button, ': {
                                            appearance: 'none',
                                        }
                                    }}
                                />
                                {formik.touched.number && formik.errors.number ? (
                                    <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.number}</Typography>
                                ) : null}
                            </Box>
                            <Box className="form-control" sx={{ gridArea: '2 / span 3' }}>
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
                            <Box className="form-control" sx={{ gridArea: '3 / span 2' }}>
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
                                            <MenuItem key={index} value={item.state}>{item.state}</MenuItem>
                                        )

                                    })}
                                </Select>
                                {formik.touched.state && formik.errors.state ? (
                                    <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.state}</Typography>
                                ) : null}
                            </Box>
                            <Box className="form-control" sx={{ gridArea: '3 / span 2' }}>
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
                            <Box className="form-control" sx={{ gridArea: '3 / span 2' }}>
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

                        </Box>
                        <Box sx={{ textAlign: 'end', mt: '15px' }}>
                            <Button type='button' onClick={() => {
                                handleClose(false)
                            }} sx={{
                                marginRight: '15px',
                            }} >Cancel</Button>
                            <Button type='submit' onClick={fetchData} >Submit</Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Profile
