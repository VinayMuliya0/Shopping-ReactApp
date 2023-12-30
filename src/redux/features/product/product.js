import { createSlice } from "@reduxjs/toolkit"

const int = {
    wishList: [],
    cart: [],
    productsList: [],
    information: [],
    orderList: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: int,
    reducers :{
        addWishList: (state, { payload }) => {
            state.wishList = [...state.wishList , payload]
        },
        removeWishList : (state, {payload}) => {
            state.wishList = payload;
        },
        addToCart : (state, {payload}) => {
            state.cart = [...state.cart , payload]
        },
        editToCart : (state, {payload}) => {
            state.cart = payload
        },
        removeCart : (state) => {
            state.cart = []
        },
        setProducts : (state, {payload}) => {
            state.productsList = payload
        },
        setInformation : (state, {payload}) => {
            state.information = payload
        },
        addOrderList : (state, {payload}) => {
            state.orderList = [...state.orderList , payload]
        },
        setOrderList : (state, {payload}) => {
            state.orderList =  payload
        }
    }
})


export const { addWishList, removeWishList, addToCart, editToCart, setProducts, setInformation, addOrderList, setOrderList, removeCart } = productSlice.actions
export default productSlice.reducer