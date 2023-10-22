import React, {useEffect, useState} from 'react'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'

export default function PerawatDashboard() {

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [hello, setHello] = useState([])




    useEffect(()=>{
        setToken(localStorage.getItem('token'))
    },[localStorage])

    useEffect(()=>{    
        getHello()
        console.log(hello)
    },[])

    const getHello = async () => {
        try {
            const res = await axios.get('/perawat',{
                headers: {
                 Authorization: `Bearer ${token}`
                }
            })
            setHello(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error.response.status)
            AuthorizationRoute(error.response.status)
        }
    }

  return (
    <div>

    </div>
  )
}
