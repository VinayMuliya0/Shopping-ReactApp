import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { colors } from '../style/colors'
import { Like } from '../Images/Icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addWishList, editToCart, removeWishList } from '../redux/features/product/product'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom'
import { images } from '../Images/Image/image'
import AddCartModal from './Common/AddCartModal'


const WishListProduct = ({ item }) => {


    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { wishList, cart } = useSelector(state => state.product)
    const isInWishList = wishList.some(ele => ele?.id === item?.id)
    const isInCart = cart.some(ele => ele?.id === item?.id)
    // const [qut, setQut] = useState(1);
    console.log('isInCart', isInCart)

    const offerPrice = Math.round(item.price - (item.price * item.discountPercentage) / 100)

    const likeHandle = () => {
        console.log('isInWishList:- ', isInWishList);

        if (isInWishList) {
            // call remove function to remove item from the wishlist 
            dispatch(removeWishList(wishList.filter(ele => ele.id !== item.id)))
            console.log('true:- ', true);
        } else {
            console.log('false:- ', false);
            dispatch(addWishList(item))
        }
        console.log('wishList:- ', wishList);
    }

    const addToCartHandle = () => {
        const itemWithQuantity = { ...item, quantity: Number(1) };
        console.log("cart:- ", cart)
        if (isInCart) {
            dispatch(editToCart(cart.map(cartItem => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        quantity: Number(cartItem.quantity + 1)
                    };
                }
                return cartItem;
            })))
        } else {
            dispatch(addToCart(itemWithQuantity))
        }
        // navigate(`/shop/product/${item.id}`)
    }

    // const handleClose = useMemo(() => {
    //     setOpen(false);
    // },[open]);

    // const handleModalOpen = useMemo(() => {
    //     setOpen(true);
    // },[open]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleModalOpen = () => {
        setOpen(true);
    };

    
    // const plusQut = useMemo(() => setQut(qut + 1), [qut]);
    // const minusQut = useMemo(() => {
    //     if (qut > 1) {
    //     setQut(qut - 1);
    // }}, [qut]);

    // const plusQut = () => {
    //     setQut(qut + 1)
    // };

    // const minusQut = () => {
    //     if (qut > 1) {
    //         setQut(qut - 1);
    //     }
    // };


    return (
        <>
            <Box sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all .5s ease',
                '&:hover': {
                    transform: 'scale(1.03)',
                    // boxShadow: '0px 0px 30px -10px #fff'
                }
            }}>
                <Box className="img-wrapper" onClick={handleModalOpen} sx={{
                    display: 'flex',
                    cursor: 'pointer',
                    '& img': {
                        height: '200px',
                        objectFit: 'cover',
                    },
                }}>

                    <img src={item.thumbnail} width={400} height={400} alt="" />
                </Box>
                <Box
                    sx={{
                        '& svg': {
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '25px',
                            height: 'auto',
                            transition: 'all .5s ease',
                            stroke: !isInWishList ? '#fff' : '#F44336',
                            fill: !isInWishList ? '#fff0' : '#F44336',
                            filter: 'drop-shadow(2px 2px 3px black)',
                            cursor: 'pointer',
                            '&:hover': {
                                fill: '#F44336',
                                stroke: '#F44336 !important'
                            }
                        }
                    }}
                    onClick={likeHandle}>
                    <Like />
                </Box>
                <Box
                    sx={{
                        '& img': {
                            position: 'absolute',
                            top: '35px',
                            right: '10px',
                            width: '25px',
                            height: 'auto',
                            transition: 'all .5s ease',
                            stroke: !isInWishList ? '#fff' : '#F44336',
                            fill: !isInWishList ? '#fff0' : '#F44336',
                            filter: 'drop-shadow(2px 2px 3px black)',
                            cursor: 'pointer',
                            '&:hover': {
                                fill: '#F44336',
                                stroke: '#F44336 !important'
                            }
                        }
                    }}
                >
                    <img src={images.fastCart} onClick={() => { navigate(`/product/${item.id}`); }} alt="fastCart" />
                </Box>
                <Box onClick={handleModalOpen} sx={{
                    padding: '10px',
                    backgroundColor: colors.dark[100],
                    height: '100%',
                    '& svg': {
                        width: '16px',
                        height: 'auto'
                    }
                }}>

                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '18px',
                            cursor: 'pointer',
                            color: colors.basics.white
                        }}
                    >{item.title}</Typography>
                    <Typography variant="body2" sx={{
                        position: 'absolute',
                        top: '10px',
                        left: '-40px',
                        backgroundColor: 'red',
                        padding: '2px',
                        transform: 'rotate(-45deg)',
                        textAlign: 'center',
                        maxWidth: '130px',
                        width: '100%',
                    }} color={colors.basics.white}>{item.discountPercentage}%</Typography>
                    <Typography variant="body2"
                        sx={{
                            fontWeight: '400',
                            display: 'inline-block',
                            marginRight: '10px'
                        }}
                        color={colors.basics.white}>₹ {offerPrice}</Typography>
                    <Typography variant="body2"
                        sx={{
                            fontWeight: '400',
                            display: 'inline-block',
                            textDecoration: 'line-through'
                        }}
                        color="grey">₹ {item.price}</Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        {/* {item.rating} */}
                        <Rating
                            // style={{ marginLeft: '15px' }}
                            style={{ marginRight: '15px' }}
                            initialValue={item.rating}
                            allowHover={true}
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            allowFraction
                            readonly={true}
                        />
                        {item.rating}
                    </Box>
                </Box>
            </Box>

            {/* Modal */}
            {open && <AddCartModal isOpen={open} product={item} buttonText='Add Cart' modalHeading='Add Cart' addToCartHandle={addToCartHandle} handleClose={handleClose}>
                <Box className="modal-box"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box className="img-wrapper" sx={{ width: '50%' }}>
                        <Box className='slider-wrapper'
                            sx={{
                                '& .slide-img': {
                                    maxWidth: '100%',
                                    height: 'auto',
                                    width: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'contain'
                                },
                                '& .swiper-wrapper': {
                                    alignItems: 'center'
                                }
                            }}>
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoHeight={true}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="img-slider"
                            >
                                {item.images.map((item, index) => {
                                    return (
                                        <SwiperSlide>
                                            <img src={item} className='slide-img' width={500} height={333} alt="" />
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </Box>
                    </Box>
                    <Box className='product-details-wrapper' sx={{ width: '50%' }}>
                        <Box className='product-header'>
                            <Typography variant="h1" sx={{ color: colors.basics.black, textAlign: 'start' }}>{item.title}</Typography>
                            <Typography variant="subtitle1" color={colors.gray[500]}>{item.brand}</Typography>
                            <Typography variant="body2"
                                sx={{
                                    fontSize: '26px',
                                    fontWeight: '600',
                                    display: 'inline-block',
                                    marginRight: '10px',
                                    pb: '10px',
                                }}
                                color={colors.basics.black}>
                                ₹ {offerPrice}
                            </Typography>
                            <Typography variant="body2"
                                sx={{
                                    fontSize: '26px',
                                    fontWeight: '600',
                                    display: 'inline-block',
                                    textDecoration: 'line-through',
                                    pb: '10px',
                                }}
                                color="grey">
                                ₹ {item.price}
                            </Typography>
                            <Typography variant="body2" color={colors.basics.black} pt='5px'>{item.description}</Typography>
                            <Box sx={{
                                '& svg': {
                                    width: '20px',
                                    height: 'auto'
                                }
                            }}>
                                <Rating
                                    // style={{ marginLeft: '15px' }}
                                    style={{ marginRight: '15px' }}
                                    initialValue={item.rating}
                                    allowHover={true}
                                    fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                    allowFraction
                                    readonly={true}
                                />
                                <Typography variant="caption" color={colors.basics.black} display={'inline-block'} pt='5px'>{item.rating}</Typography>
                            </Box>
                            <Typography variant="body2" color="initial" fontWeight={'600'}>Availability: <Typography variant="body2" color={colors.dark[100]} display={'inline-block'} pt='5px'>{item.stock}</Typography></Typography>
                            {/* <QutBox plusQut={plusQut} qut={qut} minusQut={minusQut} /> */}
                        </Box>
                    </Box>
                </Box>
            </AddCartModal>}
        </>
    )
}

export default WishListProduct
