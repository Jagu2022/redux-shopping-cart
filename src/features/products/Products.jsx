import React from 'react'
import { useGetProductsApiQuery } from '../../service/products'
import { useDispatch } from 'react-redux'
import { add,getTotal } from '../cart/cartSlice'
import { useEffect } from 'react'
//import {useHistory} from "react-router"
//import { useHistory } from "react-router-dom";

function Products() {
    const dispatch = useDispatch()
   // const history = useHistory()
  // let history = useHistory();
//console.log(history)
    const {data, isLoading} = useGetProductsApiQuery()
    console.log(data)
    const handleBtn = (eachItem) =>{
        dispatch(add(eachItem))
      //  history.push('/cart')
    }
    
    
    
  return (
    <div>
        <h1>Products</h1>
        {isLoading ? <h3>loading...</h3> : (
            <ul className='products'>
                {
                    data && data.map((eachItem) => {
                        return (
                            <li key={eachItem.id}>
                                <img src= {eachItem.image} alt= {eachItem.title} width="100px"/>
                                <p>{eachItem.title}</p>
                                <p>price <i>${eachItem.price}</i></p>
                                <button className='addBtn' onClick={()=>handleBtn(eachItem)}>Add to cart</button>
                            </li>
                        )
                    })
                }
            </ul>
        )}
    </div>
  )
}

export default Products