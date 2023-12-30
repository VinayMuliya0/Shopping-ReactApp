import { TableCell, TableRow, Button } from '@mui/material'
import React from 'react'
import QutBox from './QutBox'
import { useState } from 'react'
import { Trash } from '../Images/Icons/icons'
import { useDispatch, useSelector } from 'react-redux'
import {  editToCart } from '../redux/features/product/product'
import { useNavigate } from 'react-router-dom'

const CartTableRow = ({ item, index }) => {
    const [qnt, setQnt] = useState(item.quantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector(state => state.product)
    let localUser = JSON.parse(localStorage.getItem('user')).email;
    console.log("cart:- ", cart)

    const plusQut = () => {
        setQnt(qnt + 1)
        console.log(qnt)
        // const itemWithQuantity = { ...item, quantity: Number(qnt) };
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
                } 
            } else {
                return cartItem;
            }
        })));
        // dispatch(editToCart(cart.map(cartItem => {
        //     if (cartItem.id === item.id) {
        //         return {
        //             ...cartItem,
        //             quantity: Number(qnt+1)
        //         };
        //     }
        //     return cartItem;
        // })))
        // navigate(`/shop/product/${item.id}`)
        
    }
    const minusQut = () => {
        if (qnt > 1) {
            setQnt(qnt - 1)
            console.log(qnt)
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
                                    return { ...itemsd, quantity: Number(itemsd.quantity - 1) };
                                } else {
                                    return itemsd;
                                }
                            }),
                        };
                    } 
                } else {
                    return cartItem;
                }
            })));
            // dispatch(editToCart(cart.map(cartItem => {
            //     if (cartItem.id === item.id) {
            //         return {
            //             ...cartItem,
            //             quantity: Number(qnt-1)
            //         };
            //     }
            //     return cartItem;
            // })))
            // console.log("cart:- ", cart)
        }
    }
    const removeProduct = () => {
        console.log(item.id);
        dispatch(editToCart(cart.map(cartItem => {
            if (cartItem.email === localUser) {
                // Check if the item already exists in the cart
                const existingItem = cartItem.carts.find(cart => cart.id === item.id);
                if (existingItem) {
                    // If the item exists, update the quantity
                    return {
                        ...cartItem,
                        carts: cartItem.carts.filter(ele => ele.id !== item.id)
                    };
                } 
            } else {
                return cartItem;
            }
        })));
        // dispatch(editToCart(cart.filter(ele => ele.id !== item.id)))
    }
    return (
        <>
            <TableRow sx={{ '&:last-child td': { border: 0 } }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell sx={{'& img': {
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '5px'
                }}}><img src={item.thumbnail} width={60} height={60} alt="product-img" /></TableCell>
                <TableCell onClick={()=> navigate(`/product/${item.id}`)} sx={{cursor:'pointer'}}>{item.title}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell><QutBox plusQut={plusQut} qut={qnt} minusQut={minusQut} /></TableCell>
                <TableCell>${item.price * qnt}</TableCell>
                <TableCell><Button variant="text" color="primary" sx={{ p: 0 }} onClick={removeProduct}><Trash /></Button></TableCell>
            </TableRow>
        </>
    )
}

export default CartTableRow
