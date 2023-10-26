import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'


const Logout = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')


    useEffect(()=>{
        return () => Logout()
    }, [])

    const Logout = async ()=>{
        try {
            await axios.get('/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('token')
            navigate('/login')
        } catch (error) {
            AuthorizationRoute(error.response.status)
        }
    }
}

export default Logout