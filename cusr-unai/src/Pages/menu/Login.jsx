import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/menu/ErrorModal";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      return localStorage.removeItem("token");
    }
  }, []);

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email: username,
        password: password,
      });
      const role = res.data.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "perawat") {
        navigate("/perawat/dashboard");
      }
      localStorage.setItem("token", res.data.access_token);
    } catch (error) {
      setShow(true);
      setError(error.response.data.message);
    }
  };


  return (
    <div className="blue-login d-flex justify-content-center align-items-center">
      <ErrorModal
        show={show}
        onClose={() => setShow(false)}
        textModal={error}
      />
      <div className="card-login bg-white rounded">
        <div className="image-logo container pt-5 pb-3 d-flex justify-content-evenly">
          <img src="./assets/img/logo.svg" alt="tes" className="w-40" />
          <strong className="pt-2">Klinik Universitas Advent Indonesia</strong>
        </div>
        <Form className="container" onSubmit={loginForm}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-danger">{`${error}`}</Form.Text>
          </Form.Group>
          <Form.Group className="pt-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-danger">{`${error}`}</Form.Text>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 loginbutton mb-3"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
