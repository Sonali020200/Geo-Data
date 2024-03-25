import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import Map from '../Pages/Map'
import Upload from '../Pages/Upload'
import About from '../Pages/About'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/mapView' element = {<Map/>}></Route>
        <Route path='/upload' element = {<Upload/>}></Route>
        <Route path='/About' element = {<About/>}></Route>
    </Routes>
  )
}

export default AllRoutes
