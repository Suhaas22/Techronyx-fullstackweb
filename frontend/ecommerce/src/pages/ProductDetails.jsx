import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import "./ProductDetails.css";

const webGalleryImages = {
  1: ["apple-earpods-web.png"],
  2: ["jbl-t50hi-web.png"],
  3: ["boat-bassheads-web.jpg"],
  4: ["airdopes-141-web.jpg"],
  5: ["airdopes-141-web.jpg"],
  6: ["airdopes-141-web.jpg"],
  8: ["bose-quietcomfort-web.png"],
  9: ["bose-quietcomfort-web.png"],
};

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setProduct(null);
    setError("");

    axios.get(`products/${id}/`)
      .then((response) => {
        if (isCurrent) setProduct(response.data);
      })
      .catch((requestError) => {
        if (!isCurrent) return;
        setError(requestError.response?.status === 404
          ? "This product could not be found."
          : "Unable to load this product. Please try again.");
      });

    return () => { isCurrent = false; };
  }, [id]);

  const addToCart = async () => {
    setIsAdding(true);
    try {
      await axios.post("cartitems/", { product_id: product.id, quantity: 1 });
      toast.success("Item added to cart!");
    } catch (requestError) {
      toast.error(requestError.response?.status === 401
        ? "Please sign in to add items to your cart."
        : "Unable to add this item to your cart.");
    } finally {
      setIsAdding(false);
    }
  };

  if (error) return <Container className="py-5 text-center"><h2>{error}</h2></Container>;
  if (!product) return <Container className="py-5 text-center">Loading product…</Container>;

  const details = product.details || {};
  const title = product.title;
  const rating = details.rating || product.rating;
  const reviews = details.reviews ?? product.reviews;
  const newPrice = details.new_price || product.new_price;
  const oldPrice = details.old_price || product.old_price;
  const discount = details.discount || product.discount;
  const offer = details.offer || product.offer;
  const formatPrice = (price) => String(price).startsWith("₹") ? price : `₹${price}`;
  const mediaBaseUrl = axios.defaults.baseURL.replace(/\/api\/?$/, "");
  const supplementaryImages = (webGalleryImages[product.id] || [])
    .map((image) => `${mediaBaseUrl}/media/product-gallery/${image}`);
  const images = [details.image1, details.image2, details.image3, details.image4, product.image, ...supplementaryImages]
    .filter(Boolean)
    .filter((image, index, list) => list.indexOf(image) === index);
  const gallery = [details.gallery1, details.gallery2, details.gallery3, details.gallery4, ...supplementaryImages]
    .filter(Boolean)
    .filter((image, index, list) => list.indexOf(image) === index);

  return (
    <Container className="product-details-page my-5">
      <Row className="g-5">
        <Col md={6}>
          <Card className="product-details-media border-0 shadow-sm p-3">
            <Carousel variant="dark" indicators={images.length > 1} controls={images.length > 1}>
              {images.map((image, index) => (
                <Carousel.Item key={image}>
                  <img src={image} alt={`${title} view ${index + 1}`} className="d-block w-100" />
                </Carousel.Item>
              ))}
            </Carousel>
          </Card>
        </Col>
        <Col md={6}>
          <p className="product-details-eyebrow">Techronyx Audio</p>
          <h1 className="product-details-title">{title}</h1>
          <div className="d-flex align-items-center gap-2 mb-3">
            <StarFill color="#f5a524" />
            <span className="product-details-rating">{rating}</span>
            <span className="product-details-muted">({reviews} reviews)</span>
          </div>
          <div className="mb-3">
            <span className="product-details-price me-3">{formatPrice(newPrice)}</span>
            <span className="product-details-old-price text-decoration-line-through">{formatPrice(oldPrice)}</span>
            {discount && <Badge bg="warning" text="dark" className="ms-2">{discount} off</Badge>}
          </div>
          {offer && <p className="product-details-offer">{offer}</p>}
          <p className="product-details-description">{details.description || "Product details will be available soon."}</p>
          <p className={details.stock_status && details.stock_status !== "In Stock" ? "text-danger fw-semibold" : "text-success fw-semibold"}>
            {details.stock_status || "In Stock"}
          </p>
          <Button className="product-details-cart-button" size="lg" disabled={isAdding} onClick={addToCart}>
            {isAdding ? "Adding…" : "Add to Cart"}
          </Button>
          <Row className="g-3 mt-4">
            <Col xs={4}><div className="product-details-benefit"><strong>Free delivery</strong><span>On eligible orders</span></div></Col>
            <Col xs={4}><div className="product-details-benefit"><strong>7-day returns</strong><span>Easy return policy</span></div></Col>
            <Col xs={4}><div className="product-details-benefit"><strong>Secure payment</strong><span>Protected checkout</span></div></Col>
          </Row>
        </Col>
      </Row>

      <section className="product-details-information mt-5">
        <h2 className="h4 mb-3">Product information</h2>
        <Row className="g-3">
          <Col md={3}><strong>Rating</strong><span>{rating} / 5</span></Col>
          <Col md={3}><strong>Reviews</strong><span>{reviews}</span></Col>
          <Col md={3}><strong>Offer</strong><span>{discount || "Available"}</span></Col>
          <Col md={3}><strong>Availability</strong><span>{details.stock_status || "In Stock"}</span></Col>
        </Row>
      </section>

      {gallery.length > 0 && (
        <section className="mt-5">
          <h2 className="h4 mb-3">Product gallery</h2>
          <Row className="g-3">
            {gallery.map((image, index) => (
              <Col key={image} xs={12} md={6} lg={3}>
                <img src={image} alt={`${title} gallery ${index + 1}`} className="product-details-gallery-image" />
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
}

export default ProductDetails;
