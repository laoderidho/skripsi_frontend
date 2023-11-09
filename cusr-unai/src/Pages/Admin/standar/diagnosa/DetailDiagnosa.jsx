import React, { useEffect, useState } from "react";
import Sidebar from "../../../../components/menu/Sidebar";
import { Breadcrumb, Form, Col, Row, Button, Modal} from "react-bootstrap";
import { useNavigate, useParams, Link } from 'react-router-dom'
import AuthorizationRoute from '../../../../AuthorizationRoute'
import axios from '../../../../axios'

const DetailDiagnosa = () => {

  const [kode_diagnosa, setKodeDiagnosa] = useState("");
  const [nama_diagnosa, setNamaDiagnosa] = useState("");
  const [faktor_risiko, setFaktorRisiko] = useState("");
  const [penyebab_fisiologis, setPenyebabFisiologis] = useState("");
  const [penyebab_situasional, setPenyebabSituasional] = useState("");
  const [penyebab_psikologis, setPenyebabPsikologis] = useState("");
  const [gejala_mayor_subjektif, setGejalaMayorSubjektif] = useState("");
  const [gejala_mayor_objektif, setGejalaMayorObjektif] = useState("");
  const [gejala_minor_subjektif, setGejalaMinorSubjektif] = useState("");
  const [gejala_minor_objektif, setGejalaMinorObjektif] = useState("");
  const {id} = useParams();
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [diagnosa, setDiagnosa] = useState([]);

  const getDiagnosa = async (token) => {
    try {
      await axios.post(`/admin/diagnosa`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        console.log(res)
        setDiagnosa(res?.data?.data);
      }) 
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getDataById();
    getDiagnosa(localStorage.getItem('token'))
  },[]);

  const getDataById = async () => {
    try {
        const res = await axios.post(`/admin/detail/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setKodeDiagnosa(res.data.data.kode_diagnosa)
        setNamaDiagnosa(res.data.data.nama_diagnosa)
        setFaktorRisiko(res.data.data.faktor_risiko)
        setPenyebabFisiologis(res.data.data.penyebab_fisiologis)
        setPenyebabSituasional(res.data.data.penyebab_situasional)
        setPenyebabPsikologis(res.data.data.penyebab_psikologis)
        setGejalaMayorSubjektif(res.data.data.gejala_mayor_subjektif)
        setGejalaMayorObjektif(res.data.data.gejala_mayor_objektif)
        setGejalaMinorSubjektif(res.data.data.gejala_minor_subjektif)
        setGejalaMinorObjektif(res.data.data.gejala_minor_objektif)
        console.log(res)
    } catch (error) {
        
    }
  };



  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const deleteDiagnosa = async () => {
    try {
        await axios.post(`/admin/diagnosa/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
    } catch (error) {
        
    }
  };

  
  
  return (
    <Sidebar>
      <div className="container">
        <h2>{kode_diagnosa} - {nama_diagnosa}</h2>
        <Breadcrumb>
          <Breadcrumb.Item href="/admin/standarkeperawatan/diagnosis">Diagnosis</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Tambah
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Form className="container mt-5">
        <Row>
          <Form.Group as={Col}>
            <Form.Label id="bold-font" className="mt-4" >Kode Diagnosis</Form.Label>
            <p style={{ color:  '#ff0000', fontWeight:  'bold' }} >
                {kode_diagnosa}
              </p>
          </Form.Group>

          <hr></hr>

          <Form.Group as={Col} >
            {/* Empty */}
          </Form.Group>
        </Row>

        <Row>
        <Form.Group as={Col}>
            <Form.Label id="bold-font" className="mt-4">Nama Diagnosis</Form.Label>
            <p >
              {nama_diagnosa}
              </p>
          </Form.Group>

          <hr></hr>
          <Form.Group>
            {/* Empty */}
          </Form.Group>
        </Row> 
        
        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">Faktor Risiko</Form.Label>
              <ul>
                {faktor_risiko && faktor_risiko.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
          <h4 className="mt-3">Penyebab</h4>
            <Form.Label id="bold-font" className="mt-4">Penyebab Fisiologis</Form.Label>
              <ul>
                {penyebab_fisiologis && penyebab_fisiologis.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">Penyebab Situasional</Form.Label>
              <ul>
                {penyebab_situasional && penyebab_situasional.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">Penyebab Psikologis</Form.Label>
              <ul>
                {penyebab_psikologis && penyebab_psikologis.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
          <h4 className="mt-3">Gejala dan Tanda Mayor</h4>
            <Form.Label id="bold-font" className="mt-4">Subjektif</Form.Label>
              <ul>
                {gejala_mayor_subjektif && gejala_mayor_subjektif.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">Objektif</Form.Label>
              <ul>
                {gejala_mayor_objektif && gejala_mayor_objektif.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>

        <Row>
          <Form.Group>
          <h4 className="mt-3">Gejala dan Tanda Minor</h4>
            <Form.Label id="bold-font" className="mt-4">Subjektif</Form.Label>
              <ul>
                {gejala_minor_subjektif && gejala_minor_subjektif.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

        </Row>

        <Row>
          <Form.Group>
            <Form.Label id="bold-font" className="mt-4">Objektif</Form.Label>
              <ul>
                {gejala_minor_objektif && gejala_minor_objektif.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
          </Form.Group>

          <hr></hr>
        </Row>
   
          <div className='d-flex justify-content-end mt-3'>
            <Link
                to={`/admin/diagnosa/${id}`}
                id="custom-margin"
                variant='primary'  
                className='btn justify-content-center align-items-center white-button'>
                  Edit
            </Link>

            <Button
              onClick={() => setShowModal(true)}
              variant='primary'
              type="button"
              className='btn justify-content-center align-items-center red-button'>
                Delete
            </Button>
            
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Apakah Anda yakin ingin menghapus data ini?
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                    variant='secondary'
                    onClick={() => setShowModal(false)}
                    className='btn justify-content-center align-items-center white-button'>
                      Batal
                  </Button>
                  <Button 
                    variant='primary'
                    onClick={deleteDiagnosa}
                    className='btn justify-content-center align-items-center red-button'>
                      Hapus
                  </Button>
                </Modal.Footer>
            </Modal>
          </div>
      </Form>


    </Sidebar>
  );
};

export default DetailDiagnosa;
