import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import MapView from '../Pages/MapView'
import Upload from '../Pages/Upload'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/mapView' element = {<MapView/>}></Route>
        <Route path='/upload' element = {<Upload/>}></Route>
    </Routes>
  )
}

export default AllRoutes
