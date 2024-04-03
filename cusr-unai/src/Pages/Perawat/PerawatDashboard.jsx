import React, {useEffect, useState} from 'react'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'
import Sidebar from '../../components/menu/Sidebar'
import { Container } from 'react-bootstrap'


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
        
        }
    }

  return (
    <Sidebar
        title='DASHBOARD'>

        <div className='container pt-3'>
            <Container className='dashboard-box'>
                
            </Container>
        </div>

        <div className='container pt-3'>
            <span id='form-label'>Selesaikan rekam medis:</span>
            <Container className='dashboard-box-layout'>

            </Container>
        </div>
    </Sidebar>
  )
}
