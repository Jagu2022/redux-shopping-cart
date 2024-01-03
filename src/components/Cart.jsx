import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from "react-router-dom"
import { add, clear, decrement, getTotal, remove } from '../features/cart/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
    console.log(cart)

    useEffect(()=>{
      dispatch(getTotal())
    },[cart,dispatch])

  return (
    <div className='cart-main'>
      {cart.cartItems.length === 0 ? (
        <div className='empty-cart'>
          <h3 >Cart is empty</h3>
          <Link to='/'> Start Shopping</Link>
        </div>
      ) : (
        <div>
          <h3 className='shopping-cart'>Shopping Cart</h3>
          <div>
            <div className='shopping-details'>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
            </div>
            <div className='start'>
              {
                cart.cartItems.map((eachItem) => {
                  return(
                    <div key={eachItem.id}>
                      <div>
                        <div className='item-cart'>
                          <div>
                            <img src={eachItem.image}/>
                          </div>
                          <div className='item-details'>
                            <h3>{eachItem.title}</h3>
                            <p>{eachItem.category}</p>
                            <button className='remove' onClick={()=>dispatch(remove(eachItem))}>Remove</button>
                          </div>
                          <div className='price'>
                            <p>{eachItem.price}</p>
                          </div>
                          <div className='border'>
                            <button onClick={()=>dispatch(add(eachItem))}>+</button>
                            <p>
                              {eachItem.cartQuantity}
                            </p>
                              <button className='btn' onClick={() => dispatch(decrement(eachItem))}>-</button>
                          </div>
                          <div>
                            <p>{eachItem.price * eachItem.cartQuantity}</p>
                          </div>
                        </div>
                      </div>
                    </div> 
                  )
                })
              }
            </div>
          </div>
          <div className='checkout'>
                        <div>
                          <button className='clear' onClick={() => dispatch(clear())}>Clear</button>
                        </div>
                        <div>
                          <p>Sub Total $ {cart.cartTotalAmount}</p>
                          <button className='checkout'>Check Out</button>
                          <Link to="/">Countinue Shopping</Link>
                        </div>
                      </div>
        </div>
      )}

    </div>
  )
}

export default Cart