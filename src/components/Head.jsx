import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Head() {
  const cart = useSelector(state => state.cart)
  console.log(cart)
  useEffect(()=>{
   cart.cartTotalQuantity
   console.log(cart.cartTotalQuantity)
  },[cart.cartTotalQuantity])

  return (
    <div className='head'>
        <div>
            <Link to="/">store</Link>
        </div>
        <div>
            <Link to="cart">cart</Link>
        </div>
    </div> 
  )
}
