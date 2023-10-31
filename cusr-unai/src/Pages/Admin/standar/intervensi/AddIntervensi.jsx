import React from 'react'
import Sidebar from '../../../../components/menu/Sidebar'
import { Breadcrumb, Form, Button } from 'react-bootstrap'

const AddIntervensi = () => {
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Intervensi</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/intervensi">Diagnosa</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Form.Group className="w-80 mb-3">
          <Form.Label>Kode Intervensi</Form.Label>
          <Form.Control type="text" placeholder="Masukkan Kode Intervensi" />
        </Form.Group>
        <Form.Group className="w-80 mb-3">
          <Form.Label>Nama Intervensi</Form.Label>
          <Form.Control type="text" placeholder="Masukkan Nama Intervensi" />
        </Form.Group>

        <h3 className="mb-3 mt-3">Tindakan</h3>
        <Form.Group className="w-80 mb-3">
          <Form.Label>Observasi</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Masukkan Observasi dari intervensi ini"
            style={{ height: "7rem" }}
          />
        </Form.Group>

        <Form.Group className="w-80 mb-3">
          <Form.Label>Teraupetik</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Masukkan Teraupetik dari intervensi ini"
            style={{ height: "7rem" }}
          />
        </Form.Group>

        <Form.Group className="w-80 mb-3">
          <Form.Label>Edukasi</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Masukkan Edukasi dari intervensi ini"
            style={{ height: "7rem" }}
          />
        </Form.Group>

        <Form.Group className="w-80 mb-3">
          <Form.Label>Kolaborasi</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Masukkan Kolaborasi dari intervensi ini"
            style={{ height: "7rem" }}
          />
        </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" className="mt-3 bg-primary" size='lg'>
          Submit
        </Button>
      </div>
      </Form>
    </Sidebar>
  );
}

export default AddIntervensi