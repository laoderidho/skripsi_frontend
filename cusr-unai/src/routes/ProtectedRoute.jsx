import React, {useState, useEffect} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'

export default function ProtectedRoute() {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const location = useLocation()

    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    }, [localStorage])

    if(token === null || token === "undefined"){
        return <Navigate to="/login" state={location.pathname} replace />
    }else{
        return <Outlet/>
    }
}
