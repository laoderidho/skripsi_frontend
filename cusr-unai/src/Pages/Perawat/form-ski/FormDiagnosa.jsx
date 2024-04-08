import React, { useEffect, useState } from "react";
import { Form, Row, Col, Modal } from "react-bootstrap";
import axios from "../../../axios";
import "../../../../src/style/accordion.css";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
// import "primereact/resources/themes/saga-blue/theme.css";
import Sidebar from "../../../components/menu/Sidebar";
import ConfirmModal from "../../../components/menu/ConfirmModal";
import { useParams, useNavigate } from "react-router-dom";
import SeeModalData from "../../../components/perawat/askep/SeeModalData";
import { type } from "@testing-library/user-event/dist/type";

export default function FormDiagnosa() {
  const [diagnosa, setDiagnosa] = useState([]);
  const [catatan, setCatatan] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [nama_lengkap, setNamaLengkap] = useState("");


  const [selectedDiagnosa, setSelectedDiagnosa] = useState("");
  const [selectedFaktorRisiko, setSelectedFaktorRisiko] = useState([]);
  const [selectedPenyebabFisiologis, setSelectedPenyebabFisiologis] = useState(
    []
  );
  const [selectedPenyebabSituasional, setSelectedPenyebabSituasional] =
    useState([]);
  const [selectedPenyebabPsikologis, setSelectedPenyebabPsikologis] = useState(
    []
  );
  const [selectedGejalaMayorSubjektif, setSelectedGejalaMayorSubjektif] =
    useState([]);
  const [selectedGejalaMayorObjektif, setSelectedGejalaMayorObjektif] =
    useState([]);
  const [selectedGejalaMinorSubjektif, setSelectedGejalaMinorSubjektif] =
    useState([]);
  const [selectedGejalaMinorObjektif, setSelectedGejalaMinorObjektif] =
    useState([]);

  const {id} = useParams();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <=600;




  // VALUE

  const [nama_diagnosa, setNamaDiagnosa] = useState(null);
  const [faktor_risiko, setFaktorRisiko] = useState(null);
  const [penyebab_fisiologis, setPenyebabFisiologis] = useState(null);
  const [penyebab_situasional, setPenyebabSituasional] = useState(null);
  const [penyebab_psikologis, setPenyebabPsikologis] = useState(null);
  const [penyebab_umum, setPenyebabUmum] = useState(null);
  const [gejala_mayor_subjektif, setGejalaMayorSubjektif] = useState(null);
  const [gejala_mayor_objektif, setGejalaMayorObjektif] = useState(null);
  const [gejala_minor_subjektif, setGejalaMinorSubjektif] = useState(null);
  const [gejala_minor_objektif, setGejalaMinorObjektif] = useState(null);


  const createDiagnosaOptions = () => {
    if (!diagnosa || diagnosa.length === 0) {
      return [{ value: "", label: "Pilih Diagnosa" }];
    } else {
      const options = [{ value: "", label: "-" }];

      diagnosa.forEach((item, index) => {
        options.push({
          value: item.id,
          label: `${item.kode_diagnosa} - ${item.nama_diagnosa}`,
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
  
  const token = localStorage.getItem("token");


  const [seeDataCondition, setSeeDataCondition] = useState(null)

  const handleShowAllData = () => {
    setShowDataFaktorRisiko(true);
    setShowDataPenyebabFisiologis(true);
    setShowDataPenyebabSituasional(true);
    setShowDataPenyebabPsikologis(true);
    setShowDataGejalaMayorSubjektif(true);
    setShowDataGejalaMayorObjektif(true);
    setShowDataGejalaMinorSubjektif(true);
    setShowDataGejalaMinorObjektif(true);
    setSeeDataCondition(true)
  }


  const handleHideData = () =>{
    setShowDataFaktorRisiko(false);
    setShowDataPenyebabFisiologis(false);
    setShowDataPenyebabSituasional(false);
    setShowDataPenyebabPsikologis(false);
    setShowDataGejalaMayorSubjektif(false);
    setShowDataGejalaMayorObjektif(false);
    setShowDataGejalaMinorSubjektif(false);
    setShowDataGejalaMinorObjektif(false);
    setSeeDataCondition(false)
  }

  const handleDiagnosaChange = async () => {
    try {
      const res = await axios.post(
        `/perawat/diagnosa/detail/${selectedDiagnosa}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(token)}`,
          },
        }
      );

      const selectedDiagnosaData = res.data;
      console.log(selectedDiagnosaData);

      setNamaDiagnosa(selectedDiagnosaData.diagnosa.id);
      setSelectedFaktorRisiko(selectedDiagnosaData.faktor_risiko);
      setSelectedPenyebabFisiologis(selectedDiagnosaData.penyebab_fisiologis);
      setSelectedPenyebabSituasional(selectedDiagnosaData.penyebab_situasional);
      setSelectedPenyebabPsikologis(selectedDiagnosaData.penyebab_psikologis);
      setSelectedGejalaMayorSubjektif(selectedDiagnosaData.gejala_tanda_mayor_subjektif);
      setSelectedGejalaMayorObjektif(
        selectedDiagnosaData.gejala_tanda_mayor_objektif
      );
      setSelectedGejalaMinorSubjektif(
        selectedDiagnosaData.gejala_tanda_minor_subjektif
      );
      setSelectedGejalaMinorObjektif(
        selectedDiagnosaData.gejala_tanda_minor_objektif
      );
    } catch (error) {}
  };

  const getDiagnosa = async (token) => {
    try {
      await axios
        .post(
          "/perawat/diagnosa",
          {},
          {
            headers: { Authorization: `Bearer $(token)` },
          }
        )
        .then((res) => {
          console.log(res);
          setDiagnosa(res?.data?.data);
        });
    } catch (error) {}
  };

  useEffect(() => {
    getDiagnosa(localStorage.getItem("token"));
    getDataById();
  }, []);

  // Fungsi utilitas untuk mengambil nilai properti tertentu dari setiap objek dalam array
  const getPropValues = (array, prop) => {
    return array.map((item) => item[prop]);
  };

  // Contoh penggunaan fungsi getPropValues
  const handleData = (dataArray, propName) => {
    const propValues = getPropValues(dataArray, propName);
    const convertedValues = propValues.join(",");
    return convertedValues;
  };

  const addDiagnosa = async () => {
    const handleFaktorRisiko = faktor_risiko ? handleData(faktor_risiko, "id") : null;
    const handlePenyebabFisiologis = penyebab_fisiologis ? handleData(penyebab_fisiologis, "id") : null;
    const handlePenyebabSituasional = penyebab_situasional ? handleData(penyebab_situasional, "id") : null;
    const handlePenyebabPsikologis = penyebab_psikologis ? handleData(penyebab_psikologis, "id") : null;
    const handlePenyebabUmum = penyebab_umum ? handleData(penyebab_umum, "id") : null;
    const handleGejalaTanda_mayor_objektif = gejala_mayor_objektif ? handleData(gejala_mayor_objektif, "id") : null;
    const handleGejalaTanda_mayor_subjektif = gejala_mayor_subjektif ? handleData(gejala_mayor_subjektif, "id") : null;
    const handleGejala_Minor_objektif = gejala_minor_objektif ? handleData(gejala_minor_objektif, "id"): null;
    const handleGejala_Minor_subjektif = gejala_minor_subjektif ? handleData(gejala_minor_subjektif, "id") : null;

    try {
      await axios.post(
        `/perawat/diagnosa/add/${id}`,
        {
          nama_diagnosa,
          faktor_risiko: handleFaktorRisiko,
          penyebab_fisiologis: handlePenyebabFisiologis,
          penyebab_situasional: handlePenyebabSituasional,
          penyebab_psikologis: handlePenyebabPsikologis,
          penyebab_umum: handlePenyebabUmum,
          gejala_tanda_mayor_objektif: handleGejalaTanda_mayor_objektif,
          gejala_tanda_mayor_subjektif: handleGejalaTanda_mayor_subjektif,
          gejala_tanda_minor_objektif: handleGejala_Minor_objektif,
          gejala_tanda_minor_subjektif: handleGejala_Minor_subjektif,
          catatan: catatan
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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


  useEffect(()=>{
     handleDiagnosaChange();
    console.log(selectedDiagnosa)
  },[selectedDiagnosa])


  // multi select show
  const [showDataFaktorRisiko, setShowDataFaktorRisiko] = useState(false);
  const [showDataPenyebabFisiologis, setShowDataPenyebabFisiologis] = useState(false);
  const [showDataPenyebabSituasional, setShowDataPenyebabSituasional] = useState(false);
  const [showDataPenyebabPsikologis, setShowDataPenyebabPsikologis] = useState(false);
  const [showDataGejalaMayorSubjektif, setShowDataGejalaMayorSubjektif] = useState(false);
  const [showDataGejalaMayorObjektif, setShowDataGejalaMayorObjektif] = useState(false);
  const [showDataGejalaMinorSubjektif, setShowDataGejalaMinorSubjektif] = useState(false);
  const [showDataGejalaMinorObjektif, setShowDataGejalaMinorObjektif] = useState(false);

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <Sidebar
            title=" FORM DIAGNOSA">
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
              <Form>
                <Form.Group className="mt-4">
                  <Form.Label id="form-label">Diagnosa</Form.Label>

                  <Dropdown
                    value={selectedDiagnosa}
                    onChange={(e) => setSelectedDiagnosa(e.target.value)}
                    options={createDiagnosaOptions()}
                    placeholder="Pilih Diagnosa"
                    filter
                    required
                    className="pt-1"
                  ></Dropdown>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Faktor Risiko</Form.Label>

                    {!showDataFaktorRisiko && 
                      <MultiSelect
                        value={faktor_risiko}
                        disabled={!selectedDiagnosa}
                        options={selectedFaktorRisiko}
                        placeholder="Pilih Faktor Risiko"
                        optionLabel="nama"
                        className="pt-1"
                        onChange={(e) => setFaktorRisiko(e.value)}
                        filter
                        display="chip"
                      ></MultiSelect>
                    }

                    {showDataFaktorRisiko && 
                      <SeeModalData
                          data={faktor_risiko &&
                          faktor_risiko.map((item) => item.nama)}
                          allData={faktor_risiko}
                          onObj={"nama"}
                          myFunc={"setFaktorRisiko"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataFaktorRisiko(!showDataFaktorRisiko)} type="button">{showDataFaktorRisiko ? 'Edit data' : 'Tampilkan data'}</button>


                  </Form.Group>
                  <Form.Group className="mt-5">
                    <h6>Penyebab</h6>
                    <Form.Label id="form-label">Penyebab Fisiologis</Form.Label>
                    {!showDataPenyebabFisiologis && 
                      <MultiSelect
                      value={penyebab_fisiologis}
                      disabled={!selectedDiagnosa}
                      options={selectedPenyebabFisiologis}
                      optionLabel="nama_penyebab"
                      placeholder="Pilih Penyebab Fisiologis"
                      filter
                      display="chip"
                      className="pt-1"
                      onChange={(e) => setPenyebabFisiologis(e.value)}
                      maxSelectedLabels={3}
                    ></MultiSelect>
                    }
                    {
                    showDataPenyebabFisiologis && 
                    <SeeModalData
                          data={penyebab_fisiologis &&
                          penyebab_fisiologis.map((item) => item.nama_penyebab)}
                          allData={penyebab_fisiologis}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabFisiologis"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataPenyebabFisiologis(!showDataPenyebabFisiologis)} type="button">{showDataPenyebabFisiologis ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Penyebab Situasional</Form.Label>

                  {
                    !showDataPenyebabSituasional &&
                    <MultiSelect
                      value={penyebab_situasional}
                      disabled={!selectedDiagnosa}
                      options={selectedPenyebabSituasional}
                      optionLabel="nama_penyebab"
                      placeholder="Pilih Penyebab Situasional"
                      filter
                      display="chip"
                      className="pt-1"
                      onChange={(e) => setPenyebabSituasional(e.value)}
                      maxSelectedLabels={3}
                    ></MultiSelect>
                  }
                    {/* <span
                      id="form-label"
                      className="see-option-link"
                      onClick={() =>
                        handleModal(
                          penyebab_situasional &&
                          penyebab_situasional.map((item) => item.nama_penyebab),
                          penyebab_situasional,
                          "nama_penyebab",
                          "setPenyebabSituasional"
                        )
                      }
                    >
                      See selected options
                    </span> */}

                    {
                      showDataPenyebabSituasional &&
                      <SeeModalData
                          data={penyebab_situasional &&
                          penyebab_situasional.map((item) => item.nama_penyebab)}
                          allData={penyebab_situasional}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabSituasional"}
                          callDataBack={handleBackData}
                      />
                    }         
                  <button className="btn button-switch" onClick={() => setShowDataPenyebabSituasional(!showDataPenyebabSituasional)} type="button">{showDataPenyebabSituasional ? 'Edit data' : 'Tampilkan data'}</button>
                  
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Penyebab Psikologis</Form.Label>
                    {
                      !showDataPenyebabPsikologis &&
                        <MultiSelect
                          value={penyebab_psikologis}
                          disabled={!selectedDiagnosa}
                          options={selectedPenyebabPsikologis}
                          optionLabel="nama_penyebab"
                          placeholder="Pilih Penyebab Psikologis"
                          filter
                          display="chip"
                          className="pt-1"
                          onChange={(e) => setPenyebabPsikologis(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                    }
                    {
                      showDataPenyebabPsikologis &&
                      <SeeModalData
                          data={penyebab_psikologis &&
                          penyebab_psikologis.map((item) => item.nama_penyebab)}
                          allData={penyebab_psikologis}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabPsikologis"}
                          callDataBack={handleBackData}
                      />
                    }
                  <button className="btn button-switch" onClick={() => setShowDataPenyebabPsikologis(!showDataPenyebabPsikologis)} type="button">{showDataPenyebabPsikologis ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-5">
                    <h6>Gejala dan Tanda Mayor</h6>
                    <Form.Label id="form-label">Subjektif</Form.Label>
                    {
                      !showDataGejalaMayorSubjektif &&
                        <MultiSelect
                          value={gejala_mayor_subjektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMayorSubjektif}
                          optionLabel="nama_gejala"
                          placeholder="Pilih Subjektif"
                          filter
                          display="chip"
                          className="pt-1"
                          onChange={(e) => setGejalaMayorSubjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                    }
                    {
                      showDataGejalaMayorSubjektif &&
                      <SeeModalData
                          data={gejala_mayor_subjektif &&
                          gejala_mayor_subjektif.map((item) => item.nama_gejala)}
                          allData={gejala_mayor_subjektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMayorSubjektif"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataGejalaMayorSubjektif(!showDataGejalaMayorSubjektif)} type="button">{showDataGejalaMayorSubjektif ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Objektif</Form.Label>
                    {
                      !showDataGejalaMayorObjektif &&
                      <MultiSelect
                        value={gejala_mayor_objektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMayorObjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Objektif"
                        filter
                        display="chip"
                        className="pt-1"
                        onChange={(e) => setGejalaMayorObjektif(e.value)}
                        maxSelectedLabels={3}
                      ></MultiSelect>
                    }
                    {
                      showDataGejalaMayorObjektif &&
                      <SeeModalData
                          data={gejala_mayor_objektif &&
                          gejala_mayor_objektif.map((item) => item.nama_gejala)}
                          allData={gejala_mayor_objektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMayorObjektif"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataGejalaMayorObjektif(!showDataGejalaMayorObjektif)} type="button">{showDataGejalaMayorObjektif ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-5">
                    <h6>Gejala dan Tanda Minor</h6>
                    <Form.Label id="form-label">Subjektif</Form.Label>

                    {
                      !showDataGejalaMinorSubjektif &&
                      <MultiSelect
                        value={gejala_minor_subjektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMinorSubjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Subjektif"
                        filter
                        display="chip"
                        className="pt-1"
                        onChange={(e) => setGejalaMinorSubjektif(e.value)}
                        maxSelectedLabels={3}
                      ></MultiSelect>
                    }

                    {
                      showDataGejalaMinorSubjektif &&
                      <SeeModalData
                          data={gejala_minor_subjektif &&
                          gejala_minor_subjektif.map((item) => item.nama_gejala)}
                          allData={gejala_minor_subjektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMinorSubjektif"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataGejalaMinorSubjektif(!showDataGejalaMinorSubjektif)} type="button">{showDataGejalaMinorSubjektif ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Objektif</Form.Label>
                    {
                      !showDataGejalaMinorObjektif &&
                      <MultiSelect
                        value={gejala_minor_objektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMinorObjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Objektif"
                        className="pt-1"
                        onChange={(e) => setGejalaMinorObjektif(e.value)}
                        maxSelectedLabels={3}
                        filter
                        display="chip"
                      ></MultiSelect>
                    }
                    {
                      showDataGejalaMinorObjektif &&
                      <SeeModalData
                          data={gejala_minor_objektif &&
                          gejala_minor_objektif.map((item) => item.nama_gejala)}
                          allData={gejala_minor_objektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMinorObjektif"}
                          callDataBack={handleBackData}
                      />
                    }
                    <button className="btn button-switch" onClick={() => setShowDataGejalaMinorObjektif(!showDataGejalaMinorObjektif)} type="button">{showDataGejalaMinorObjektif ? 'Edit data' : 'Tampilkan data'}</button>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <h6>Catatan</h6>
                    <Form.Control
                      as="textarea"
                      value={catatan}
                      disabled={!selectedDiagnosa}
                      placeholder="Catatan"
                      onChange={(e) => setCatatan(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Group>

                {/* Modal See All Data */}

                <button onClick={!seeDataCondition ? handleShowAllData : handleHideData} className="btn button-switch" type="button">{!seeDataCondition ? 'See All Data' : 'Edit Data'}</button>


                <div className="d-flex justify-content-end mt-3">
                  <ConfirmModal
                    onConfirm={addDiagnosa}
                    successMessage={"Data berhasil ditambahkan"}
                    cancelMessage={"Data gagal ditambahkan"}
                    buttonText={"Simpan"}
                  />
                </div>
              </Form>
            </div>
          </Sidebar>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Sidebar
            title=" FORM DIAGNOSA">
            <div className="container">
              <h2>Form Diagnosa</h2>
            </div>
            <div className="container">
              <Form className="container">
                <Form.Group className="mt-4">
                  <Form.Label id="form-label">Diagnosa</Form.Label>

                  <Dropdown
                    value={selectedDiagnosa}
                    onChange={(e) => setSelectedDiagnosa(e.target.value)}
                    options={createDiagnosaOptions()}
                    placeholder="Pilih Diagnosa"
                    filter
                    required
                    className="pt-1"
                  ></Dropdown>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Faktor Risiko</Form.Label>

                    {!showDataFaktorRisiko && 
                      <MultiSelect
                        value={faktor_risiko}
                        disabled={!selectedDiagnosa}
                        options={selectedFaktorRisiko}
                        placeholder="Pilih Faktor Risiko"
                        optionLabel="nama"
                        className="pt-1"
                        onChange={(e) => setFaktorRisiko(e.value)}
                        filter
                        display="chip"
                      ></MultiSelect>
                    }

                    {showDataFaktorRisiko && 
                      <SeeModalData
                          data={faktor_risiko &&
                          faktor_risiko.map((item) => item.nama)}
                          allData={faktor_risiko}
                          onObj={"nama"}
                          myFunc={"setFaktorRisiko"}
                          callDataBack={handleBackData}
                      />
                    }
                    <Form.Check className="mt-2" checked={showDataFaktorRisiko} onChange={()=>setShowDataFaktorRisiko(!showDataFaktorRisiko)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>
                  <Form.Group className="mt-5">
                    <h6>Penyebab</h6>
                    <Form.Label id="form-label">Penyebab Fisiologis</Form.Label>
                    {!showDataPenyebabFisiologis && 
                      <MultiSelect
                      value={penyebab_fisiologis}
                      disabled={!selectedDiagnosa}
                      options={selectedPenyebabFisiologis}
                      optionLabel="nama_penyebab"
                      placeholder="Pilih Penyebab Fisiologis"
                      filter
                      display="chip"
                      className="pt-1"
                      onChange={(e) => setPenyebabFisiologis(e.value)}
                      maxSelectedLabels={3}
                    ></MultiSelect>
                    }
                    {
                    showDataPenyebabFisiologis && 
                    <SeeModalData
                          data={penyebab_fisiologis &&
                          penyebab_fisiologis.map((item) => item.nama_penyebab)}
                          allData={penyebab_fisiologis}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabFisiologis"}
                          callDataBack={handleBackData}
                      />
                    }

                    <Form.Check className="mt-2" checked={showDataPenyebabFisiologis} onChange={()=>setShowDataPenyebabFisiologis(!showDataPenyebabFisiologis)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Penyebab Situasional</Form.Label>

                  {
                    !showDataPenyebabSituasional &&
                    <MultiSelect
                      value={penyebab_situasional}
                      disabled={!selectedDiagnosa}
                      options={selectedPenyebabSituasional}
                      optionLabel="nama_penyebab"
                      placeholder="Pilih Penyebab Situasional"
                      filter
                      display="chip"
                      className="pt-1"
                      onChange={(e) => setPenyebabSituasional(e.value)}
                      maxSelectedLabels={3}
                    ></MultiSelect>
                  }
                    {/* <span
                      id="form-label"
                      className="see-option-link"
                      onClick={() =>
                        handleModal(
                          penyebab_situasional &&
                          penyebab_situasional.map((item) => item.nama_penyebab),
                          penyebab_situasional,
                          "nama_penyebab",
                          "setPenyebabSituasional"
                        )
                      }
                    >
                      See selected options
                    </span> */}

                    {
                      showDataPenyebabSituasional &&
                      <SeeModalData
                          data={penyebab_situasional &&
                          penyebab_situasional.map((item) => item.nama_penyebab)}
                          allData={penyebab_situasional}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabSituasional"}
                          callDataBack={handleBackData}
                      />
                    }         
                  <Form.Check className="mt-2" checked={showDataPenyebabSituasional} onChange={()=>setShowDataPenyebabSituasional(!showDataPenyebabSituasional)} type="checkbox" label="Tampilkan data" />
                  
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Penyebab Psikologis</Form.Label>
                    {
                      !showDataPenyebabPsikologis &&
                        <MultiSelect
                          value={penyebab_psikologis}
                          disabled={!selectedDiagnosa}
                          options={selectedPenyebabPsikologis}
                          optionLabel="nama_penyebab"
                          placeholder="Pilih Penyebab Psikologis"
                          filter
                          display="chip"
                          className="pt-1"
                          onChange={(e) => setPenyebabPsikologis(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                    }
                    {
                      showDataPenyebabPsikologis &&
                      <SeeModalData
                          data={penyebab_psikologis &&
                          penyebab_psikologis.map((item) => item.nama_penyebab)}
                          allData={penyebab_psikologis}
                          onObj={"nama_penyebab"}
                          myFunc={"setPenyebabPsikologis"}
                          callDataBack={handleBackData}
                      />
                    }
                  <Form.Check className="mt-2" checked={showDataPenyebabPsikologis} onChange={()=>setShowDataPenyebabPsikologis(!showDataPenyebabPsikologis)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-5">
                    <h6>Gejala dan Tanda Mayor</h6>
                    <Form.Label id="form-label">Subjektif</Form.Label>
                    {
                      !showDataGejalaMayorSubjektif &&
                        <MultiSelect
                          value={gejala_mayor_subjektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMayorSubjektif}
                          optionLabel="nama_gejala"
                          placeholder="Pilih Subjektif"
                          filter
                          display="chip"
                          className="pt-1"
                          onChange={(e) => setGejalaMayorSubjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                    }
                    {
                      showDataGejalaMayorSubjektif &&
                      <SeeModalData
                          data={gejala_mayor_subjektif &&
                          gejala_mayor_subjektif.map((item) => item.nama_gejala)}
                          allData={gejala_mayor_subjektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMayorSubjektif"}
                          callDataBack={handleBackData}
                      />
                    }

                    <Form.Check className="mt-2" checked={showDataGejalaMayorSubjektif} onChange={()=>setShowDataGejalaMayorSubjektif(!showDataGejalaMayorSubjektif)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Objektif</Form.Label>
                    {
                      !showDataGejalaMayorObjektif &&
                      <MultiSelect
                        value={gejala_mayor_objektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMayorObjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Objektif"
                        filter
                        display="chip"
                        className="pt-1"
                        onChange={(e) => setGejalaMayorObjektif(e.value)}
                        maxSelectedLabels={3}
                      ></MultiSelect>
                    }
                    {
                      showDataGejalaMayorObjektif &&
                      <SeeModalData
                          data={gejala_mayor_objektif &&
                          gejala_mayor_objektif.map((item) => item.nama_gejala)}
                          allData={gejala_mayor_objektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMayorObjektif"}
                          callDataBack={handleBackData}
                      />
                    }

                    <Form.Check className="mt-2" checked={showDataGejalaMayorObjektif} onChange={()=>setShowDataGejalaMayorObjektif(!showDataGejalaMayorObjektif)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-5">
                    <h6>Gejala dan Tanda Minor</h6>
                    <Form.Label id="form-label">Subjektif</Form.Label>

                    {
                      !showDataGejalaMinorSubjektif &&
                      <MultiSelect
                        value={gejala_minor_subjektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMinorSubjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Subjektif"
                        filter
                        display="chip"
                        className="pt-1"
                        onChange={(e) => setGejalaMinorSubjektif(e.value)}
                        maxSelectedLabels={3}
                      ></MultiSelect>
                    }

                    {
                      showDataGejalaMinorSubjektif &&
                      <SeeModalData
                          data={gejala_minor_subjektif &&
                          gejala_minor_subjektif.map((item) => item.nama_gejala)}
                          allData={gejala_minor_subjektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMinorSubjektif"}
                          callDataBack={handleBackData}
                      />
                    }

                    <Form.Check className="mt-2" checked={showDataGejalaMinorSubjektif} onChange={()=>setShowDataGejalaMinorSubjektif(!showDataGejalaMinorSubjektif)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label id="form-label">Objektif</Form.Label>
                    {
                      !showDataGejalaMinorObjektif &&
                      <MultiSelect
                        value={gejala_minor_objektif}
                        disabled={!selectedDiagnosa}
                        options={selectedGejalaMinorObjektif}
                        optionLabel="nama_gejala"
                        placeholder="Pilih Objektif"
                        className="pt-1"
                        onChange={(e) => setGejalaMinorObjektif(e.value)}
                        maxSelectedLabels={3}
                        filter
                        display="chip"
                      ></MultiSelect>
                    }
                    {
                      showDataGejalaMinorObjektif &&
                      <SeeModalData
                          data={gejala_minor_objektif &&
                          gejala_minor_objektif.map((item) => item.nama_gejala)}
                          allData={gejala_minor_objektif}
                          onObj={"nama_gejala"}
                          myFunc={"setGejalaMinorObjektif"}
                          callDataBack={handleBackData}
                      />
                    }
                    <Form.Check className="mt-2" checked={showDataGejalaMinorObjektif} onChange={()=>setShowDataGejalaMinorObjektif(!showDataGejalaMinorObjektif)} type="checkbox" label="Tampilkan data" />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <h6>Catatan</h6>
                    <Form.Control
                      as="textarea"
                      value={catatan}
                      disabled={!selectedDiagnosa}
                      placeholder="Catatan"
                      onChange={(e) => setCatatan(e.target.value)}
                      style={{height: '4rem'}}
                    ></Form.Control>
                  </Form.Group>
                </Form.Group>

                <div className="d-flex justify-content-end mt-3">
                  <ConfirmModal
                    onConfirm={addDiagnosa}
                    successMessage={"Data berhasil ditambahkan"}
                    cancelMessage={"Data gagal ditambahkan"}
                    buttonText={"Simpan"}
                  />
                </div>
              </Form>
            </div>
          </Sidebar>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
