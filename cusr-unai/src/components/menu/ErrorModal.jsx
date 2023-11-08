import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const ErrorModal = ({show, onClose, textModal}) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Peringatan</Modal.Title>
      </Modal.Header>
      <Modal.Body>{textModal}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal