import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import background from "../assets/loginbackground5_PhotoGrid.png";
import logo from '../assets/techronyxsignwhitelogonobg.png' 
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginstyles.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) navigate("/");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/users/login/", {
        username,
        password,
      });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div
      className="login-wrapper d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
  <img
    src={logo}
    alt="Company Logo"
    className="mb-4"
    style={{
      width: "250px",
      height : "80px",
      objectFit: "contain",
      position: "absolute",
      top: "40px",
      left: "49%",
      transform: "translateX(-50%)"
    }}
  />


      <Card className="glass-card text-center p-5 shadow-lg border-0 rounded-4">
        <h4 className="text-white mb-1">Login</h4>
        <p className="text-white mb-4 fs-5">Have an account?</p>

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="glass-input p-2"
              required
            />
          </Form.Group>

          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input p-2"
              required
            />
          </InputGroup>

          <div className="d-flex justify-content-center mb-3 text-white small">
            Don't have an account?
            <Link to="/signup" className="text-white ms-2">
            <u>Signup</u>
            </Link> 

          </div>

          {error && <p className="text-danger small">{error}</p>}

          <Button
            type="submit"
            className="w-100 rounded-pill mb-3 fw-bold"
            style={{ backgroundColor: "#FFA07A", border: "none" }}
          >
            SIGN IN
          </Button>

          <p className="text-white my-3 small">— Or Sign In With —</p>

          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" className="px-4 rounded-pill fw-semibold">
              Facebook
            </Button>
            <Button variant="light" className="px-4 rounded-pill fw-semibold">
              Twitter
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
