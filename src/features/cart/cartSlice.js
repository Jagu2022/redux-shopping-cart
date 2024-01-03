import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-toastify"

const initialState = {
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        add:(state, action) => {
            const itemIndex = state.cartItems.findIndex( 
                (each) => each.id === action.payload.id)
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity++
                toast.info(`increased ${state.cartItems[itemIndex].title} cart quantity` ,{
                    position: "bottom-left"
                   }) 
            }else{
                const tempProd = {...action.payload, cartQuantity:1}
                state.cartItems.push(tempProd)
                toast.success(`${action.payload.title} added to cart` ,{
                    position: "bottom-left"
                   }) 
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        remove:(state, action) => {
            const newCart = state.cartItems.filter(item => item.id !== action.payload.id)
            toast.error(`${action.payload.title} remove from cart` ,{
                position: "bottom-left"
               }) 
            state.cartItems = newCart
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        decrement:(state, action) => {
            const itemIndex = state.cartItems.findIndex( 
                (each) => each.id === action.payload.id)

                if(state.cartItems[itemIndex].cartQuantity > 1) {
                    state.cartItems[itemIndex].cartQuantity--
                    toast.info(`decrease ${action.payload.title} cart quantity` ,{
                        position: "bottom-left"
                       }) 
                }else if (state.cartItems[itemIndex].cartQuantity === 1){

                    const newCart = state.cartItems.filter(item => item.id !== action.payload.id)

                    state.cartItems = newCart

                    toast.error(`${action.payload.title} remove from cart` ,{
                        position: "bottom-left"
                    }) 
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        clear:(state, action) => {
            state.cartItems = []
            toast.error(`Clear carted` ,{
                position: "bottom-left"
            }) 
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        getTotal:(state, action) => {
            let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem)=>{
                const {price, cartQuantity} = cartItem

                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                
                return cartTotal
            },{
                total:0, 
                quantity:0
            })
            state.cartTotalAmount = total,
            state.cartTotalQuantity = quantity
        }
    }
})
export const {add, remove, decrement, clear, getTotal} = cartSlice.actions
export default cartSlice.reducer