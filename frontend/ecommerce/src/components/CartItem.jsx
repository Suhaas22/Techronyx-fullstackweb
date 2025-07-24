import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import './Cartitem.css';

const CartItem = ({ item, onRemove, onQtyChange }) => {
  const product = item.product;

  if (!product) return null;

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    onQtyChange(item.id, newQty);
  };

  const rating = product.rating || 4.5;

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="d-flex align-items-center text-warning mb-1">
        {[...Array(fullStars)].map((_, i) => (
          <BsStarFill key={`full-${i}`} />
        ))}
        {hasHalfStar && <BsStarHalf />}
        {[...Array(emptyStars)].map((_, i) => (
          <BsStar key={`empty-${i}`} />
        ))}
        <small className="ms-2 text-muted">({rating})</small>
      </div>
    );
  };

  return (
    <Card className="mb-4 shadow-sm rounded-4 cart-item-card">
      <Card.Body className="d-flex flex-column flex-md-row align-items-center justify-content-between p-4 position-relative">
        {/* Left: Product Image & Info */}
        <div className="d-flex align-items-center text-start">
          <img
            src={product.image || "https://via.placeholder.com/100"}
            alt={product.title}
            className="img-fluid rounded-3 border"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginRight: "1.5rem",
            }}
          />
          <div>
            <h5 className="fw-semibold mb-1">{product.title}</h5>
            {renderRatingStars(rating)}
            <div className="mb-1">
              <span className="fw-bold fs-5 text-primary">₹{product.new_price}</span>
              <span
                className="ms-2 text-muted"
                style={{ textDecoration: "line-through", fontSize: "0.9rem" }}
              >
                ₹{product.old_price}
              </span>
            </div>
            <p className="text-success small mb-0">
              You save ₹{product.old_price - product.new_price}
            </p>
          </div>
        </div>

        {/* Right: Quantity + Remove */}
        <div className="d-flex flex-column align-items-center mt-3 mt-md-0">
          <Form.Select
            value={item.quantity}
            onChange={handleQtyChange}
            className="mb-3 rounded-3 px-3 py-2"
            style={{ minWidth: "100px" }}
          >
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                Qty: {x + 1}
              </option>
            ))}
          </Form.Select>

          <div className="delete-icon" onClick={() => onRemove(item.id)}>
  <RiDeleteBin5Line />
</div>

        </div>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
