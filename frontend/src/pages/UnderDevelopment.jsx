import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const UnderDevelopment = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      

      {/* Main Content */}
      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center py-5">
        <h2 className="display-5 mb-3">Page Under Development</h2>
        <p className="text-muted mb-4">
          We're working hard to launch this page soon. Stay tuned!
        </p>

        {/* Social Icons */}
        <div>
          <a href="#" className="text-dark mx-3 fs-4" title="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-dark mx-3 fs-4" title="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" className="text-dark mx-3 fs-4" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </Container>

    </div>
  );
};

export default UnderDevelopment;
