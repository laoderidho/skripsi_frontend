import React from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Breadcrumb, Form, Row, Col, Button } from 'react-bootstrap'

const AddPasien = () => {
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Pasien</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/daftarpasien">
            Tambah Pasien
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Nama Lengkap" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control type="date" placeholder="Masukkan Nama Lengkap" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select type="text" placeholder="Tentukan Jenis Kelamin">
                <option>Pilih</option>
                <option value="1">Laki Laki</option>
                <option value="0">Perempuan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Nomor Telepon" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                style={{ height: "7rem" }}
                type="text"
                placeholder="Masukkan Nomor Telepon"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Status Pernikahan</Form.Label>
              <Form.Select type="text" placeholder="Tentukan Jenis Kelamin">
                <option>Pilih</option>
                <option value="0">Belum Menikah</option>
                <option value="1">Sudah Menikah</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>NIK</Form.Label>
              <Form.Control type="text" placeholder="Masukkan NIK" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alergi</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Alergi" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nama Asuransi</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Alergi" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nomor Asuransi</Form.Label>
              <Form.Control type="text" placeholder="Masukkan Alergi" />
            </Form.Group>
          </Col>
        </Row>

        <div className='d-flex justify-content-end mt-3'>
          <Button variant='primary' className='btn btn-primary' size='lg'>Tambah</Button>
        </div>
      </Form>
    </Sidebar>
  );
}

export default AddPasien