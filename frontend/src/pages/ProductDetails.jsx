import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { useParams } from "react-router-dom";

import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Table,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { StarFill } from "react-bootstrap-icons";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Slider from "react-slick"; // Add this at the top if not already present

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faMicrophone,
  faHeadphones,
  faShieldAlt,
  faTruck,
  faUndoAlt,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}/`);
        const baseURL = "https://techronyx-fullstackweb.onrender.com";

        // Clone and fix image paths in the 'details' object
        const fixedDetails = { ...response.data.details };
        const imageKeys = [
          "image1",
          "image2",
          "image3",
          "image4",
          "gallery1",
          "gallery2",
          "gallery3",
          "gallery4",
        ];

        imageKeys.forEach((key) => {
          if (fixedDetails[key] && !fixedDetails[key].startsWith("http")) {
            fixedDetails[key] = `${baseURL}${fixedDetails[key]}`;
          }
        });

        // Set updated product in state
        setProduct({
          ...response.data,
          details: fixedDetails,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product || !product.details) return <div>Loading...</div>;

  const {
    title,
    image1,
    image2,
    image3,
    image4,
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    rating,
    reviews,
    new_price,
    old_price,
    discount,
    offer,
    stock_status,
    description,
  } = product.details;

  const handleAddToCart = async (productId) => {
    console.log("Adding product with ID:", productId);
    try {
      const response = await axiosInstance.post("/cartitems/", {
        product_id: productId,
        quantity: 1,
      });
      if (response.status === 201) {
        console.log("Item added to cart:", response.data);
      }
    } catch (err) {
      console.error("Failed to add item to cart:", err);
    }
  };

  const galleryImages = [gallery1, gallery2, gallery3, gallery4];

  if (!product) {
    return <div className="text-light p-4">Product not found.</div>;
  }

  return (
    <Container className="my-5">
      <Row className="g-5">
        <Col md={6}>
          <div
            style={{
              position: "sticky",
              top: "100px", // Adjust based on your navbar height
              zIndex: 2,
            }}
            className="d-flex justify-content-center"
          >
            <Carousel style={{ maxWidth: "800px", width: "100%" }}>
              {[image1, image2, image3, image4].map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className="d-block w-100 rounded"
                    style={{ height: "500px", objectFit: "contain" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Col>

        <Col md={6}>
          <h2 style={{ color: "silver" }}>{title}</h2>
          <div className="d-flex align-items-center mb-2">
            <StarFill color="gold" className="me-1" />
            <span className="text-warning fw-bold">{rating}</span>
            <small className="text-muted ms-2">({reviews} reviews)</small>
          </div>

          <div className="mb-3">
            <span className="fs-3 fw-bold me-3">{new_price}</span>
            <span className="text-muted text-decoration-line-through">
              {old_price}
            </span>
            <Badge bg="warning" className="ms-2" style={{ color: "black" }}>
              {discount} Off
            </Badge>
            <p className="text-muted small mb-0">(Incl. all taxes)</p>
          </div>

          <div className="text-success mb-3">{offer}</div>

          <div className="mb-3">
            <strong>Status:</strong>{" "}
            <span
              className={
                stock_status === "In Stock" ? "text-success" : "text-danger"
              }
            >
              {stock_status}
            </span>
          </div>

          <div className="d-flex gap-3 mb-4">
            <Button
              variant="dark"
              className="px-4 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2 shadow-sm"
              style={{ transition: "all 0.2s ease-in-out" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </Button>

            <Button
              variant="warning"
              className="px-4 py-2 rounded-pill fw-semibold text-dark d-flex align-items-center gap-2 shadow-sm"
              style={{ transition: "all 0.2s ease-in-out" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Buy Now
            </Button>
          </div>

          <div className="mb-4">
            <strong>Free Delivery:</strong> in 2-3 business days.
            <p>
              or fastest delivery <strong>Tomorrow 9am to 1pm</strong>
            </p>
            <p className="text-muted">Order within 5hr 19min</p>
          </div>

          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Quantity: 1</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  {[2, 3, 4, 5, 6].map((qty) => (
                    <ListGroup.Item key={qty}>{qty}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="mt-5">
            <h4 className="mb-3">Key Features</h4>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <FontAwesomeIcon icon={faHeadphones} /> 13mm drivers with deep
                bass
              </Col>
              <Col xs={12} md={6}>
                <FontAwesomeIcon icon={faBolt} style={{ color: "#ffc800" }} />{" "}
                Up to 30 hours battery
              </Col>
              <Col xs={12} md={6}>
                <FontAwesomeIcon icon={faBluetooth} /> Bluetooth 5.4
              </Col>
              <Col xs={12} md={6}>
                <FontAwesomeIcon
                  icon={faMicrophone}
                  style={{ color: "#ffdd00" }}
                />{" "}
                Voice assistant support
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div className="mt-5">
        <h4>Description</h4>
        <p>{description}</p>
      </div>

      <div className="mt-4">
        <h4>Specifications</h4>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>Driver Size</td>
              <td>40mm</td>
            </tr>
            <tr>
              <td>Bluetooth Version</td>
              <td>5.4</td>
            </tr>
            <tr>
              <td>Water Resistance</td>
              <td>IPX5</td>
            </tr>
            <tr>
              <td>Charging Port</td>
              <td>Type-C</td>
            </tr>
            <tr>
              <td>EQ Modes</td>
              <td>Bass, Rock, Pop, Vocal</td>
            </tr>
            <tr>
              <td>Gaming Mode</td>
              <td>Low Latency</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>1 Year</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="my-5">
        <h4 className="mb-4">Product Gallery</h4>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
          pauseOnHover={true}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {galleryImages.map((img, idx) => (
            <div key={idx} className="px-2">
              <img
                src={img}
                alt={`gallery ${idx}`}
                className="img-fluid rounded shadow-sm"
                style={{
                  maxHeight: "600px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="mt-4">
        <h4>FAQs</h4>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Is the product water-resistant?</Accordion.Header>
            <Accordion.Body>Yes, it is rated IPX5.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I use it while charging?</Accordion.Header>
            <Accordion.Body>
              Yes, you can use it in wired mode using AUX.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What is the warranty procedure?</Accordion.Header>
            <Accordion.Body>
              Register on our website to avail your 1-Year Warranty.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="mt-5 p-3 bg-light rounded text-center">
        <Row className="g-4">
          <Col>
            <FontAwesomeIcon icon={faShieldAlt} size="2x" className="mb-2" />
            <div>1-Year Warranty</div>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faTruck} size="2x" className="mb-2" />
            <div>Fast & Free Delivery</div>
          </Col>
          <Col>
            <FontAwesomeIcon icon={faUndoAlt} size="2x" className="mb-2" />
            <div>Easy 7-Day Return</div>
          </Col>
          <Col>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size="2x"
              className="mb-2"
            />
            <div>Support Available</div>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <h4 className="mb-4">Customer Reviews</h4>
        <Row className="g-4">
          {[
            {
              name: "John D.",
              rating: 5,
              text: "Absolutely love these headphones! The bass is amazing and battery lasts forever.",
              date: "July 10, 2025",
            },
            {
              name: "Priya S.",
              rating: 4,
              text: "Very comfortable to wear. Great for calls and music. Only wish it came in more colors.",
              date: "July 15, 2025",
            },
            {
              name: "Alex M.",
              rating: 5,
              text: "Fast delivery and solid sound quality. Excellent value for the price.",
              date: "July 20, 2025",
            },
          ].map((review, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0">{review.name}</h6>
                      <div className="text-warning d-flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarFill key={i} />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <StarFill key={i} color="#e4e5e9" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {review.text}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="bg-transparent border-0 text-muted small text-end">
                  Reviewed on {review.date}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}

export default ProductDetail;
