import React, { useEffect, useState } from "react";
import { Accordion, Button, Modal, Form } from "react-bootstrap";
import axios from "../../../axios";
import "../../../../src/style/accordion.css";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import Multiselect from "../../../components/menu/Multiselect";
// import "primereact/resources/themes/saga-blue/theme.css";
import Sidebar from "../../../components/menu/Sidebar";
import ConfirmModal from "../../../components/menu/ConfirmModal";
import { useParams, useNavigate } from "react-router-dom";
import SeeModalData from "../../../components/perawat/askep/SeeModalData";

export default function FormDiagnosa() {
  const [diagnosa, setDiagnosa] = useState([]);
  const [catatan, setCatatan] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);


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

  // modal Information validation form 
  const [informationForm, setInformationForm] = useState([])
  const [modalValidationForm, setModalValidationForm] = useState(false)


  // MODAL
  


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

  
  const token = localStorage.getItem("token");

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


      console.log(selectedDiagnosaData.penyebab_fisiologis);
      setNamaDiagnosa(selectedDiagnosaData.diagnosa.nama_diagnosa);
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

  useEffect(() => {
    handleDiagnosaChange();
  }, [selectedDiagnosa]);

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
    const handleFaktorRisiko = faktor_risiko ? handleData(faktor_risiko, "faktor_risiko") : null;
    const handlePenyebabFisiologis = penyebab_fisiologis ? handleData(penyebab_fisiologis, "nama_penyebab") : null;
    const handlePenyebabSituasional = penyebab_situasional ? handleData(penyebab_situasional, "nama_penyebab") : null;
    const handlePenyebabPsikologis = penyebab_psikologis ? handleData(penyebab_psikologis, "nama_penyebab") : null;
    const handlePenyebabUmum = penyebab_umum ? handleData(penyebab_umum, "nama_penyebab") : null;
    const handleGejalaTanda_mayor_objektif = gejala_mayor_objektif ? handleData(gejala_mayor_objektif, "nama_gejala") : null;
    const handleGejalaTanda_mayor_subjektif = gejala_mayor_subjektif ? handleData(gejala_mayor_subjektif, "nama_gejala") : null;
    const handleGejala_Minor_objektif = gejala_minor_objektif ? handleData(gejala_minor_objektif, "nama_gejala"): null;
    const handleGejala_Minor_subjektif = gejala_minor_subjektif ? handleData(gejala_minor_subjektif, "nama_gejala") : null;

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

        navigate(`/perawat/askep/shift/keterangan/${id}`);
    } catch (error) {
      
    }
  };


  const handleModal = (data)=>{
    if(data == null || data.length == 0){
      setInformationForm(false)
    }else{
      setInformationForm(data)
    }
    setModalValidationForm(true)
  }

  const CloseValidationFormModal = () => setModalValidationForm(false)
  return (
    <Sidebar>
      {modalValidationForm && (
        <SeeModalData
          open={modalValidationForm}
          data={informationForm}
          name={"Data yang dipilih"}
          onHide={CloseValidationFormModal}
        />
      )}
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
              <MultiSelect
                value={faktor_risiko}
                disabled={!selectedDiagnosa}
                options={selectedFaktorRisiko}
                placeholder="Pilih Faktor Risiko"
                optionLabel="faktor_risiko"
                className="pt-1"
                onChange={(e) => setFaktorRisiko(e.value)}
                filter
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(faktor_risiko && faktor_risiko.map(item => item.faktor_risiko))}
              >
                See selected options
              </span>
            </Form.Group>
            <Form.Group className="mt-5">
              <h6>Penyebab</h6>
              <Form.Label id="form-label">Penyebab Fisiologis</Form.Label>
              <MultiSelect
                value={penyebab_fisiologis}
                disabled={!selectedDiagnosa}
                options={selectedPenyebabFisiologis}
                optionLabel="nama_penyebab"
                placeholder="Pilih Penyebab Fisiologis"
                filter
                className="pt-1"
                onChange={(e) => setPenyebabFisiologis(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(penyebab_fisiologis && penyebab_fisiologis.map(item => item.nama_penyebab))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label id="form-label">Penyebab Situasional</Form.Label>
              <MultiSelect
                value={penyebab_situasional}
                disabled={!selectedDiagnosa}
                options={selectedPenyebabSituasional}
                optionLabel="nama_penyebab"
                placeholder="Pilih Penyebab Situasional"
                filter
                className="pt-1"
                onChange={(e) => setPenyebabSituasional(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(penyebab_situasional && penyebab_situasional.map(item => item.nama_penyebab))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label id="form-label">Penyebab Psikologis</Form.Label>
              <MultiSelect
                value={penyebab_psikologis}
                disabled={!selectedDiagnosa}
                options={selectedPenyebabPsikologis}
                optionLabel="nama_penyebab"
                placeholder="Pilih Penyebab Psikologis"
                filter
                className="pt-1"
                onChange={(e) => setPenyebabPsikologis(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(penyebab_psikologis && penyebab_psikologis.map(item => item.nama_penyebab))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-5">
              <h6>Gejala dan Tanda Mayor</h6>
              <Form.Label id="form-label">Subjektif</Form.Label>
              <MultiSelect
                value={gejala_mayor_subjektif}
                disabled={!selectedDiagnosa}
                options={selectedGejalaMayorSubjektif}
                optionLabel="nama_gejala"
                placeholder="Pilih Subjektif"
                filter
                className="pt-1"
                onChange={(e) => setGejalaMayorSubjektif(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(gejala_mayor_subjektif && gejala_mayor_subjektif.map(item => item.nama_gejala))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label id="form-label">Objektif</Form.Label>
              <MultiSelect
                value={gejala_mayor_objektif}
                disabled={!selectedDiagnosa}
                options={selectedGejalaMayorObjektif}
                optionLabel="nama_gejala"
                placeholder="Pilih Objektif"
                filter
                className="pt-1"
                onChange={(e) => setGejalaMayorObjektif(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(gejala_mayor_objektif && gejala_mayor_objektif.map(item => item.nama_gejala))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-5">
              <h6>Gejala dan Tanda Minor</h6>
              <Form.Label id="form-label">Subjektif</Form.Label>
              <MultiSelect
                value={gejala_minor_subjektif}
                disabled={!selectedDiagnosa}
                options={selectedGejalaMinorSubjektif}
                optionLabel="nama_gejala"
                placeholder="Pilih Subjektif"
                filter
                className="pt-1"
                onChange={(e) => setGejalaMinorSubjektif(e.value)}
                maxSelectedLabels={3}
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(gejala_minor_subjektif && gejala_minor_subjektif.map(item => item.nama_gejala))}
              >
                See selected options
              </span>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label id="form-label">Objektif</Form.Label>
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
              ></MultiSelect>
              <span
                id="form-label"
                className="see-option-link"
                onClick={() => handleModal(gejala_minor_objektif && gejala_minor_objektif.map(item => item.nama_gejala))}
              >
                See selected options
              </span>
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
  );
}
