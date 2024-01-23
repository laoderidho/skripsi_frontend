import React, {useEffect, useState} from 'react';
import { Accordion, Button, Card, Form} from 'react-bootstrap';
import axios from '../../../axios'
import "../../../../src/style/accordion.css";
import { Dropdown }  from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';

export default function FormDiagnosa() {

    const [diagnosa, setDiagnosa] = useState([])

    const [selectedDiagnosa, setSelectedDiagnosa] = useState("");
    const [selectedFaktorRisiko, setSelectedFaktorRisiko] = useState([]);
    const [selectedPenyebabFisiologis, setSelectedPenyebabFisiologis] = useState([]);
    const [selectedPenyebabSituasional, setSelectedPenyebabSituasional] = useState([]);
    const [selectedPenyebabPsikologis, setSelectedPenyebabPsikologis] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const [filterDataDiagnosa, setFilterDataDiagnosa] = useState([]);
    
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

    const createFaktorRisikoOptions = () => {
      if (!selectedFaktorRisiko || selectedFaktorRisiko === 0) {
        return [
          { value: '', label: 'Pilih Faktor Risiko'}
        ];
      } else {
        const options = [
          { value: '', label: '-'}
        ];

        selectedFaktorRisiko.forEach((item, index) => {
          options.push({
            value: item.id,
            label: item.nama
          });
        });

      return options; 
      } 
    };

    const createPenyebabSituasionalOptions = () => {
      if (!selectedPenyebabSituasional || selectedPenyebabSituasional === 0) {
        return [
          { value: '', label: 'Pilih Penyebab Situasional'}
        ];
      } else {
        const options = [
          { value: '', label: '-'}
        ];

        selectedPenyebabSituasional.forEach((item,index) => {
          options.push({
            value: item.id,
            label: item.nama_penyebab
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
            
            setSelectedFaktorRisiko(selectedDiagnosaData.selectedFaktorRisiko);
            setSelectedPenyebabFisiologis(selectedDiagnosaData.selected);
            setSelectedPenyebabSituasional(selectedDiagnosaData.penyebab_situasional);
            setSelectedPenyebabPsikologis(selectedDiagnosaData.penyebab_psikologis);
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

                      {/* <Form.Select
                        id="form-control-input"
                        value={selectedDiagnosa}
                        onChange={(e) => setSelectedDiagnosa(e.target.value)}
                        required
                      >
                        <option value="">Masukkan Diagnosa Pasien</option>
                        {diagnosa.map((item, index) => (
                          <option key={index} value={item.id}>
                            <span>{item.kode_diagnosa}</span> -{" "}
                            <span>{item.nama_diagnosa}</span>
                          </option>
                        ))}
                      </Form.Select> */}

                      <Dropdown
                        
                        value={selectedDiagnosa}
                        onChange={(e) => setSelectedDiagnosa(e.target.value)}
                        options={createDiagnosaOptions()}
                        placeholder='Pilih Diagnosa'
                        filter
                        required
                      >
  
 
                      </Dropdown>


                      <Form.Group className="mt-3">
                        <Form.Label>Faktor Risiko</Form.Label>

                        <MultiSelect 
                          value={selectedFaktorRisiko}
                          disabled={!selectedDiagnosa}
                          options={createFaktorRisikoOptions()}
                          placeholder='Pilih Faktor Risiko'

                          >

                        </MultiSelect>
                        {/* <Form.Select
                          id="form-control-input"
                          value={selectedFaktorRisiko}
                          disabled={!selectedDiagnosa}
                        >
                          {selectedFaktorRisiko &&
                            selectedFaktorRisiko.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.nama}
                              </option>
                            ))}
                        </Form.Select> */}
                      </Form.Group>
                      <Form.Group className="mt-5">
                        <h6>Penyebab</h6>
                        <Form.Label>Penyebab Fisiologis</Form.Label>
                        <Form.Select
                          id="form-control-input"
                          value={selectedPenyebabFisiologis}
                          disabled={!selectedDiagnosa}
                        >
                          <option value="">Pilih Penyebab Fisiologis</option>
                          {selectedPenyebabFisiologis &&
                            selectedPenyebabFisiologis.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.nama_penyebab}
                              </option>
                            ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mt-3">
                        <Form.Label>Penyebab Situasional</Form.Label>

                        <MultiSelect 
                          value={selectedPenyebabSituasional}
                          disabled={!selectedDiagnosa}
                          options={createPenyebabSituasionalOptions()}
                          placeholder='Pilih Penyebab Situasional'
                          
                          >

                        </MultiSelect>
                        {/* <Form.Select
                          id="form-control-input"
                          value={selectedPenyebabSituasional}
                          disabled={!selectedDiagnosa}
                        >
                        <option value="">Pilih Penyebab Situasional</option>
                        {selectedPenyebabSituasional && selectedPenyebabSituasional.map(
                            (item, index) => (
                              <option key={index} value={item.id}>
                                {item.nama_penyebab}
                              </option>
                            )
                          
                        )}
                        </Form.Select> */}
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