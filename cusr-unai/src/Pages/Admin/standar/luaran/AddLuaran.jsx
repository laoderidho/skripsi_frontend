import React from 'react'
import Sidebar from '../../../../components/menu/Sidebar'
import { Breadcrumb, Form, Button } from 'react-bootstrap'

const AddLuaran = () => {
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Luaran</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/luaran">Luaran</Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Form.Group>
          <Form.Label>Kode Luaran</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Kode Luaran"
            className="w-80 mb-3"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Kode Luaran</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Kode Luaran"
            className="w-80 mb-3"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Kode Luaran</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: "7rem" }}
            type="text"
            placeholder="Masukkan Kode Luaran"
            className="w-80 mb-3"
          />
        </Form.Group>

        <div className='d-flex justify-content-end'>
            <Button variant="primary" type="submit" className='bg-primary' size='lg'>Submit</Button>
        </div>
      </Form>
    </Sidebar>
  );
}

export default AddLuaran