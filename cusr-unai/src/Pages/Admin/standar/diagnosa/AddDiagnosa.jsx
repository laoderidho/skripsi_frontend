import React from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button } from "react-bootstrap";

const AddDiagnosa = () => {
  return (
    <Sidebar>
      <div className="container">
        <h2>Tambah Diagnosa</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/Diagnosa">Diagnosa</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Kode Diagnosa</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Kode Diagnosa" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>penyebab Fisiologis</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Fisiologis"
              style={{ height: "7rem" }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Nama Diagnosa</Form.Label>
            <Form.Control type="text" placeholder="Masukkan Nama Diagnosa" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>penyebab Situasional</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Situasional"
              style={{ height: "7rem" }}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col}>
            <Form.Label>Penyebab Fisiologis</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Fisiologis"
              style={{ height: "7rem" }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>penyebab Fisiologis</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Penyebab Fisiologis"
              style={{ height: "7rem" }}
            />
          </Form.Group>
        </Row>

        <Row className="mt-5">
          <Form.Group as={Col}>
            <h4>Gejala Mayor</h4>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan gejala Subjektif"
              style={{ height: "7rem" }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <h4>Gejala Minor</h4>
            <Form.Label>Subjektif</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Subjektif"
              style={{ height: "7rem" }}
            />
          </Form.Group>
        </Row>

        <Row className="mt-5">
          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan gejala Subjektif"
              style={{ height: "7rem" }}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Objektif</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Masukkan Gejala Subjektif"
              style={{ height: "7rem" }}
            />
          </Form.Group>
        </Row>
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" className="bg-primary mt-5" size="lg">Submit</Button>
      </div>
      </Form>
    </Sidebar>
  );
};

export default AddDiagnosa;
