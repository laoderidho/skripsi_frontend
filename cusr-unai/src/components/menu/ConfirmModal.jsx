import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ConfirmModal = ({
  onConfirm,
  successMessage,
  cancelMessage,
  buttonText,
}) => {
  const navigate = useNavigate();

  const showApiConfirmation = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onConfirm();
        Swal.fire("Berhasil!", successMessage, "success");
      } else {
        Swal.fire("Dibatalkan", cancelMessage, "warning");
      }
    });
  };

  return (
    <Button
      variant="btn confirm-button"
      onClick={showApiConfirmation}
    >
      {buttonText}
    </Button>
  );
};

export default ConfirmModal;
