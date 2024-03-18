import React,{useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'


const SeeModalData = ({open, data, name, onHide, allData, onObj, myFunc, callDataBack}) => {

    const [show, setShow] = useState(open)
    const [dataModal, setDataModal] = useState(data)

    useEffect(() => {setDataModal(data)}, [data])

    const handleRemoveItem = (index) => {
        const newData = [...dataModal];
        newData.splice(index, 1); 
        setDataModal(newData);
        callDataBack(newData, allData, onObj, myFunc)
    };

  return (
    <Modal show={show} onHide={() => onHide()} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataModal ? (
          dataModal.map((item, index) => (
            <li>
              <span>{item}</span>
              <span className='btn' onClick={() => handleRemoveItem(index)}>&times;</span>
            </li>
          ))
        ) : (
          <h1>Data Kosong</h1>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SeeModalData