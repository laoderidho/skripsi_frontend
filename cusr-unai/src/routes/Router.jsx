import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../components/menu/Login'
import Sidebar from '../components/menu/Sidebar'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/sidebar" element={<Sidebar/>}/>
      </Routes>
    </BrowserRouter>
  )
}
