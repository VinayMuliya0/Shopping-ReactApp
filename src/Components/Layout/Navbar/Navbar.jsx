import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../../Images/Image/image'
import { colors } from '../../../style/colors'
import { Bar } from '../../../Images/Icons/icons'
import Container from '../Containre'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const { cart } = useSelector(state => state.product)
    const [activeTab, setActiveTab] = useState('home');
    console.log(activeTab);
    const singOut = () => {
        localStorage.setItem('user', JSON.stringify({ 'logged': false }))
    }
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const cartLength = (cart.filter(ele => ele?.email === JSON.parse(localStorage.getItem('user')).email)[0]?.carts)
    const navLinks = [
        // {
        //     page: 'Shop Page',
        //     link: '/shop-page'
        // },
        {
            page: 'Shop',
            link: '/'
        },
        {
            page: 'Comments List',
            link: '/Comments'
        },
        {
            page: 'Wishlists',
            link: '/lists'
        },
        {
            page: 'Contact Us',
            link: '/contact-us'
        },
    ];
    const settings = [
        {
            page: 'Profile',
            link: '/profile'
        },
        {
            page: 'My Orders',
            link: '/order-list'
        },
    ];
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (

        <header>
            <Container>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    // padding: '10px 20px',
                    '& nav': {
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginLeft: '20px'
                    },
                    '& .logo img': {
                        maxWidth: '100%',
                        height: 'auto',
                    },
                    '& ul': {
                        listStyle: 'none',
                        p: 0,
                        display: 'flex',
                        flexWrap: 'wrap',
                        margin: '0',
                        '& li': {
                            '&:not(:first-of-type)': {
                                marginLeft: '20px',
                            }
                        },
                    },
                    '& .link-tag': {
                        color: colors.basics.white,
                        textDecoration: 'none',
                        padding: '10px 0',
                        display: 'block'
                    },

                }}>
                    <Link className='logo' to="/"><img src={images.logo} width={90} alt="logo" /></Link>
                    <nav>
                        <Box sx={{
                            display: { lg: 'none', xs: 'flex' },
                            // '& .link-tag': {
                            //     color: colors.basics.white,
                            //     textDecoration: 'none',
                            //     padding: '10px 0',
                            //     display: 'block',
                            // },
                            '& svg': {
                                fill: colors.basics.white,
                                width: '30px',
                                height: 'auto'
                            }
                        }}>

                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                                sx={{
                                    '&': {
                                        padding: '0'
                                    }
                                }}
                            >
                                <Bar />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                    '& ul': {
                                        width: 'auto !important'
                                    },
                                    '& .link-tag': {
                                        color: colors.basics.white,
                                        textDecoration: 'none',
                                        padding: '10px 0',
                                        display: 'block',
                                    },
                                    '& li': {
                                        padding: '0 !important'
                                    }
                                }}
                            >
                                {navLinks.map((nav) => (
                                    <MenuItem key={nav.link} sx={{
                                        '& a': {
                                            color: activeTab === nav.page ? "#00bbff" : colors.basics.white 
                                        }
                                    }} >
                                        <Link className='link-tag' onClick={() => handleTabClick(nav.page)} to={nav.link}>{nav.page}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{
                            display: { lg: 'flex', xs: 'none' },

                        }}>
                            <ul>
                                {navLinks.map((nav) => (
                                    <li key={nav.link}>
                                        <Link className='link-tag' onClick={() => handleTabClick(nav.page)} style={{color: activeTab === nav.page ? "#00bbff" : colors.basics.white }} to={nav.link}>{nav.page}</Link>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                        <Box className='cart-icon' sx={{ ml: 'auto', mr: '20px', position: 'relative', '& img': { width: '30px' } }}>
                            <Link to='/cart' onClick={() => handleTabClick('/cart')}>
                                <img src={images.cart} style={{ maxWidth: '100%', height: 'auto' }} alt="cart" />
                                <Typography variant="caption" color="initial"
                                    sx={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-10px',
                                        backgroundColor: activeTab === '/cart' ? "#00bbff" : colors.basics.white,
                                        width: '25px',
                                        height: '25px',
                                        borderRadius: '50px',
                                        textAlign: 'center',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    // }}>0</Typography>
                                    }}>{cartLength ? (cartLength?.length > 9 ? <span>9<sup>+</sup></span> : cartLength?.length) : 0}</Typography>
                            </Link>
                        </Box>
                        <Box sx={{
                            width: 'auto',
                        }}>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={images.logo} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        mt: '45px',
                                        '& ul': {
                                            width: 'auto !important'
                                        },
                                        '& li': {
                                            padding: '0 !important'
                                        },
                                        '& .link-tag': {
                                            color: colors.basics.white,
                                            textDecoration: 'none',
                                            padding: '10px 0',
                                            display: 'block'
                                        },
                                    }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.link}>
                                            <Link className='link-tag' to={setting.link}>{setting.page}</Link>
                                        </MenuItem>
                                    ))}
                                    <Link className='link-tag' onClick={singOut} style={{ color: colors.basics.danger, fontWeight: '500' }} to="/signin">Sign Out</Link>
                                </Menu>
                            </Box>
                        </Box>
                    </nav>
                </Box>
            </Container>
        </header>

    )
}

export default Navbar
