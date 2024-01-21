import React,{useEffect, useState} from 'react'
import Sidebar from '../../components/menu/Sidebar'
import {Form, Button} from 'react-bootstrap'
import axios from '../../axios'
import AuthorizationRoute from '../../AuthorizationRoute'
import { useNavigate } from 'react-router-dom'

const PerawatGantiSandi = () => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  const submitChangePassword = async (e) =>{
    e.preventDefault()
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message)
      navigate('/login')
    } catch (error) {
        AuthorizationRoute(error.response.status)
    }
  }

  useEffect(()=>{
    
  }, [message])

  return (
    <Sidebar>
      <h2 className="text-center">Ganti Kata Sandi</h2>

      <Form
        onSubmit={submitChangePassword}
        className="container"
      >
        <Form.Group className="mt-5">
          <Form.Label>Kata Sandi Lama</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan kata sandi lama"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-5">
          <Form.Label>Kata Sandi Baru</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan kata sandi baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Konfirmasi Kata Sandi Baru</Form.Label>
          <Form.Control
            type="password"
            placeholder="Masukkan Konfirmasi kata sandi baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" className="btn d-flex justify-content-center align-items-center blue-button-lg mt-4">
          Simpan
        </Button>
      </Form>
    </Sidebar>
  );
}

export default PerawatGantiSandi