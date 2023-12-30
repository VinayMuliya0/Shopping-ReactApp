import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box, Button, Typography } from '@mui/material';
import Container from '../Layout/Containre';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../style/colors';
import { Rating } from 'react-simple-star-rating';
import QutBox from '../QutBox';
import { editToCart } from '../../redux/features/product/product';

const SingleProduct = () => {
    const { id } = useParams();
    const { cart, productsList } = useSelector(state => state.product);
    const [product, setProduct] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [qnt, setQnt] = useState(Number(1))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log('cart', cart)
    console.log('id', id)
    const isInCart = cart.some(ele => ele?.id === Number(id))
    let localUser = JSON.parse(localStorage.getItem('user')).email;
    console.log('product', product);
    
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // const handleMouseMove = (e) => {
    //     const box = e.currentTarget.getBoundingClientRect();
    //     const x = ((e.clientX - box.left) < 0 ?  box.left - e.clientX : e.clientX - box.left)*100/box.width;
    //     const y = ((e.clientY - box.top) < 0 ? box.top - e.clientY : e.clientY - box.top)*100/box.height;
    //     setMousePosition({ x, y });
    //     console.log('clientX', ((e.clientX - box.left) > 0 ? e.clientX - box.left : box.left - e.clientX))
    //     console.log('clientX', ((e.clientY - box.top) > 0 ? e.clientY - box.top : box.top - e.clientY  ))
    // };

    const addCartHandle = () => {
        const itemWithQuantity = { ...product, quantity: Number(qnt) };
        console.log("plusQut itemWithQuantity:- ", itemWithQuantity)
        console.log('isInCart', isInCart)

        // dispatch(editToCart(cart.map(ele => {
        //     if (ele.id === Number(id)) {
        //         console.log(ele)
        //         return {
        //             ...ele,
        //             quantity: Number(qnt)
        //         };
        //     }
        //     return ele;
        // })))
        dispatch(editToCart(cart.map(cartItem => {
            if (cartItem.email === localUser) {
                // Check if the item already exists in the cart
                const existingItem = cartItem.carts.find(cart => cart.id === product.id);
                if (existingItem) {
                    // If the item exists, update the quantity
                    return {
                        ...cartItem,
                        carts: cartItem.carts.map((itemsd) => {
                            if (itemsd.id === product.id) {
                                return { ...itemsd, quantity: Number(qnt) };
                            } else {
                                return itemsd;
                            }
                        }),
                    };
                } else {
                    // If the item doesn't exist, add the new item to the cart
                    return {
                        ...cartItem,
                        carts: [...cartItem.carts, { ...product, quantity: Number(qnt) }],
                    };
                }
            } else {
                return cartItem;
            }
        })));
        // else {
        //     // dispatch(addToCart(itemWithQuantity))
        // }
        navigate('/cart')
    }

    const plusQut = () => {
        setQnt(Number(qnt) + 1)
    }
    const minusQut = () => {
        if (qnt > 1) {
            setQnt(Number(qnt) - 1)
        }

    }

    useEffect(() => {
        // Simulate an API request delay for demonstration purposes
        setTimeout(() => {
            // Filter the product based on the ID
            const selectedProduct = productsList?.find(item => item.id === Number(id));
            // const selectedProductCart = cart?.find(item => item.id === Number(id));
            const selectedProductCart = cart.filter(ele => ele?.email === JSON.parse(localStorage.getItem('user')).email)[0].carts.filter(sls => sls?.id === selectedProduct.id);
            console.log('selectedProductCart', selectedProductCart);
            // console.log('selectedProduct', selectedProduct)

            // Check if the product exists
            if (selectedProduct) {
                setProduct(selectedProduct);
                setQnt(selectedProductCart[0]?.quantity ? selectedProductCart[0]?.quantity : '1')
                setIsLoading(false); // Data loaded successfully
                // if(cart.length === 0 ) {
                //     navigate('/shop')
                // }
            } else if (selectedProduct === undefined) {
                if (cart.length === 0) {
                    navigate('/')
                }
            } else {
                setIsLoading(false); // Data not found

            }
        }, 1000); // Adjust the delay as needed or replace with actual API request
    }, [id, productsList, cart, navigate]);

    return (
        <Box sx={{ minHeight: 'calc(100vh - 276px)', my: '30px' }}>
            <Container>
                {isLoading ? (
                    // Display a loading message or spinner while data is being fetched
                    <Typography variant="h4">Loading...</Typography>
                ) : (
                    <>
                        <Box sx={{ paddingBottom: '30px' }}>
                            <Typography variant="body1" color="#fff" sx={{
                                '& a': {
                                    color: '#fff',
                                    textDecoration: 'none',
                                }
                            }}>
                                <Link to='/'>Shop</Link>
                                <Typography variant="caption" color="#8d8d8d" sx={{ fontSize: 'inherit', padding: '0 10px ' }}>{'/'}</Typography>
                                <Typography variant="caption" color="#8d8d8d" sx={{ fontSize: 'inherit' }}>{product.title}</Typography>
                            </Typography>
                        </Box>
                        <Box className="product-wrapper" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box className='slider-wrapper' sx={{ width: '48%', '& .swiper-slide-thumb-active img': { boxShadow: ' 0px 0px 0px 1px #ffffff20' } }}>
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#fff',
                                        '--swiper-pagination-color': '#fff',
                                        marginBottom: '30px'
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                    autoHeight={true}
                                >
                                    {product?.images?.map((item, index) => (
                                        <SwiperSlide key={index} >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '100%',
                                                    '& img': {
                                                        width: '100%',
                                                        height: '400px',
                                                        objectFit: 'contain',
                                                        objectPosition: 'center'
                                                    },
                                                    '& p': {
                                                        position: 'absolute',
                                                        // top: mousePosition.x + '%',
                                                        // left: mousePosition.y + '%',
                                                    },
                                                    '& .img-output': {
                                                        position: 'absolute',
                                                        top: '0',
                                                        left: '0',
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundSize: 'cover',
                                                        backgroundImage: `url('${item}')`,
                                                        opacity: '0',
                                                        transform: 'scale(1.3)',
                                                    },
                                                    '& .img-output:hover': {
                                                        opacity: 1,
                                                    }
                                                }}
                                            // onMouseMove={handleMouseMove}
                                            >
                                                <img src={item} alt={`img-${index}`} />
                                                {/* <Box className="img-output" style={{transformOrigin: (mousePosition.x + '%' + mousePosition.y + '%'),}}></Box> */}
                                                {/* <p>Mouse X: {mousePosition.x.toFixed(2)}</p> */}
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    {product?.images?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <Box sx={{
                                                '& img': {
                                                    width: '100%',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    objectPosition: 'center'
                                                },
                                            }}>
                                                <img src={item} alt={`img-${index}`} />
                                            </Box>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                            <Box className='product-info' sx={{ width: '48%' }}>
                                <Typography variant="h1" textAlign={'start'}>{product.title}</Typography>
                                <Typography variant="subtitle1" sx={{ color: colors.gray[300], paddingBottom: '10px' }}>{product.brand}</Typography>
                                <Typography variant="subtitle2" sx={{ color: colors.white, paddingBottom: '15px' }}>{product.description}</Typography>
                                <Typography variant="body2"
                                    sx={{
                                        fontWeight: '400',
                                        display: 'inline-block',
                                        marginRight: '10px',
                                        fontSize: '26px'
                                    }}
                                    color={colors.basics.white}>$ {product.price}</Typography>
                                <Typography variant="body2"
                                    sx={{
                                        fontWeight: '400',
                                        display: 'inline-block',
                                        textDecoration: 'line-through',
                                        fontSize: '20px'
                                    }}
                                    color={colors.gray[300]}>₹ {Math.round(product.price + (product.price * product.discountPercentage) / 100)}</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: '10px 0',
                                    '& svg': {
                                        width: '25px',
                                        height: 'auto'
                                    }
                                }}>
                                    {/* {item.rating} */}
                                    <Rating
                                        // style={{ marginLeft: '15px' }}
                                        style={{ marginRight: '15px' }}
                                        initialValue={product.rating}
                                        allowHover={true}
                                        fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                                        allowFraction
                                        readonly={true}
                                    />
                                    {product.rating}
                                </Box>
                                <Typography variant="body2" sx={{
                                    fontWeight: '400',
                                    display: 'inline-block',
                                    marginRight: '10px'
                                }}
                                    color={colors.basics.white}>In Stock:-</Typography>
                                <Typography variant="body2" sx={{
                                    fontWeight: '500',
                                    display: 'inline-block',
                                }}
                                    color={colors.gray[300]}>{product.stock}</Typography>
                                <Box>
                                    <QutBox plusQut={plusQut} qut={qnt} minusQut={minusQut} />
                                </Box>
                                <Box className="btn">
                                    <Button type='button'
                                        onClick={addCartHandle}
                                        variant='outlined'
                                    >Add to Cart</Button>
                                </Box>
                            </Box>
                        </Box>
                    </>
                )
                }
            </Container>
        </Box>
    );
}

export default SingleProduct;
