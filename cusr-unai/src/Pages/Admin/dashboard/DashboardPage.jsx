import React,{useState, useEffect} from 'react'
import axios from '../../../axios'
import AuthorizationRoute from '../../../AuthorizationRoute'
import Sidebar from '../../../components/menu/Sidebar'

export default function DashboardPage() {

    const [users, setUsers] = useState([])

    const getDataUser = async (token) => {
        try {
        await axios
            .get("/admin", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
            setUsers(res?.data?.data);
            });
        } catch (error) {
            AuthorizationRoute(error.response.status);
        }
  };

  useEffect(()=>{
    return () => getDataUser(localStorage.getItem('token'))
  }, [])


  return (
    <>
      <Sidebar>
        {users.map((item, index) => (
          <div key={index}>
            <h1>{item.nama}</h1>
          </div>
        ))}
      </Sidebar>
    </>
  );
}
