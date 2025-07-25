import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/loginbackground5_PhotoGrid.png";
import logo from "../assets/techronyxsignwhitelogonobg.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Loginstyles.css"; 
import { toast } from "react-toastify";

function Signup() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) navigate("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://techronyx-fullstackweb.onrender.com/api/users/register/", {
        email,
        fname,
        lname,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.info(" Registration successful!", {
  style: {
    background: "#0070FF",    
    color: "#ffffff",
    fontWeight: "600",
    borderRadius: "10px",
    padding: "12px 16px",
  },
  icon: "✅",
});
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
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
        <h4 className="text-white mb-2">Create Account</h4>
        <p className="text-white mb-3 fs-5">We’re glad you’re here!</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="First name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
              className="glass-input p-2"
            />
          </Form.Group>

          <Form.Group controlId="formLname" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
              className="glass-input p-2"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass-input p-2"
            />
          </Form.Group>

          <InputGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="glass-input p-2"
            />
          </InputGroup>

          <Button
            type="submit"
            className="w-100 rounded-pill mb-3 fw-bold"
            style={{ backgroundColor: "#FFA07A", border: "none" }}
          >
            Register
          </Button>

          <p className="text-white small">
            Already have an account?{" "}
            <a href="/login" className="text-white">
              <u>Login</u>
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}

export default Signup;
