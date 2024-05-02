import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/menu/Sidebar'
import { Modal , Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import AuthorizationRoute from '../../../AuthorizationRoute'
import axios from '../../../axios'
import ConfirmModal from '../../../components/menu/ConfirmModal';

const AddDiagnostik = () => {

  const [keluhan_utama, setKeluhanUtama] = useState("");
  const [riwayat_penyakit, setRiwayatPenyakit] = useState("");
  const [riwayat_alergi, setRiwayatAlergi] = useState("");
  const [risiko_jatuh, setRisikoJatuh] = useState("");
  const [risiko_nyeri, setRisikoNyeri] = useState("");
  const [suhu, setSuhu] = useState("");
  const [nadi, setNadi] = useState("");
  const [laju_respirasi, setLajuRespirasi] = useState("");
  const [kesadaran, setKesadaran] = useState("");
  const [sistolik, setSistolik] = useState("");
  const [diastolik, setDiastolik] = useState("")
  const [pemeriksaan_fisik, setPemeriksaanFisik] = useState("");
  const [eye, setEye] = useState("");
  const [motor, setMotor] = useState("");
  const [verbal, setVerbal] = useState("");
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const {id} = useParams();
  const [showAnamnesis, setShowAnamnesis] = useState(false);

   

  const submitForm = async () => {
    
    // const handleKeluhanUtama = keluhan_utama ? keluhan_utama.split("\n").join(",") : null;
    // const handleRiwayatPenyakit = riwayat_penyakit ? riwayat_penyakit.split("\n").join(",") : null;
    // const handleRiwayatAlergi = riwayat_alergi ? riwayat_alergi.split("\n").join(",")  : null;
    // const handleRisikoJatuh = risiko_jatuh ? risiko_jatuh.split("\n").join(",") : null;
    // const handleRisikoNyeri = risiko_nyeri ? risiko_nyeri.split("\n").join(",") : null;
    const handlePemeriksaanFisik = pemeriksaan_fisik ? pemeriksaan_fisik.split("\n").join(",") : null;
    const handleSuhu = `${suhu} °C`;
    const handleNadi = `${nadi} x/menit`
    const handleLajuRespirasi = `${laju_respirasi} x/menit`;
    const handleTekananDarah = `${sistolik}/${diastolik} mmHg`;
    const handleGCS = `e: ${eye}/m: ${motor}/v: ${verbal}`;
    const handleSistolik = parseInt(sistolik);
    const handleDiastolik = parseInt(diastolik);
    

    try {
       await axios.post(`/perawat/diagnostic/add/${id}`, {
        // keluhan_utama: handleKeluhanUtama,
        // riwayat_penyakit: handleRiwayatPenyakit,
        // riwayat_alergi: handleRiwayatAlergi,
        // risiko_jatuh: handleRisikoJatuh,
        // risiko_nyeri: handleRisikoNyeri,
        suhu: handleSuhu,
        tekanan_darah: handleTekananDarah,
        sistolik: handleSistolik,
        diastolik: handleDiastolik,
        nadi: handleNadi,
        laju_respirasi: handleLajuRespirasi,
        gcs: handleGCS,
        eye: eye,
        motor: motor,
        verbal: verbal,
        pemeriksaan_fisik: handlePemeriksaanFisik
      },
      { 
        headers: { Authorization: `Bearer ${token}`}
      });
      navigate(`/perawat/profil/pemeriksaan/${id}`);
    } catch (error){
      // AuthorizationRoute(error.response.status)
    }    
  };

  const handleShow = () => {
      setShowAnamnesis(true);
  }

  const handleHide = () => {
      setShowAnamnesis(false);
  }

  const getDataById = async () => {
    try {
      const res = await axios.post(`/amnanessa/detail/${id}`,
    {
        headers: { Authorization: `Bearer ${token}`}
    });

    setKeluhanUtama(res.data.data.keluhan_utama);
    setRiwayatPenyakit(res.data.data.riwayat_penyakit);
    setRiwayatAlergi(res.data.data.riwayat_alergi);
    setRisikoJatuh(res.data.data.risiko_jatuh);
    setRisikoNyeri(res.data.data.risiko_nyeri);
    console.log(res.data.data)
    } catch (error) {
        
    }
  }

  useEffect(() => {
    getDataById();
  },[])


  return (
    <Sidebar title='TAMBAH'>

      <div className="container" style={{marginBottom: '1rem'}}>
                        <button className="btn button-switch-verification" onClick={handleShow}>Lihat Anamnesis</button>
      </div>

      <Modal show={showAnamnesis} onClick={() => setShowAnamnesis} onHide={handleHide} centered>
                        <Modal.Body>
                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">KELUHAN UTAMA</Form.Label>
                                <p className='li-askep'>{keluhan_utama}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className=''>
                                <Form.Label  className="form-title">RIWAYAT PENYAKIT</Form.Label>
                                <p className='li-askep'>{riwayat_penyakit}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className=''>
                                <Form.Label  className="form-title">RIWAYAT ALERGI</Form.Label>
                                <p className='li-askep'>{riwayat_alergi}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">RISIKO JATUH</Form.Label>
                                <p className='li-askep'>{risiko_jatuh}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>

                            <Form.Group className='mt-4'>
                                <Form.Label  className="form-title">RISIKO NYERI</Form.Label>
                                <p className='li-askep'>{risiko_nyeri}</p>
                            </Form.Group>
                            <hr className='hr-askep'></hr>
                            
                        </Modal.Body>
        </Modal>
      

      <Form className="container mt-5" onSubmit={submitForm}>
        <Row>
          {/* <Col xs={12} lg={6}>
            <Form.Group className="mb-3">
              <h4>Anamnesis</h4>
              <Form.Label>Keluhan Utama</Form.Label>
              <Form.Control
                id="form-control-input custom-search"
                as="textarea"
                type="text" 
                style={{ height: "4rem" }}
                value={keluhan_utama}
                onChange={(e) => setKeluhanUtama(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Riwayat Penyakit</Form.Label>
              <Form.Control 
                id="form-control-input custom-search"
                type="text" 
                as="textarea"
                style={{ height: "4rem" }}
                value={riwayat_penyakit}
                onChange={(e) => setRiwayatPenyakit(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Riwayat Alergi</Form.Label>
              <Form.Control 
                id="form-control-input custom-search"
                type="text" 
                as="textarea"
                style={{ height: "4rem" }}
                value={riwayat_alergi}
                onChange={(e) => setRiwayatAlergi(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Risiko Jatuh</Form.Label>
              <Form.Control 
                id="form-control-input custom-search"
                type="text" 
                as="textarea"
                style={{ height: "4rem" }}
                value={risiko_jatuh}
                onChange={(e) => setRisikoJatuh(e.target.value)}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Risiko Nyeri</Form.Label>
              <Form.Control
                id="form-control-input custom-search"
                as="textarea"
                style={{ height: "4rem" }}
                type="text"
                value={risiko_nyeri}
                onChange={(e) => setRisikoNyeri(e.target.value)}
                required
              />
            </Form.Group>
          </Col> */}

          <Col className=''>
            <Form.Group className="mb-3">
              <h5>Vital</h5>
              <Form.Label>Suhu</Form.Label>
              <div class="input-group">
                <Form.Control
                    id="suhu "
                    type="text" 
                    class="form-control" 
                    value={suhu}
                    onChange={(e) => setSuhu(e.target.value) }
                    />
                <span class="input-group-text">°C</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tekanan Darah</Form.Label>
              <div class="input-group">
                <Form.Control 
                 id="small-box-left custom-search"
                 type="text"
                 min="1"
                 max="200"
                 value={sistolik}
                 onChange={(e)=>setSistolik(e.target.value)}
                />
                <span class="input-group-text" id="invisible">/</span>
                <Form.Control
                 id="small-box-right"
                 type="text"
                 min="1"
                 max="200"
                 value={diastolik}
                 onChange={(e)=>setDiastolik(e.target.value)}
                />
                <span class="input-group-text">mmHg</span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nadi</Form.Label>
              <div className='input-group'>
                <Form.Control 
                  id="x-menit"
                  type="text"
                  value={nadi}
                  onChange={(e) => setNadi(e.target.value)}
                  />
                  <span class="input-group-text">x/menit</span>  
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Laju Respirasi</Form.Label>
              <div className='input-group'>
                <Form.Control 
                  id="x-menit"
                  type="text"
                  value={laju_respirasi}
                  onChange={(e) => setLajuRespirasi(e.target.value)}
                  />
                  <span class="input-group-text">x/menit</span>  
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kesadaran</Form.Label>
              <Form.Control 
                id="form-control-input custom-search"
                type="text" 
                value={kesadaran}
                onChange={(e) => setKesadaran(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GCS</Form.Label>
              <div className='input-group'>
                <span className='input-group-text'>E</span>
                <Form.Control 
                id=""
                type="text"
                value={eye}
                onChange={(e) => setEye(e.target.value)}
                />
                <span className='input-group-text'>M</span>
                <Form.Control 
                id=""
                type="text"
                value={motor}
                onChange={(e) => setMotor(e.target.value)}
                />
                <span className='input-group-text'>V</span>
                <Form.Control 
                id=""
                type="text"
                value={verbal}
                onChange={(e) => setVerbal(e.target.value)}
                />
              </div>
              
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pemeriksaan Fisik</Form.Label>
              <Form.Control 
                id="form-control-input custom-search"
                type="text" 
                as="textarea"
                style={{ height: "4rem" }}
                value={pemeriksaan_fisik}
                onChange={(e) => setPemeriksaanFisik(e.target.value)}
                required
                />
            </Form.Group>
          </Col>
        </Row>

        <div className='d-flex justify-content-end mt-3'>
          <ConfirmModal
            onConfirm={submitForm}
            successMessage={"Data berhasil ditambahkan"}
            cancelMessage={"Data gagal ditambahkan"}
            buttonText={"Simpan"}
            />
        </div>
      </Form>
    </Sidebar>
  );
};

export default AddDiagnostik;