import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../components/menu/Login'
import Sidebar from '../components/menu/Sidebar'
import DaftarPasien from '../components/menu/DaftarPasien'
import Autocomplete from '../components/menu/Autocomplete'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/daftarpasien" element={<DaftarPasien/>}/>
        <Route path="/autocomplete" element={<Autocomplete/>}/>
      </Routes>
    </BrowserRouter>
  )
}
