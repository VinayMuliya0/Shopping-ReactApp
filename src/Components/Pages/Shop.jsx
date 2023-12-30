import React, { useEffect, useState } from 'react'
import Container from '../Layout/Containre'
import { Box, Typography, TextField, Button, MenuItem, Select, Slider, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import axios from 'axios'
import { colors } from '../../style/colors'
import Product from '../Product'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../redux/features/product/product'

const Shop = () => {
    const [search, setSearch] = useState('');
    const [categoryS, setCategory] = useState('');
    const [ratings, setRatings] = useState('');
    const [rangeValue, setRangeValue] = React.useState([]);
    const [minValue, setMinValue] = React.useState();
    const [maxValue, setMaxValue] = React.useState();
    const { productsList } = useSelector(state => state.product)
    const productAPI = 'https://dummyjson.com/products?limit=100'
    // const productAPI = '../JSON/states.json'
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    console.log('selector', selector);

    const radioButtons = [];
    console.log('ratings', ratings);
    for (let i = 0; i < 5; i++) {
        radioButtons.push(
            <FormControlLabel
                key={i}
                value={i + 1}
                control={<Radio />}
                sx={{
                    '& .MuiTypography-root': {
                        fontSize: '16px',
                    }
                }}
                label={i + 1 + ' star out of ' + 5}
            />
        );
    }


    // setRangeValue([minValue, maxValue])

    const selectCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleChangeRange = (event, newValue) => {
        console.log('newValue', newValue);
        setRangeValue(newValue)
    };

    const ratingChangeHandle = (e) => {
        console.log(e.target.value);
        setRatings(e.target.value)
    }
    const resetFun = () => {
        setCategory('')
        setRangeValue([minValue, maxValue])
        setSearch('')
        setRatings('')
    }

    console.log(rangeValue[0]);

    // console.log(data)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(productAPI);
                // setData(response.data.products);
                const minMax = response.data.products.map((items) => {
                    return items.price
                });
                const minValue = Math.min(...minMax);
                const maxValue = Math.max(...minMax);
                setRangeValue([minValue, maxValue])
                setMinValue(minValue)
                setMaxValue(maxValue)
                dispatch(setProducts(response.data.products));
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        // setUserLogged(user !== null)
        fetchData();
    }, [dispatch]);
    return (
        <>
            <Container>
                <Box sx={{ padding: '30px 0' }}>
                    <Box className="sidebar">
                        <Typography variant="h1" color={colors.basics.white} sx={{ textAlign: 'start', mb: '40px' }}>Shop </Typography>
                    </Box>
                    <Box className="product-page" sx={{ minHeight: 'calc(100vh - 308px)' }}>

                        <Box sx={{
                            display: 'flex',
                            gap: '40px',
                            justifyContent: 'space-between'
                        }}>
                            <Box className="sidebar-filter"
                                sx={{
                                    width: '230px',
                                }}>
                                <Box sx={{
                                    position: 'sticky',
                                    top: '90px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    height: 'calc(100vh - 90px)',

                                }}>
                                    <Typography variant="h5" color="white" sx={{ borderBottom: '1px solid #717171', pb: '15px', mb: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>Filters
                                        {((categoryS !== '') || (minValue !== rangeValue[0] || maxValue !== rangeValue[1]) || (search !== '') || (ratings !== '')) &&
                                            <Button variant="text" onClick={() => { resetFun() }} sx={{ width: 'auto', padding: '0' }} color="primary">Reset</Button>
                                        }
                                    </Typography>
                                    <Box sx={{ mb: '30px' }}>
                                        <Typography variant="body2" color="white">Category</Typography>
                                        <Box sx={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            '& button': {
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                                borderRadius: '6px'
                                            }
                                        }}>
                                            <Select
                                                value={categoryS}
                                                onChange={(e) => selectCategory(e)}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                sx={{
                                                    border: '1px solid #fff',
                                                    color: colors.basics.white,
                                                    width: '100%',
                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        border: '0 !important',
                                                    },
                                                    '& .MuiSelect-select': {
                                                        border: '0 !important',
                                                        padding: '8px 18px',
                                                        fontSize: '16px'
                                                    }
                                                }}
                                            >
                                                <MenuItem value=''>None</MenuItem>
                                                {[...new Set(productsList.map(item => item.category))].map((category, index) => (
                                                    <MenuItem sx={{ padding: '8px 10px' }} key={index + '0'} value={category}>{category}</MenuItem>
                                                ))}
                                            </Select>
                                            {/* {[...new Set(productsList.map(item => item.category))].map((category, index) => (
                                                <Button variant="outlined" key={index + '1'} onClick={() => { setCategory(category) }} type='button' color="primary"
                                                    sx={{
                                                        backgroundColor: categoryS === category && '#fff',
                                                        color: categoryS === category && '#000',
                                                        '&:hover': {
                                                            backgroundColor: categoryS === category && '#fff',
                                                            color: categoryS === category && '#000',
                                                        }
                                                    }}>
                                                    {category}
                                                </Button>
                                            ))} */}
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: '30px' }}>
                                        <Typography variant="body2" color="white">Price Range</Typography>
                                        <Box sx={{
                                            marginTop: '10px',
                                            margin: '0 15px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            '& button': {
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                                borderRadius: '6px'
                                            }
                                        }}>
                                            <Slider
                                                getAriaLabel={() => 'Temperature range'}
                                                value={rangeValue}
                                                min={minValue}
                                                step={1}
                                                max={maxValue}
                                                onChange={handleChangeRange}
                                                valueLabelDisplay="auto"
                                            />
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                width: '100%'
                                            }}>
                                                <Typography variant="body2" color="white">Min: {rangeValue[0]}</Typography>
                                                <Typography variant="body2" color="white">Max: {rangeValue[1]}</Typography>

                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mb: '30px' }}>
                                        <Typography variant="body2" color="white">Ratings</Typography>
                                        <Box sx={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            '& button': {
                                                padding: '5px 10px',
                                                fontSize: '12px',
                                                borderRadius: '6px'
                                            }
                                        }}>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={ratings}
                                                name="radio-buttons-group"
                                                onChange={(e) => { ratingChangeHandle(e) }}
                                                sx={{
                                                    '& .MuiFormControlLabel-root ': {
                                                        margin: '0 0 10px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    },
                                                    '& .MuiRadio-root': {
                                                        padding: 0,
                                                        marginRight: '10px',
                                                    },
                                                    '& .PrivateSwitchBase-input:checked': {
                                                        '& ~ span svg ': {
                                                            fill: '#00bbff',
                                                        }
                                                    },
                                                    '& svg': {
                                                        fill: '#fff'
                                                    }
                                                }}
                                            >
                                                {radioButtons}
                                            </RadioGroup>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="shop-wrapper"
                                sx={{
                                    flexShrink: '0',
                                    width: 'calc(100% - 270px)'
                                }}>
                                <Box className="search-bar"
                                    sx={{
                                        marginBottom: '30px',
                                        gridColumn: '1 / -1',
                                        '& label': {
                                            fontSize: '18px',
                                            fontWeight: '500',
                                            paddingBottom: '10px',
                                            display: 'block'
                                        }
                                    }}>
                                    <label htmlFor='search'>Search Product</label>
                                    <TextField
                                        id="search"
                                        placeholder='ex:- $478, Vivo, iPhone X'
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}
                                    />
                                </Box>
                                <Typography variant="body2" color="white" textAlign={'end'} mb="30px">
                                    Total Products:- &nbsp;
                                    {productsList.filter(item =>
                                        (item.title.toLowerCase().includes(search) || item.price.toString().includes(search)) &&
                                        (categoryS === '' || item.category === categoryS) &&
                                        (item.price >= rangeValue[0] && item.price <= rangeValue[1]) &&
                                        (Math.ceil(item.rating) <= ratings || ratings === '')
                                    ).length}
                                </Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                                    gap: '20px',
                                }}>

                                    {productsList.length !== 0 ? (
                                        <>

                                            {productsList.filter(item =>
                                                (item.title.toLowerCase().includes(search) || item.price.toString().includes(search)) &&
                                                (categoryS === '' || item.category === categoryS) &&
                                                (item.price >= rangeValue[0] && item.price <= rangeValue[1]) &&
                                                (Math.ceil(item.rating) <= ratings || ratings === '')
                                            ).map((item, index) => (

                                                <Box key={index}>
                                                    <Product item={item}></Product>
                                                </Box>

                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <Typography variant="h5" sx={{ gridColumn: '1 / span 4', textAlign: 'center', color: "white" }} >Loading.....</Typography>
                                        </>
                                    )}
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Shop
