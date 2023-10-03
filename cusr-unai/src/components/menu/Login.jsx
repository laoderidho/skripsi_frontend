import React from 'react'
import {Form, Button} from 'react-bootstrap'


export default function login() {
  return (
    <div className="blue-login d-flex justify-content-center align-items-center">
      <div class="card-login bg-white rounded">
      <div class="image-logo container pt-5 pb-3 d-flex justify-content-evenly">
          <img src="./assets/img/logo.svg" alt="tes" className='w-40'/>
          <strong className='pt-2'>Klinik Universitas Advent Indonesia</strong>
      </div>
      <Form className='container'>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className='pt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter username" />
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100 mt-3'>
          Login
        </Button>
        </Form>
      </div>
    </div>
  );
}
