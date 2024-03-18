import React,{useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap'

const SeeModalData = ({open, data, name, onHide}) => {

    const [show, setShow] = useState(open)
    const [dataModal, setDataModal] = useState(data)

    useEffect(() => {setDataModal(data)}, [data])

  return (
    <Modal show={show} onHide={() => onHide()} centered>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {dataModal ? (
          dataModal.map((item, index) => <li>{item}</li>)
        ) : (
          <h1>Data Kosong</h1>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default SeeModalData