import React, {useEffect, useState} from 'react';
import { Accordion, Button, Card, Form} from 'react-bootstrap';
import axios from '../../../axios'
import "../../../../src/style/accordion.css";
import { Dropdown }  from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import "primereact/resources/themes/saga-blue/theme.css";

export default function FormDiagnosa() {

    const [diagnosa, setDiagnosa] = useState([])

    const [selectedDiagnosa, setSelectedDiagnosa] = useState("");
    const [selectedFaktorRisiko, setSelectedFaktorRisiko] = useState([]);
    const [selectedPenyebabFisiologis, setSelectedPenyebabFisiologis] = useState([]);
    const [selectedPenyebabSituasional, setSelectedPenyebabSituasional] = useState([]);
    const [selectedPenyebabPsikologis, setSelectedPenyebabPsikologis] = useState([]);
    const [selectedGejalaMayorSubjektif, setSelectedGejalaMayorSubjektif] = useState([]);
    const [selectedGejalaMayorObjektif, setSelectedGejalaMayorObjektif] = useState([]);
    const [selectedGejalaMinorSubjektif, setSelectedGejalaMinorSubjektif] = useState([]);
    const [selectedGejalaMinorObjektif, setSelectedGejalaMinorObjektif] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [filterDataDiagnosa, setFilterDataDiagnosa] = useState([]);

    // VALUE
    
    const [faktor_risiko, setFaktorRisiko] = useState(null);
    const [penyebab_fisiologis, setPenyebabFisiologis] = useState(null);
    const [penyebab_situasional, setPenyebabSituasional] = useState(null);
    const [penyebab_psikologis, setPenyebabPsikologis] = useState(null);
    const [gejala_mayor_subjektif, setGejalaMayorSubjektif] = useState(null);
    const [gejala_mayor_objektif, setGejalaMayorObjektif] = useState(null);
    const [gejala_minor_subjektif, setGejalaMinorSubjektif] = useState(null);
    const [gejala_minor_objektif, setGejalaMinorObjektif] = useState(null);

    
    const createDiagnosaOptions = () => {
      if (!diagnosa || diagnosa.length === 0) {
        return [
          { value: '', label: 'Pilih Diagnosa'}
        ];
      } else {
          const options = [
            { value: '', label: '-'}
          ];

          diagnosa.forEach((item, index) => {
            options.push({
              value: item.id,
              label: `${item.kode_diagnosa} - ${item.nama_diagnosa}`
            });
          });
        return options;
      }
    };

    

    const FilterSearchValue = () => {
        const filteredDiagnosa = diagnosa.filter((item) => {
            return (
                item.kode_diagnosa.toString().toLowerCase().includes(inputValue.toLowerCase()) ||
                item.nama_diagnosa.toString().toLowerCase().includes(inputValue.toLowerCase())
            );
        });
        setFilterDataDiagnosa(filteredDiagnosa);
    };

    const token=localStorage.getItem("token");
    

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
            
            setSelectedFaktorRisiko(selectedDiagnosaData.faktor_risiko);
            setSelectedPenyebabFisiologis(selectedDiagnosaData.penyebab_fisiologis);
            setSelectedPenyebabSituasional(selectedDiagnosaData.penyebab_situasional);
            setSelectedPenyebabPsikologis(selectedDiagnosaData.penyebab_psikologis);
            setSelectedGejalaMayorSubjektif(selectedDiagnosaData.gejala_mayor_subjektif);
            setSelectedGejalaMayorObjektif(selectedDiagnosaData.gejala_mayor_objektif);
            setSelectedGejalaMinorSubjektif(selectedDiagnosaData.gejala_minor_subjektif);
            setSelectedGejalaMinorObjektif(selectedDiagnosaData.gejala_minor_objektif);

            // console.log(selectedDiagnosaData.penyebab_fisiologis)

            // if (selectedDiagnosaData) {
                // setSelectedFaktorRisiko(selectedDiagnosaData.faktor_risiko);
               // setSelectedPenyebabFisiologis(selectedDiagnosaData.penyebab_fisiologis);
               // setSelectedPenyebabSituasional(selectedDiagnosaData.penyebab_situasional);
                
            // }
        
        } catch (error) {
            
        }
    } 

    useEffect(()=>{
        const fetchData = async () => {
          try {
            await handleDiagnosaChange(selectedDiagnosa);
            console.log(selectedDiagnosa);
            console.log(selectedPenyebabFisiologis);
            console.log(selectedGejalaMinorObjektif);
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
    },[selectedDiagnosa])


    const getDiagnosa = async (token) => {
        try {
            await axios.post("/perawat/diagnosa", {}, {
                headers: { Authorization: `Bearer $(token)`}
            })
            .then((res) => {
                console.log(res)
                setDiagnosa(res?.data?.data);
            });
        } catch (error) {
            
        }
    };

    useEffect(() => {
        getDiagnosa(localStorage.getItem('token'))
    }, []);


    // console.log(diagnosa)

    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item>
            <Accordion.Header>Diagnosa</Accordion.Header>
            <Accordion.Body className="accordion-form">
              <Card>
                <Card.Body>
                  <Form className="container">
                    <Form.Group className="mt-4">
                      <Form.Label>Diagnosa</Form.Label>

                      <Dropdown
                        value={selectedDiagnosa}
                        onChange={(e) => setSelectedDiagnosa(e.target.value)}
                        options={createDiagnosaOptions()}
                        placeholder="Pilih Diagnosa"
                        filter
                        required
                        className='pt-1'
                      ></Dropdown>

                      <Form.Group className="mt-3">
                        <Form.Label>Faktor Risiko</Form.Label>

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
                      </Form.Group>
                      <Form.Group className="mt-5">
                        <h6>Penyebab</h6>
                        <Form.Label>Penyebab Fisiologis</Form.Label>
                        <MultiSelect
                          value={penyebab_fisiologis}
                          disabled={!selectedDiagnosa}
                          options={selectedPenyebabFisiologis}
                          optionLabel="nama_penyebab"
                          placeholder='Pilih Penyebab Fisiologis'
                          filter
                          className='pt-1'
                          onChange={(e) => setPenyebabFisiologis(e.value)}
                          maxSelectedLabels={3}
                          > 
                        </MultiSelect>
                        
                      </Form.Group>

                      <Form.Group className="mt-3">
                        <Form.Label>Penyebab Situasional</Form.Label>
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
                      </Form.Group>

                      <Form.Group className="mt-3">
                        <Form.Label>Penyebab Psikologis</Form.Label>
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
                      </Form.Group>

                      <Form.Group className="mt-5">
                        <h6>Gejala dan Tanda Mayor</h6>
                        <Form.Label>Subjektif</Form.Label>
                        <MultiSelect
                          value={gejala_mayor_subjektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMayorSubjektif}
                          optionLabel="nama_gejala_mayor"
                          placeholder="Pilih Subjektif"
                          filter
                          className="pt-1"
                          onChange={(e) => setGejalaMayorSubjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                      </Form.Group>

                      <Form.Group className="mt-3">
                        <Form.Label>Objektif</Form.Label>
                        <MultiSelect
                          value={gejala_mayor_objektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMayorObjektif}
                          optionLabel="nama_gejala_mayor"
                          placeholder="Pilih Objektif"
                          filter
                          className="pt-1"
                          onChange={(e) => setGejalaMayorObjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                      </Form.Group>

                      <Form.Group className="mt-5">
                        <h6>Gejala dan Tanda Minor</h6>
                        <Form.Label>Subjektif</Form.Label>
                        <MultiSelect
                          value={gejala_minor_subjektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMinorSubjektif}
                          optionLabel="nama_gejala_minor"
                          placeholder="Pilih Subjektif"
                          filter
                          className="pt-1"
                          onChange={(e) => setGejalaMinorSubjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                      </Form.Group>

                      <Form.Group className="mt-3">
                        <Form.Label>Objektif</Form.Label>
                        <MultiSelect
                          value={gejala_minor_objektif}
                          disabled={!selectedDiagnosa}
                          options={selectedGejalaMinorObjektif}
                          optionLabel="nama_gejala_minor"
                          placeholder="Pilih Objektif"
                          filter
                          className="pt-1"
                          onChange={(e) => setGejalaMinorObjektif(e.value)}
                          maxSelectedLabels={3}
                        ></MultiSelect>
                      </Form.Group>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
}