import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/menu/Sidebar";
import axios from "../../../axios";
import { Form } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/saga-blue/theme.css";
import ConfirmModal from "../../../components/menu/ConfirmModal";
import SeeModalData from "../../../components/perawat/askep/SeeModalData";
import { useParams, useNavigate } from "react-router-dom";

export default function FormEvaluasi() {
  // data and state
  const [luaran, setLuaran] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [subjektif, setSubjektif] = useState("");
  const [objektif, setObjektif] = useState("");
  const [catatanLuaran, setCatatanLuaran] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const [selectedLuaran, setSelectedLuaran] = useState("");
  const [selectedKriteriaLuaran, setSelectedKriteriaLuaran] = useState([]);

  // VALUE
  const [nama_luaran, setNamaLuaran] = useState(null);
  const [kriteria_luaran, setKriteriaLuaran] = useState(null);

  // conditional evaluasi dan luaran
  const [isLuaran, setIsLuaran] = useState(null);

  // luaran hasbeeenInput data
  const [luaranInput, setLuaranInput] = useState();
  const [evaluasiLuaran, setEvaluasiLuaran] = useState([]);
  const [idEvaluasiLuaran, setIdEvaluasiLuaran] = useState([]);

  const [joinEvaluasiLuaran, setJoinEvaluasiLuaran] = useState("");
  const [joinIdEvaluasiLuaran, setJoinIdEvaluasiLuaran] = useState("");

  // Token AUTH
  const token = localStorage.getItem("token");


  // pencapaian and perencanaan state
  const [capai, setCapai] = useState("");
  const [rencana, setRencana] = useState("");

  // Modal Validation
  const [informationForm, setInformationForm] = useState([])
  const [modalValidationForm, setModalValidationForm] = useState(false)
  const [dataValidationForm, setDataValidationForm] = useState([])
  const [obj, setObj] = useState("")
  const [getfunc, setGetFunc] = useState("")
  
  

  const pencapaian = [
    { label: "Tercapai", value: "tercapai" },
    { label: "Tercapai Sebagian", value: "tercapai_sebagian" },
    { label: "Tidak Tercapai", value: "tidak_tercapai" },
  ];

  const perencanaan = [
    { label: "Lanjutkan Intervensi", value: "lanjutkan_intervensi" },
    { label: "Hentikan Intervensi", value: "hentikan_intervensi" },
    { label: "Kaji Ulang", value: "kaji_ulang" },
  ];

  // function

  const createLuaranOptions = () => {
    if (!luaran || luaran.length === 0) {
      return [{ value: "", label: "Pilih Luaran" }];
    } else {
      const options = [{ value: "", label: "-" }];

      luaran.forEach((item, index) => {
        options.push({
          value: item.id,
          label: `${item.kode_luaran} - ${item.nama_luaran}`,
        });
      });
      return options;
    }
  };

 
  // ambil data luaran dan masukkan dengan fungsi berikut
  const getPropValues = (array, prop) => {
    return array.map((item) => item[prop]);
  };

  const handleData = (dataArray, propName) => {
    const propValues = getPropValues(dataArray, propName);
    const convertedValues = propValues.join(",");
    return convertedValues;
  };


  const loopNilaiLuaran = (index, item) => {
    const newEvaluasiLuaran = [...evaluasiLuaran];
    newEvaluasiLuaran[index] = item;
    setEvaluasiLuaran(newEvaluasiLuaran);
  };

  const LoopLuaranId = (itemId) => {
    console.log(itemId)
    const newIdEvaluasiLuaran = [...idEvaluasiLuaran];
    newIdEvaluasiLuaran.push(itemId);
    setIdEvaluasiLuaran(newIdEvaluasiLuaran);
  };

  const resultPenilaianLuaran = () => {
    const joinEvaluasiLuaran = evaluasiLuaran.join(",");
    const joinIdEvaluasiLuaran = idEvaluasiLuaran.join(",");
    setJoinEvaluasiLuaran(joinEvaluasiLuaran);
    setJoinIdEvaluasiLuaran(joinIdEvaluasiLuaran);
  };




  
  // api function

   const handleLuaranChange = async () => {
     try {
       const res = await axios.post(`perawat/luaran/detail/${selectedLuaran}`, {
         headers: { Authorization: `Bearer ${localStorage.getItem(token)}` },
       });

       const selectedLuaranData = res.data;

       console.log(selectedLuaranData);
       setNamaLuaran(selectedLuaranData.luaran.id);
       setSelectedKriteriaLuaran(selectedLuaranData.kriteria_luaran);
     } catch (error) {}
   };


  const addLuaran = async () => {
    const handleKriteria = kriteria_luaran ? handleData(kriteria_luaran, "id")  : null;
    try {
      await axios.post(
        `perawat/luaran/add/${id}`,
        {
          nama_luaran: handleKriteria,
          catatan_luaran: catatanLuaran,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(-1);
    } catch (error) {}
  };

  // data untuk mengambil luaran(jika luaran sudah di input perawat)
  const getLuaranHasBeenInput = async () => {
    try {
      const res = await axios.post(
        `/perawat/luaran/detail-askep-luaran/${id}`,
        {
          headers: { Authorization: `Bearer $(token)` },
        }
      );
      setIsLuaran(true);
      setFormVisible(true);
      setLuaranInput(res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setIsLuaran(false);
        setFormVisible(true);
      }
    }
  };

  // ambil data semua luaran
  const getLuaran = async () => {
    try {
      await axios
        .post(`/perawat/luaran`, {
          headers: { Authorization: `Bearer $(token)` },
        })
        .then((res) => {
          setLuaran(res?.data?.data);
        });
    } catch (error) {}
  };

  const InputEvaluasi = async () => {
    console.log(subjektif, objektif, catatan, selectedLuaran, selectedLuaran);
    try {
      await axios.post(
        `/perawat/evaluasi/penilaian-luaran`,
        {
          id: joinIdEvaluasiLuaran,
          hasil_luaran: joinEvaluasiLuaran,
        },
        {
          headers: { Authorization: `Bearer $(token)` },
        }
      );

      await axios.post(`perawat/evaluasi/hasil-evaluasi/${id}`,{
        subjektif: subjektif,
        objektif: objektif,
        catatan_lainnya: catatan,
        pencapaian: capai,
        perencanaan: rencana,
      },
      {
        headers: { Authorization: `Bearer $(token)` },
      })
      navigate(-1);

    }catch(error){

    }
  };

  const fetchData = async () => {
    try {
      await handleLuaranChange(selectedLuaran);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModal = (data, allData, nameObj, func)=>{
    if(data == null || data.length == 0){
      setInformationForm(false)
    }else{
      setInformationForm(data)
      setDataValidationForm(allData)
      setObj(nameObj)
      setGetFunc(func)
    }
    setModalValidationForm(true)
  }

  const CloseValidationFormModal = () => setModalValidationForm(false)

  const handleBackData = (newData, allData, onObj, myFunc)=>{
    const filterData = allData.filter((item) => newData.includes(item[onObj]))
    const myFunction = eval(myFunc)
    myFunction(filterData)
  }

  // useeffect
  useEffect(() => {
    fetchData();
  }, [selectedLuaran]);

  useEffect(() => {
    getLuaran();
    getLuaranHasBeenInput();
  }, []);

  useEffect(() => {
    resultPenilaianLuaran();
  }, [evaluasiLuaran]);

  // show data multiple select
  const [kriteriaShowData, setKriteriaShowData] = useState(false);

  const [seeDataCondition, setSeeDataCondition] = useState(null)

  const handleShowAllData = () =>  {
    setKriteriaShowData(true);
    setSeeDataCondition(true);
    window.scrollTo(0, 0);

  }

  const handleHideData = () => {
    setKriteriaShowData(false);
    setSeeDataCondition(false);
  }

  

  return (
    <Sidebar
    title="FORM EVALUASI">
      {modalValidationForm && (
        <SeeModalData
          open={modalValidationForm}
          data={informationForm}
          name={"Data yang dipilih"}
          onHide={CloseValidationFormModal}
          allData={dataValidationForm}
          onObj={obj}
          myFunc={getfunc}
          callDataBack={handleBackData}
        />
      )}
      <div className="container">
        <h2>{formVisible && (isLuaran ? "Berikan Evaluasi" : "Tambah Luaran")}</h2>
      </div>

      <div className="container">
        {formVisible && (
          <>
            {isLuaran ? (
              <div className="container">
                <Form className="">
                  <Form.Group className="mt-4">
                    {/*Luaran Input data*/}
                    <h6>Penilaian Luaran</h6>
                    {luaranInput &&
                      luaranInput.map((item, index) => {
                        return (
                          <div key={index}>
                            <Form.Group className="mt-3">
                              <label className="mb-1">{item.nama_luaran}</label>
                              <Form.Select
                                onChange={(e) => {
                                  loopNilaiLuaran(index, e.target.value);
                                  LoopLuaranId(item.id_evaluasi);
                                }}
                              >
                                <option>pilih</option>
                                <option value="1">Menurun</option>
                                <option value="2">Cukup Menurun</option>
                                <option value="3">Sedang</option>
                                <option value="4">Cukup Meningkat</option>
                                <option value="5">Meningkat</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        );
                      })}
                    <h6 className="mt-5">Akhir Evaluasi</h6>
                    <Form.Group className="mt-3">
                      <h6>Subjektif</h6>
                      <Form.Control
                        as="textarea"
                        value={subjektif}
                        placeholder="Subjektif"
                        onChange={(e) => setSubjektif(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <h6>Objektif</h6>
                      <Form.Control
                        as="textarea"
                        value={objektif}
                        placeholder="Objektif"
                        onChange={(e) => setObjektif(e.target.value)}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Pencapaian</Form.Label>
                      <Dropdown
                        value={capai}
                        onChange={(e) => setCapai(e.target.value)}
                        options={pencapaian}
                        placeholder="Pilih Pencapaian"
                        required
                        className="pt-1"
                      ></Dropdown>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>Perencanaan</Form.Label>
                      <Dropdown
                        value={rencana}
                        onChange={(e) => setRencana(e.target.value)}
                        options={perencanaan}
                        placeholder="Pilih Perencanaan"
                        required
                        className="pt-1"
                      ></Dropdown>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <h6>Catatan</h6>
                      <Form.Control
                        as="textarea"
                        value={catatan}
                        placeholder="Catatan"
                        onChange={(e) => setCatatan(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Group>
                </Form>

                <div className="d-flex justify-content-end mt-3">
                  <ConfirmModal
                    onConfirm={InputEvaluasi}
                    successMessage={"Data berhasil ditambahkan"}
                    cancelMessage={"Data gagal ditambahkan"}
                    buttonText={"Simpan"}
                  />
                </div>
              </div>
            ) : (
              <Form>
                <Form.Group className="mt-5">
                  <Form.Label>Luaran</Form.Label>
                  <Dropdown
                    value={selectedLuaran}
                    onChange={(e) => setSelectedLuaran(e.target.value)}
                    options={createLuaranOptions()}
                    placeholder="Pilih Luaran"
                    filter
                    required
                    className="pt-1"
                  ></Dropdown>
                </Form.Group>

                <Form.Group className="mt-5">
                  <Form.Label>Kriteria</Form.Label>
                  {
                    !kriteriaShowData &&
                    <MultiSelect
                      value={kriteria_luaran}
                      disabled={!selectedLuaran}
                      options={selectedKriteriaLuaran}
                      optionLabel="nama_kriteria_luaran"
                      placeholder="Pilih"
                      filter
                      className="pt-1"
                      onChange={(e) => setKriteriaLuaran(e.value)}
                      maxSelectedLabels={3}
                      display="chip"
                    ></MultiSelect>
                  }
                  {
                    kriteriaShowData &&
                    <SeeModalData
                      data={kriteria_luaran &&
                      kriteria_luaran.map((item) => item.nama_kriteria_luaran)}
                      allData={kriteria_luaran}
                      onObj={"nama_kriteria_luaran"}
                      myFunc={"setKriteriaLuaran"}
                      callDataBack={handleBackData}
                    />
                  }
                    <button className="btn button-switch" onClick={() => setKriteriaShowData(!kriteriaShowData)} type="button">{kriteriaShowData ? 'Edit data' : 'Tampilkan data'}</button>
                </Form.Group>

                {/* TEXTAREA */}

                <Form.Group className="mt-5">
                  <Form.Group className="mt-3">
                    <h6>Catatan Luaran</h6>
                    <Form.Control
                      as="textarea"
                      value={catatanLuaran}
                      disabled={!selectedLuaran}
                      placeholder="Isi Catatan Luaran"
                      onChange={(e) => setCatatanLuaran(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Form.Group>

                <button onClick={!seeDataCondition ? handleShowAllData : handleHideData} className="btn button-switch-verification">{!seeDataCondition ? 'Verifikasi Data' : 'Edit Data' }</button>

                <div className="mt-3 d-flex justify-content-end">
                  <ConfirmModal
                    onConfirm={addLuaran}
                    successMessage={"Data berhasil ditambahkan"}
                    cancelMessage={"Data gagal ditambahkan"}
                    buttonText={"Simpan"}
                  />
                </div>
              </Form>
            )}
          </>
        )}


        {!formVisible && (
          <div className="container">
            <h3 className="text-center">Loading...</h3>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
