import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../components/menu/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login"  element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}
