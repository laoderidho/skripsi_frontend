import React, { useState } from 'react';
import { Button, Table, Modal, Form, Accordion } from "react-bootstrap";
import Sidebar from '../../../components/menu/Sidebar'

const KeteranganAskep = () => {
  const [tables, setTables] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [showTime, setShowTime] = useState(false);

  const handleTambah = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(true);
  };

  const getFormattedDateTime = () => {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date().toLocaleString("id-ID", options).replace(","," -");
  }

  const handleSimpan = () => {
    // Tambahkan tabel baru ke dalam array tables
    setTables([...tables, { user: loggedInUser, id: Date.now(), data: formData }]);
    // Reset formData dan tutup modal
    setFormData({});
    setShowModal(false);
    setShowTime(true);
  };

  const handleChange = (e) => {
    // Handle perubahan input formulir
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Sidebar>
        <div className="App">
      <h1> {loggedInUser || "Tamu"}</h1>
      <Button onClick={handleTambah} className='btn d-flex justify-content-center align-items-center blue-button-lg mt-1'>Tambah</Button>

      {tables.map((table, date, index) => (
        <div key={table.id}>
          <div className='flexbox justify-content'>
            <span>User: {table.user}</span>
            <span className='flex-end'>No: </span>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Keterangan</th>
                <th>Tanggal/Jam</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{getFormattedDateTime()}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}

      {/* Modal untuk formulir */}
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" centered>
      <Modal.Header closeButton={false}>
        <Modal.Title>Formulir Tambah Tabel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          {/* Accordion 1 */}
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion 1</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group controlId="formDescription1">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    name="keterangan"
                    value={formData.keterangan || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Tambahkan formulir lainnya sesuai kebutuhan */}
              </Form>
              <Button variant="primary" onClick={handleSimpan}>
                Simpan Accordion 1
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          {/* Accordion 2 */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion 2</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group controlId="formDescription2">
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan keterangan"
                    name="keterangan"
                    value={formData.keterangan || ''}
                    onChange={handleChange}
                  />
                </Form.Group>
                {/* Tambahkan formulir lainnya sesuai kebutuhan */}
              </Form>
              <Button variant="primary" onClick={handleSimpan}>
                Simpan Accordion 2
              </Button>
            </Accordion.Body>
          </Accordion.Item>

          {/* Tambahkan dua Accordion lainnya sesuai kebutuhan */}
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        {/* Button Simpan Modal (di luar Accordion) */}
        <Button variant="primary" onClick={handleSimpan}>
          Simpan Modal
        </Button>
      </Modal.Footer>
    </Modal>
    </div>  
    </Sidebar>
  );
};

export default KeteranganAskep;
