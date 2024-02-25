import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/menu/Sidebar";
import axios from "../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import ConfirmModal from "../../../components/menu/ConfirmModal";

export default function FormImplementasi() {
  const [nama_intervensi, setNamaIntervensi] = useState("");
  const [tindakan, setTindakan] = useState([]);
  const [checked, setChecked] = useState(false);

  const [checkedTindakan, setCheckedTindakan] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getDataById = async () => {
    try {
      const res = await axios.post(
        `/perawat/implementasi/get-implementasi-pasien/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTindakan(res.data.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDataById();
  }, []);

  const joinTindakan = () => {
    let tindakan = [];
    for (let key in checkedItems) {
      if (checkedItems[key] === true) {
        tindakan.push(key);
      }
    }
    return tindakan;
  };

  const [checkedItems, setCheckedItems] = useState({});

  // Fungsi untuk menangani perubahan status pencentangan pada checkbox
  const handleCheckboxChange = (event, id_implementasi) => {
    const { checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id_implementasi]: checked,
    }));
  };

  useEffect(() => {
    console.log(joinTindakan());
  }, [checkedItems]);

  const addImplementasi = async () => {
    try {
    } catch (err) {}
  };

  return (
    <Sidebar>
      <div className="container">
        <h2>Form Implementasi</h2>
      </div>

      <div className="container pt-5">
        <Form className="container">
          <h6>Tindakan</h6>

          {tindakan.map((item, index) => (
            <Form.Group key={index}>
              <Form.Check
                type="checkbox"
                label={item.nama_implementasi}
                checked={checkedItems[item.id] || false}
                onChange={(e) => handleCheckboxChange(e, item.id)}
              />
            </Form.Group>
          ))}

          <div className="d-flex mt-4 justify-content-end">
            <ConfirmModal
              onConfirm={getDataById}
              successMessage={"Data berhasil di simpan"}
              cancelMessage={"Data gagal di simpan"}
              buttonText={"Simpan"}
            />
          </div>
        </Form>
      </div>
    </Sidebar>
  );
}
