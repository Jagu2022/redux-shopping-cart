import React from 'react'
import { Outlet } from 'react-router-dom'
import Head from './components/Head'
import './index.css'
import "react-toastify/dist/ReactToastify.css"
import { Provider } from 'react-redux'
import { store } from './store/store'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <div>
        <Head/>
        <Outlet/>
      </div>
    </Provider>
    
  )
}

export default App