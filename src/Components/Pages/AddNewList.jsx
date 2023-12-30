import React from 'react'
import Container from '../Layout/Containre'
import { Box, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { colors } from '../../style/colors'

const AddNewList = () => {

    const formik = useFormik({
        initialValues: {
            name: "",
            desc: "",
        },
        onSubmit: (values) => {
            // const localData = [localStorage.getItem('user') , JSON.stringify(values)]
            // console.log(localData);
            // dispatch(setSignupState(values))
            console.log(values);
            // debugger
        },
        validate: (values) => {

            let errors = {};

            if (!values.name) {
                errors.name = 'Please enter the text';
            }
            return errors;
        }
    })
    return (
        <>
            <Container>
                <Box className="los"
                sx={{
                    
                }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{margin: '20px 0'}}>
                            <TextField
                                type='text'
                                placeholder="Email Or User name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.name}</Typography>
                            ) : null}
                        </Box>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default AddNewList
