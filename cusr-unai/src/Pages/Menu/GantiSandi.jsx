import React,{useEffect, useState} from 'react'
import Sidebar from '../../components/menu/Sidebar'
import {Form, Button} from 'react-bootstrap'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/menu/ConfirmModal'


const GantiSandi = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  const submitChangePassword = async () =>{
    try {
      const res = await axios.post(
        "/update-password",
        {
          currentpassword: oldPassword,
          password: newPassword,
          confirmpassword: confirmPassword,
        },
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message)
      navigate('/login')
    } catch (error) {
        // AuthorizationRoute(error.response.status)
        alert(error.response.data.message)
    }
  }

  useEffect(()=>{
    
  }, [message])

  return (
    <Sidebar>
      <h2 className='container'>Ganti Kata Sandi</h2>

      <div
        className="container mt-3"
      >
        <Form.Group className="">
          <Form.Label id='form-label'>Kata Sandi Lama</Form.Label>
          <Form.Control
            id='form-control-input'
            type="password"
            placeholder="Masukkan kata sandi lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className=''>
          <Form.Label id='form-label'>Kata Sandi Baru</Form.Label>
          <Form.Control
            id='form-control-input'
            type="password"
            placeholder="Masukkan kata sandi baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        

        <Form.Group className="">
          <Form.Label id='form-label'>Konfirmasi Kata Sandi Baru</Form.Label>
          <Form.Control
            id='form-control-input'
            type="password"
            placeholder="Masukkan Konfirmasi kata sandi baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

          <div className='d-flex justify-content-start mt-3'>
            <ConfirmModal
                  onConfirm={submitChangePassword}
                  successMessage={"Kata sandi berhasil diubah"}
                  cancelMessage={"Kata sandi gagal diubah"}
                  buttonText={"Ubah Sandi"}
                  to={`/login`}
                />
          </div>


      </div>
    </Sidebar>
  );
}

export default GantiSandi