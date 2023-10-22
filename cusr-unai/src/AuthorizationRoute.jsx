import React from 'react'
import { Navigate } from 'react-router-dom'


export default function AuthorizationRoute(statusCode) {
    if(statusCode === 401 || statusCode === 404){
        window.location.reload()
        localStorage.removeItem('token')
        return <Navigate to='/notfound'/>
    }
}
