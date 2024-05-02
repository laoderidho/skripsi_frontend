import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "../../../components/menu/Sidebar";
import axios from "../../../axios";
import { Form, Row, Col } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/saga-blue/theme.css";
import ConfirmModal from "../../../components/menu/ConfirmModal";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SeeModalData from "../../../components/perawat/askep/SeeModalData";

export default function FormIntervensi() {
  const [intervensi, setIntervensi] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [nama_lengkap, setNamaLengkap] = useState("");

  const [selectedIntervensi, setSelectedIntervensi] = useState("");
  const [selectedObservasi, setSelectedObservasi] = useState([]);
  const [selectedTerapeutik, setSelectedTerapeutik] = useState([]);
  const [selectedEdukasi, setSelectedEdukasi] = useState([]);

  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <=600;

  // VALUE
  const [nama_intervensi, setNamaIntervensi] = useState(null);
  const [observasi, setObservasi] = useState(null);
  const [terapeutik, setTerapeutik] = useState(null);
  const [edukasi, setEdukasi] = useState(null);

  const createIntervensiOptions = () => {
    if (!intervensi || intervensi.length === 0) {
      return [{ value: "", label: "Pilih Intervensi" }];
    } else {
      const options = [{ value: "", label: "-" }];

      intervensi.forEach((item, index) => {
        options.push({
          value: item.id,
          label: `${item.kode_intervensi} - ${item.nama_intervensi}`,
        });
      });
      return options;
    }
  };

  const getDataById = async () => {
    try {
      const res = await axios.post(
        `/perawat/listaskep/setname/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNamaLengkap(res.data.name);
    } catch (error) {}
  };

  const handleIntervensiChange = async () => {
    try {
      const res = await axios.post(
        `/perawat/intervensi/detail/${selectedIntervensi}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem(token)}` },
        }
      );

      const selectedIntervensiData = res.data;

      setNamaIntervensi(selectedIntervensiData.data.id);
      setSelectedObservasi(selectedIntervensiData.tindakan_observasi);
      setSelectedTerapeutik(selectedIntervensiData.tindakan_teraupetik);
      setSelectedEdukasi(selectedIntervensiData.tindakan_edukasi);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleIntervensiChange(selectedIntervensi);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedIntervensi]);

  const getIntervensi = async (token) => {
    try {
      await axios
        .post(`/perawat/intervensi`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res);
          setIntervensi(res?.data?.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getIntervensi(localStorage.getItem("token"));
    getDataById();
  }, []);

  const getPropValues = (array, prop) => {
    return array.map((item) => item[prop]);
  };

  const handleData = (dataArray, propName) => {
    const propValues = getPropValues(dataArray, propName);
    const convertedValues = propValues.join(",");
    return convertedValues;
  };

  const addIntervensi = async () => {
    const handleObservasi = observasi ? handleData(observasi, "id") : null;
    const handleTerapeutik = terapeutik ? handleData(terapeutik, "id") : null;
    const handleEdukasi = edukasi ? handleData(edukasi, "id") : null;

    try {
        await axios.post(`/perawat/intervensi/update/${id}`, {
            nama_intervensi,
            tindakan_intervensi: handleObservasi + ',' + handleTerapeutik + ',' + handleEdukasi,
            catatan_intervensi: catatan
        },
        {
            headers: { Authorization: `Bearer ${token}`},
        });

        navigate(-1);
    } catch (error) {

    }
  };


  const handleBackData = (newData, allData, onObj, myFunc)=>{
    const filterData = allData.filter((item) => newData.includes(item[onObj]))
    const myFunction = eval(myFunc)
    myFunction(filterData)
  }

  const [seeDataCondition, setSeeDataCondition] = useState(null)

  const handleShowAllData = () => {
    setShowDataObservasi(true);
    setShowDataTerapeutik(true);
    setShowDataEdukasi(true);
    setSeeDataCondition(true);
    window.scrollTo(0, 0);
  }


  const handleHideData = () =>{
    setShowDataObservasi(false);
    setShowDataTerapeutik(false);
    setShowDataEdukasi(false);
    setSeeDataCondition(false);
  }

  // multi select show

  const [showDataObservasi, setShowDataObservasi] = useState(false)
  const [showDataTerapeutik, setShowDataTerapeutik] = useState(false)
  const [showDataEdukasi, setShowDataEdukasi] = useState(false)

  return (
    <Fragment>
      {isMobile ? (
        <Fragment>
          <Sidebar 
              title="FORM INTERVENSI">
            
              <div className="container">
                <div className="container-fluid container">
                  <div className="container mt-2">
                    <div className="alert-pasien">
                      <div className='space-label'>
                        <Row>
                          <Col>
                          <Row>
                              <span className='shift-label'>Pasien</span>
                          </Row>
                            <Row>
                              <span id='form-label' className="alert-info">{nama_lengkap}</span>
                            </Row>
                          </Col>
                          <Col>
                          <Row>
                            {/* <Link to={`/perawat/askep/${}`} className="btn blue-button-left-align">
                              Lihat Pencatatan
                            </Link> */}
                          </Row>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container form-margin">
                <Form className="container">
                  <Form.Group className="mt-4">
                    <Form.Label id='form-label'>Intervensi</Form.Label>
                    <Dropdown
                      value={selectedIntervensi}
                      onChange={(e) => setSelectedIntervensi(e.target.value)}
                      options={createIntervensiOptions()}
                      placeholder="Pilih Intervensi"
                      filter
                      required
                      classname="pt-1"
                    ></Dropdown>

                    <Form.Group className="mt-5">
                      <h6>Tindakan</h6>
                      <Form.Label id='form-label'>Observasi</Form.Label>

                      {
                        !showDataObservasi &&
                          <MultiSelect
                            value={observasi}
                            onChange={(e) => setObservasi(e.value)}
                            options={selectedObservasi}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Observasi"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>    
                      }
                      {
                        showDataObservasi &&
                        <SeeModalData
                            data={observasi &&
                            observasi.map((item) => item.nama_tindakan_intervensi)}
                            allData={observasi}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setObservasi"}
                            callDataBack={handleBackData}
                        />
                      }
                      <button className="btn button-switch" onClick={() => setShowDataObservasi(!showDataObservasi)} type="button">{showDataObservasi ? 'Edit data' : 'Tampilkan data'}</button>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label id='form-label'>Terapeutik</Form.Label>

                      {
                        !showDataTerapeutik &&
                          <MultiSelect
                            value={terapeutik}
                            onChange={(e) => setTerapeutik(e.value)}
                            options={selectedTerapeutik}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Terapeutik"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>
                      }
                      {
                        showDataTerapeutik &&
                        <SeeModalData
                            data={terapeutik &&
                            terapeutik.map((item) => item.nama_tindakan_intervensi)}
                            allData={terapeutik}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setTerapeutik"}
                            callDataBack={handleBackData}
                        />
                      }
                      <button className="btn button-switch" onClick={() => setShowDataTerapeutik(!showDataTerapeutik)} type="button">{showDataTerapeutik ? 'Edit data' : 'Tampilkan data'}</button>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label id='form-label'>Edukasi</Form.Label>

                      {
                        !showDataEdukasi &&
                          <MultiSelect
                            value={edukasi}
                            onChange={(e) => setEdukasi(e.value)}
                            options={selectedEdukasi}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Edukasi"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>
                      }
                      {
                        showDataEdukasi &&
                        <SeeModalData
                            data={edukasi &&
                            edukasi.map((item) => item.nama_tindakan_intervensi)}
                            allData={edukasi}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setEdukasi"}
                            callDataBack={handleBackData}
                        />
                      }
                      
                      <button className="btn button-switch" onClick={() => setShowDataEdukasi(!showDataEdukasi)} type="button">{showDataEdukasi ? 'Edit data' : 'Tampilkan data'}</button>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <h6>Catatan</h6>
                      <Form.Control
                        as="textarea"
                        value={catatan}
                        disabled={!selectedIntervensi}
                        placeholder="Catatan"
                        onChange={(e) => setCatatan(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Group>

                  <button onClick={!seeDataCondition ? handleShowAllData : handleHideData} className="btn button-switch-verification" type="button">{!seeDataCondition ? 'Verifikasi Data' : 'Edit Data'}</button>

                  <div className="d-flex justify-content-end mt-3">
                    <ConfirmModal
                      onConfirm={addIntervensi}
                      successMessage={"Data berhasil ditambahkan"}
                      cancelMessage={"Data gagal ditambahkan"}
                      buttonText={"Simpan"}
                    />
                  </div>
                </Form>
              </div>
            </Sidebar>
        </Fragment>
      ) : (
        <Fragment>
          <Sidebar 
              title="FORM INTERVENSI">
            
              <div className="container">
                <h2>Form Intervensi</h2>
              </div>

              <div className="container">
                <Form className="container">
                  <Form.Group className="mt-4">
                    <Form.Label>Intervensi</Form.Label>
                    <Dropdown
                      value={selectedIntervensi}
                      onChange={(e) => setSelectedIntervensi(e.target.value)}
                      options={createIntervensiOptions()}
                      placeholder="Pilih Intervensi"
                      filter
                      required
                      classname="pt-1"
                    ></Dropdown>

                    <Form.Group className="mt-5">
                      <h6>Tindakan</h6>
                      <Form.Label>Observasi</Form.Label>

                      {
                        !showDataObservasi &&
                          <MultiSelect
                            value={observasi}
                            onChange={(e) => setObservasi(e.value)}
                            options={selectedObservasi}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Observasi"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>    
                      }
                      {
                        showDataObservasi &&
                        <SeeModalData
                            data={observasi &&
                            observasi.map((item) => item.nama_tindakan_intervensi)}
                            allData={observasi}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setObservasi"}
                            callDataBack={handleBackData}
                        />
                      }

                
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Terapeutik</Form.Label>

                      {
                        !showDataTerapeutik &&
                          <MultiSelect
                            value={terapeutik}
                            onChange={(e) => setTerapeutik(e.value)}
                            options={selectedTerapeutik}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Terapeutik"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>
                      }
                      {
                        showDataTerapeutik &&
                        <SeeModalData
                            data={terapeutik &&
                            terapeutik.map((item) => item.nama_tindakan_intervensi)}
                            allData={terapeutik}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setTerapeutik"}
                            callDataBack={handleBackData}
                        />
                      }

                      <Form.Check className="mt-2" checked={showDataTerapeutik} onChange={()=>setShowDataTerapeutik(!showDataTerapeutik)} type="checkbox" label="Tampilkan data" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Edukasi</Form.Label>

                      {
                        !showDataEdukasi &&
                          <MultiSelect
                            value={edukasi}
                            onChange={(e) => setEdukasi(e.value)}
                            options={selectedEdukasi}
                            disabled={!selectedIntervensi}
                            placeholder="Pilih Tindakan Edukasi"
                            optionLabel="nama_tindakan_intervensi"
                            className="pt-1"
                            filter
                            display="chip"
                          ></MultiSelect>
                      }
                      {
                        showDataEdukasi &&
                        <SeeModalData
                            data={edukasi &&
                            edukasi.map((item) => item.nama_tindakan_intervensi)}
                            allData={edukasi}
                            onObj={"nama_tindakan_intervensi"}
                            myFunc={"setEdukasi"}
                            callDataBack={handleBackData}
                        />
                      }
                      
                      <Form.Check className="mt-2" checked={showDataEdukasi} onChange={()=>setShowDataEdukasi(!showDataEdukasi)} type="checkbox" label="Tampilkan data" />
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <h6>Catatan</h6>
                      <Form.Control
                        as="textarea"
                        value={catatan}
                        disabled={!selectedIntervensi}
                        placeholder="Catatan"
                        onChange={(e) => setCatatan(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Group>

                  <div className="d-flex justify-content-end mt-3">
                    <ConfirmModal
                      onConfirm={addIntervensi}
                      successMessage={"Data berhasil ditambahkan"}
                      cancelMessage={"Data gagal ditambahkan"}
                      buttonText={"Simpan"}
                    />
                  </div>
                </Form>
              </div>
            </Sidebar>
        </Fragment>
      )}
    </Fragment>
  );
}
