import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-dark text-light min-vh-100 d-flex flex-column" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
{/* header */}
      <header className="bg-black shadow-sm py-3 mb-4 border-bottom border-secondary">
        <Container>
          <h1 className="h3 mb-0 text-primary fw-semibold">Techronyx</h1>
        </Container>
      </header>

      {/* contact section */}
      <Container className="flex-grow-1 d-flex align-items-center">
        <Row className="w-100 justify-content-center align-items-center py-5">
          {/* info panel */}
          <Col lg={5} className="mb-5 mb-lg-0">
            <h2 className="display-6 fw-bold text-white mb-3">Let’s Connect</h2>
            <p className="text-light fs-6">
              Have a project in mind or just want to chat? We’re here to help. Send us a message and we’ll get back to you shortly.
            </p>
            <div className="mt-4 fs-6">
              <p className="mb-2">
                <i className="fas fa-envelope me-2 text-primary"></i>
                contact@techronyx.com
              </p>
              <p>
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                123 Business Road, Tech City
              </p>
            </div>
          </Col>

          {/* form panel */}
          <Col lg={7}>
            {submitted && (
              <Alert variant="success" className="text-center fw-medium">
                 Message sent successfully!
              </Alert>
            )}

            <div
              className="p-4 rounded shadow"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your name"
                        required
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="bg-dark text-light border-secondary"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="text-light">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Your message..."
                    required
                    className="bg-dark text-light border-secondary"
                  />
                </Form.Group>

                <div className="text-end">
                  <Button type="submit" variant="primary" className="px-4">
                    Send Message
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* footer */}
      <footer className="bg-black text-center py-3 mt-auto border-top border-secondary text-muted small">
        &copy; 2025 Techronyx. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;
