import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { colors } from '../style/colors'
import { Like } from '../Images/Icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, addWishList, editToCart, removeWishList } from '../redux/features/product/product'
import AddCartModal from './Common/AddCartModal'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { images } from '../Images/Image/image'
import { useNavigate } from 'react-router-dom'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const Product = ({ item }) => {
    let localUser = JSON.parse(localStorage.getItem('user')).email;
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { wishList, cart } = useSelector(state => state.product)
    const isInWishList = wishList.some(ele => ele?.id === item?.id)
    // const isInCart = cart.some(ele => ele?.email === localUser)[0].carts
    
    // const isUserInCart = cart.some(cartArray => {
    //     // Check if any object in the nested array has the matching email
    //     return cartArray.some(userObj => userObj?.email === localUser);
    // });
    // const [qut, setQut] = useState(1);
    

    const offerPrice = Math.round(item.price + (item.price * item.discountPercentage) / 100)

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

        // console.log('objCart', objCart);
        // console.log('isUserInCart', isUserInCart);
        // console.log('isInCart', isInCart);
        
        let isUserInCart = cart.some(lord => lord?.email === localUser);

        const itemWithQuantity = { ...item, quantity: Number(1) };
        if (!isUserInCart) {
            dispatch(addToCart(
                {
                    email: localUser,
                    carts: [itemWithQuantity]
                }
            ))
        } else {
            console.log('isUserInCart', isUserInCart)
            dispatch(editToCart(cart.map(cartItem => {
                if (cartItem.email === localUser) {
                    // Check if the item already exists in the cart
                    const existingItem = cartItem.carts.find(cart => cart.id === item.id);
                    if (existingItem) {
                        // If the item exists, update the quantity
                        return {
                            ...cartItem,
                            carts: cartItem.carts.map((itemsd) => {
                                if (itemsd.id === item.id) {
                                    return { ...itemsd, quantity: Number(itemsd.quantity + 1) };
                                } else {
                                    return itemsd;
                                }
                            }),
                        };
                    } else {
                        // If the item doesn't exist, add the new item to the cart
                        return {
                            ...cartItem,
                            carts: [...cartItem.carts, { ...item, quantity: Number(1) }],
                        };
                    }
                } else {
                    return cartItem;
                }
            })));
            

        }
        // }
        // if (isInCart) {
        //     dispatch(editToCart(cart.map(cartItem => {
        //         if (cartItem.id === item.id) {
        //             return {
        //                 ...cartItem,
        //                 quantity: Number(cartItem.quantity + 1)
        //             };
        //         }
        //         return cartItem;
        //     })))
        // } else {
        //     dispatch(addToCart(itemWithQuantity))
        // }
        // navigate(`/shop/product/${item.id}`)
        console.log("cart:- ", cart)
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
                height: '100%',
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
                                // fill: '#F44336',
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
                        color={colors.basics.white}>₹ {item.price}</Typography>
                    <Typography variant="body2"
                        sx={{
                            fontWeight: '400',
                            display: 'inline-block',
                            textDecoration: 'line-through'
                        }}
                        color="grey">₹ {offerPrice}</Typography>
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
                        justifyContent: 'space-between',
                        gap: '30px'
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
                                {item.images.map((items, index) => {
                                    return (
                                        <Box key={index}>
                                            <SwiperSlide>
                                                <img src={items} className='slide-img' width={500} height={333} alt={"slide-img-" + index} />
                                            </SwiperSlide>
                                        </Box>
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

export default Product
