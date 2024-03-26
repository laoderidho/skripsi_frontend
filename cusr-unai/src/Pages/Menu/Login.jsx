import React, { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/menu/ErrorModal";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showAnimate, setShowAnimate] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return localStorage.removeItem("token");
    }
    if(sessionStorage.getItem("sidebarStatus")){
      return sessionStorage.removeItem("sidebarStatus")
    }
  }, []);

  const loginForm = async (e) => {
    e.preventDefault();
    setShowAnimate(true);
    try {
      const res = await axios.post("/login", {
        email: username,
        password: password,
      });
      const role = res.data.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "perawat") {
        navigate("/perawat/profile");
      }
      localStorage.setItem("token", res.data.access_token);
      setShowAnimate(false);
    } catch (error) {
      setShow(true);
      setShowAnimate(false);
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
            <Form.Label id="form-label">Username</Form.Label>
            <Form.Control
              id="form-control-login"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  passwordRef.current.focus();
                }
              }}
              ref={usernameRef}
            />
            <Form.Text className="text-danger">{`${error}`}</Form.Text>
          </Form.Group>
          <Form.Group className="pt-2">
            <Form.Label id="form-label">Password</Form.Label>
            <Form.Control
              id="form-control-login"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  loginForm(e);
                }
              }}
              ref={passwordRef}
            />
            <Form.Text className="text-danger">{`${error}`}</Form.Text>
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mt-3 loginbutton mb-3"
            disabled={username === "" || password === "" || showAnimate}
          >
            {showAnimate ? "Loading..." : "Login"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
