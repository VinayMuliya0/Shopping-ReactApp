import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { Box, FormControlLabel, Checkbox, Button, TextField, Slide, Dialog, DialogTitle, DialogContent } from '@mui/material'
import { colors } from '../../../style/colors'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Loader from '../../Loader'
import { Check } from '../../../Images/Icons/icons'
import { images } from '../../../Images/Image/image'
import { addOrderList, removeCart, setOrderList } from '../../../redux/features/product/product'

const PaymentMethod = ({ nextClick, backClick }) => {
    const localUser = JSON.parse(localStorage.getItem('user')).email
    const [checkBox, setCheckBox] = useState(true)
    const [open, setOpen] = useState(false);
    const [pymPross, setPymPross] = useState(false);
    const [payment, setPayment] = useState(false);
    const { information, cart, orderList } = useSelector(state => state.product)
    const cartsDetails = cart.filter(ele => ele?.email === localUser)[0]?.carts
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let stateShipping = 20
    let distShipping = 10
    const creditCard = [
        {
            account: '4444444444444444',
            expiry: '12/23',
            cvv: '444'
        }
    ]
    // localStorage.removeItem('promoCode')

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // console.log('orderList', orderList);
    // console.log('cartsDetails', cartsDetails);

    const handleClose = () => {
        setOpen(false);
    };
    var orderID = '';
    function generateOrderID() {
        const min = 10000000; // Smallest 8-digit number
        const max = 99999999; // Largest 8-digit number
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0') > 12 ? String(now.getHours()).padStart(2, '0') - 12 : String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

        const dateTime = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
        return dateTime;
    };
    

    const submitCard = () => {
        // console.log(creditCard[0].expiry)
        // if (formik.values.account !== Number(creditCard[0].account)) {
        //     formik.setFieldError('account', 'Enter valid number')
        //     console.log('creditCard[0].account', (creditCard[0].account));
        // }
        // if (formik.values.expiry !== creditCard[0].expiry) {
        //     console.log('creditCard[0].expiry', creditCard[0].expiry);
        //     formik.setFieldError('expiry', 'Enter valid expiry date')
        // }
        // if (formik.values.cvv !== Number(creditCard[0].cvv)) {
        //     formik.setFieldError('cvv', 'Enter valid cvv')
        //     console.log('creditCard[0].cvv', creditCard[0].cvv);
        // } else {
        //     console.log('Success', true);
        // }
        // let orderIsOrNot = orderList
        // console.log('orderIsOrNot', orderIsOrNot);

        const currentUsersOrders = orderList.some((ele)=> ele.email === localUser)
        orderID = generateOrderID()
        const currentDate = getCurrentDateTime();
        const orderObj = { orderId: orderID, cartList: cartsDetails, info: information, gst: localStorage.getItem('gst'), shippingCharge: localStorage.getItem('shippingCharge'), PromoDisc: localStorage.getItem('promoDiscount'), paymentType: checkBox, date: currentDate }
        console.log('currentUsersOrders', currentUsersOrders);
        if (checkBox) {

            console.log('orderList', orderList);
            
            if(orderList.length === 0 || !currentUsersOrders){
                dispatch(addOrderList(
                    {
                        email: localUser,
                        orders: [orderObj]
                    }
                ))
            }else {
                // alert('Please Stop')
                dispatch(setOrderList(orderList.map(orderListItem => {
                    if(orderListItem.email === localUser) {
                        return {
                            ...orderListItem,
                            orders: [...orderListItem.orders, orderObj],
                        };
                    }else {
                        return orderListItem
                    }
                })))
            }            
            dispatch(removeCart())
            navigate('/order-list')
            localStorage.removeItem('promoDiscount')
        } else {
            setOpen(true)
            setPayment(false)
            console.log('Payment', payment);
            console.log('pymPross', pymPross);
            if (formik.values.account === Number(creditCard[0].account) && formik.values.expiry === creditCard[0].expiry && formik.values.cvv === Number(creditCard[0].cvv)) {
                orderID = generateOrderID()
                console.log('orderID', orderID);
                console.log('Success', true);
                setTimeout(() => {
                    console.log('Payment', payment);
                    console.log('pymPross', pymPross);
                    setPayment(true)
                    setPymPross(true)
                    if(orderList.length === 0 || !currentUsersOrders){
                        dispatch(addOrderList(
                            {
                                email: localUser,
                                orders: [orderObj]
                            }
                        ))
                    }else {
                        // alert('Please Stop')
                        dispatch(setOrderList(orderList.map(orderListItem => {
                            if(orderListItem.email === localUser) {
                                return {
                                    ...orderListItem,
                                    orders: [...orderListItem.orders, orderObj],
                                };
                            }else {
                                return orderListItem
                            }
                        })))
                    }    
                    dispatch(removeCart())
                    navigate('/order-list')
                    localStorage.removeItem('promoDiscount')
                }, 6000);
            } else {
                setTimeout(() => {
                    setPayment(true)
                    setPymPross(false)
                    console.log('Payment', payment);
                    console.log('pymPross', pymPross);
                }, 6000);
            }

        }
    }


    const SignupSchema = Yup.object().shape({
        account: Yup.string().required('Enter your Account Number').length(16, 'Enter your Account Number'),
        expiry: Yup.string().required('Enter your Card Expiry date').length(5, 'Enter your Card Expiry date'),
        cvv: Yup.string().required('Enter CVV').length(3, 'Enter CVV'),
    });

    const formik = useFormik({
        initialValues: {
            account: '',
            expiry: '',
            cvv: '',
        },
        onSubmit: async (values) => {
            console.log("values:- ", values)
            submitCard()
        },
        validationSchema: SignupSchema,
    });


    return (
        <>
            <Box>
                <Typography variant="body1" color={colors.basics.white}>Payment Method</Typography>
                <Box className='payment-type' sx={{ '& svg': { fill: '#00bbff' } }}>
                    <FormControlLabel
                        label="COD"
                        control={
                            <Checkbox
                                value=""
                                checked={checkBox}
                                onChange={() => setCheckBox(true)}
                                color="primary"
                            />
                        }
                    />
                    <FormControlLabel
                        label="Credit card"
                        control={
                            <Checkbox
                                value=""
                                checked={!checkBox}
                                onChange={() => setCheckBox(false)}
                                color="primary"
                            />
                        }
                    />
                </Box>
                <Box className='payment-tabs'>
                    {checkBox ?
                        <Box className='cod-box'>
                            <Typography variant="body2"
                                sx={{
                                    color: colors.basics.white,
                                    bgcolor: colors.gray[500],
                                    padding: '10px 15px',
                                    minWidth: '450px',
                                    borderRadius: '8px',
                                    marginTop: '10px',
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'space-between'
                                }}>Basic Shipping Charges <span>${information.state !== 'Gujarat' ? stateShipping : information.city !== 'Surat' ? distShipping : 0}</span></Typography>
                            <Box sx={{ mt: '15px' }}>
                                <Button variant="outlined" sx={{ mr: '15px' }} type='button' onClick={() => { backClick(2) }} color="primary">Back</Button>
                                <Button variant="outlined" type='button' onClick={() => { submitCard() }} color="primary">Submit</Button>
                            </Box>
                        </Box>
                        :
                        <form className='cod-box' onSubmit={formik.handleSubmit}>
                            <Box className='card-wrapper'
                                sx={{
                                    bgcolor: colors.dark[100],
                                    minWidth: '450px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    my: '30px'

                                }}>
                                <Box className='card-header'
                                    sx={{
                                        bgcolor: colors.gray[500],
                                        padding: '15px 15px',
                                    }}>
                                    <Typography variant="body2"
                                        sx={{
                                            color: colors.basics.white,
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            justifyContent: 'space-between'
                                        }}>Credit Card {/* <span>${information.state !== 'Gujarat' ? stateShipping : information.city !== 'Surat' ? distShipping : 90}</span> */}</Typography>

                                </Box>
                                <Box className='card-body'
                                    sx={{
                                        padding: '20px 15px',
                                    }}>
                                    <Box className="form-control" sx={{ marginBottom: "20px", '& label': { marginBottom: '10px', display: 'block' } }}>

                                        <label htmlFor="account" className='label-text'>Credit Card Number</label>
                                        <TextField
                                            id="account"
                                            type='number'
                                            name="account"
                                            onInput={(e) => {
                                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
                                            }}
                                            placeholder='Enter Your Credit Card Number'
                                            value={formik.values.account}
                                            onChange={formik.handleChange}
                                            sx={{
                                                '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button, ': {
                                                    appearance: 'none',
                                                }
                                            }}
                                        />
                                        {formik.touched.account && formik.errors.account ? (
                                            <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.account}</Typography>
                                        ) : null}
                                    </Box>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                                        <Box className="form-control" sx={{ '& label': { marginBottom: '10px', display: 'block' } }}>
                                            <label htmlFor="expiry" className='label-text'>Expiry Date</label>
                                            <TextField
                                                id="expiry"
                                                type='text' // Change the input type to text
                                                name="expiry"
                                                placeholder='12/30'
                                                value={formik.values.expiry}
                                                onChange={formik.handleChange}
                                                onInput={(e) => {
                                                    e.target.value = e.target.value.slice(0, 5); // Limit the input to 5 characters
                                                }}
                                                sx={{
                                                    '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button': {
                                                        appearance: 'none',
                                                    }
                                                }}
                                            />
                                            {formik.touched.expiry && formik.errors.expiry ? (
                                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.expiry}</Typography>
                                            ) : null}
                                        </Box>
                                        <Box className="form-control" sx={{ '& label': { marginBottom: '10px', display: 'block' } }}>
                                            <label htmlFor="cvv" className='label-text'>CVV</label>
                                            <TextField
                                                id="cvv"
                                                type='number'
                                                name="cvv"
                                                onInput={(e) => {
                                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                                }}
                                                placeholder='Enter CVV'
                                                value={formik.values.cvv}
                                                onChange={formik.handleChange}
                                                sx={{
                                                    '& input::-webkit-outer-spin-button,& input::-webkit-inner-spin-button, ': {
                                                        appearance: 'none',
                                                    }
                                                }}
                                            />
                                            {formik.touched.cvv && formik.errors.cvv ? (
                                                <Typography variant="subtitle1" sx={{ color: colors.basics.danger, fontWeight: 400, paddingTop: '5px' }} >{formik.errors.cvv}</Typography>
                                            ) : null}
                                        </Box>
                                    </Box>
                                </Box>

                            </Box>
                            <Box sx={{ mt: '15px' }}>
                                <Button variant="outlined" sx={{ mr: '15px' }} type='button' onClick={() => { backClick(2) }} color="primary">Back</Button>
                                <Button variant="outlined" type='submit' color="primary">Submit</Button>
                            </Box>
                        </form>
                    }
                </Box>
            </Box>

            {/* Modal */}
            {open && <Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        '& .MuiPaper-elevation': {
                            backgroundColor: colors.dark[600],
                            padding: '30px'
                        }
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        {payment ?
                            <>
                                {pymPross ?
                                    <Typography variant="h4" sx={{ textAlign: 'center', color: colors.basics.white, fontWeight: '500' }} color="initial">Payment Done !!!</Typography>
                                    :
                                    <Typography variant="h4" sx={{ textAlign: 'center', color: colors.basics.white, fontWeight: '500' }} color="initial">Payment Failed !!!</Typography>
                                }
                            </>
                            :
                            <Typography variant="h4" sx={{ textAlign: 'center', color: colors.basics.white, fontWeight: '500' }} color="initial">Payment in processing <span>...</span></Typography>
                        }
                    </DialogTitle>
                    {payment ?
                        <Box sx={{ textAlign: 'center' }}>
                            {pymPross ?
                                <Check />
                                :
                                <img src={images.Exclamation} alt="" />
                            }
                        </Box>
                        :
                        <Loader />}
                    <DialogContent>
                        {payment ?
                            <>
                                {pymPross ?
                                    <Typography variant="body2" sx={{ textAlign: 'center', color: colors.basics.white }} color="initial">Your payment has been successfully done.</Typography>
                                    :
                                    <Typography variant="body2" sx={{ textAlign: 'center', color: colors.basics.white }} color="initial">We regret to inform you that your payment has failed. We understand the inconvenience this may have caused and assure you that we are working diligently to resolve this issue. Rest assured, the deducted amount will be refunded to your account as soon as possible. We apologize for any inconvenience and appreciate your understanding in this matter.</Typography>
                                }
                            </>
                            :
                            <Typography variant="body2" sx={{ textAlign: 'center', color: colors.basics.white }} color="initial">Your payment is currently in processing. Please be patient while we verify and complete the transaction. This may take a few moments. You will receive a confirmation email once the payment has been successfully processed. Thank you for your patience and understanding. </Typography>}
                        {payment && <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
                            {pymPross ?
                                <Button onClick={() => navigate('/order-list')} autoFocus>View Order</Button>
                                :
                                <Button onClick={() => { setOpen(false); setPayment(false) }} autoFocus>Try Latter</Button>
                            }
                        </Box>}
                    </DialogContent>
                </Dialog>
            </Box>}
        </>
    )
}

export default PaymentMethod
