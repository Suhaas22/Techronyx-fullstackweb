import { Card, Badge, Button } from "react-bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import "./ProductGridCard.css"; 

function ProductGridCard({
  id,
  image,
  bestseller,
  title,
  rating,
  reviews,
  new_price,
  old_price,
  offer,
  discount,
}) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
const handleAddToCart = async (e) => {
  e.preventDefault();

  if (isAdding) {
    console.warn("Already adding, skipping click");
    return;
  }

  console.log("START handleAddToCart");
  setIsAdding(true);

  try {
    console.log("Sending request...");
    const response = await axiosInstance.post("/cartitems/", {
      product_id: id,
      quantity: 1, 
    });

    if (response.status === 201 || response.status === 200) {
      console.log(" Added to cart:", response.data);
       toast.success("Item added to cart!");
    } else {
      console.warn(" Unexpected response:", response);
      alert(" Something went wrong.");
    }
  } catch (err) {
    if (err.response && err.response.status === 400) {
      console.warn(" Duplicate or bad request:", err.response.data);
      alert(" Item may already be in the cart.");
    } else {
      console.error(" Error while adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  } finally {
    setIsAdding(false);
  }
};

  return (
<Card   data-aos="zoom-in-up"
  data-aos-duration="600" className="product-card h-100 shadow-sm border-0 rounded-4 p-2 position-relative product-card">
  {/* Badge */}
  {bestseller && (
    <Badge
      pill
      bg="warning"
      className="position-absolute text-dark top-0 start-0 m-2 z-1 px-3 py-1 rounded-pill fs-6"
    >
      Bestseller
    </Badge>
  )}

<Button
  variant="dark"
  className="position-absolute z-2 product-cart-btn"
  style={{
    top: "10px",
    right: "10px",
    padding: "6px 14px",
    fontSize: "0.85rem",
    fontWeight: "500",
    borderRadius: "30px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  }}
  onClick={(e) => {
    console.log("🖱️ Add to Cart clicked");
    handleAddToCart(e);
  }}
  disabled={isAdding}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
   {isAdding ? "Adding..." : "Add to Cart"}
</Button>


  {/* Image */}
  <Link to={id === 7 ? `/product/${id}` : "/underdevelopment"} className="text-decoration-none text-dark">
    <Card.Img
      variant="top"
      src={image}
      className="product-img p-3 rounded-4"
      style={{ height: "240px", objectFit: "contain" }}
    />
  </Link>

  <Card.Body className="d-flex flex-column justify-content-between">
    <div>
      <Link to={id === 7 ? `/product/${id}` : "/underdevelopment"} className="text-decoration-none text-dark">
        <Card.Title className="fs-6 fw-semibold text-wrap mb-1">{title}</Card.Title>
      </Link>

      <div className="text-success small mb-1">
        {rating} ★ <span className="text-muted">({reviews})</span>
      </div>

      <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
        <span className="fw-bold text-dark fs-5">₹{new_price}</span>
        <span className="text-muted text-decoration-line-through">₹{old_price}</span>
        <span className="text-muted small">({offer})</span>
        {discount && (
          <Badge bg="warning" className="text-dark px-2 py-1 rounded-2">
            {discount} OFF
          </Badge>
        )}
      </div>
    </div>


  </Card.Body>
</Card>

  );
}

export default ProductGridCard;
