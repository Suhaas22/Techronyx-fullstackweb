import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css'; 
import logo from '../assets/techronyxwhitelogonobg.png';

function Footer() {
  return (
    <footer className="footer-section text-light pt-5 pb-3">
      <Container>
        <Row className="mb-5">
          {/* Brand Info */}
<Col md={3}>
  <img src={logo} alt="Description" className="img-fluid" style={{width : '150px'}} />
</Col>


          {/* Quick Links */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/products" className="footer-link">Products</a></li>
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </Col>

          {/* Help */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold mb-3">Help</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="footer-link">Shipping</a></li>
              <li><a href="#" className="footer-link">Returns</a></li>
              <li><a href="#" className="footer-link">FAQs</a></li>
              <li><a href="#" className="footer-link">Support</a></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col md={3}>
            <h6 className="text-uppercase fw-semibold mb-3">Newsletter</h6>
            <Form className="d-flex mb-3">
              <Form.Control
                type="email"
                placeholder="Your email"
                className="me-2 rounded-pill px-3 newsletter-input"
              />
              <Button variant="light" className="rounded-pill fw-semibold px-4">Subscribe</Button>
            </Form>
            <div className="footer-icons">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <Row>
          <Col className="text-center small" style={{ color: "white" }}>
  © 2025 Techronyx. All rights reserved.
</Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
