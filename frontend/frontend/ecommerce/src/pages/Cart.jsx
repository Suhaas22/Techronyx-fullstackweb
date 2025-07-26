// /pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import CartItem from "../components/CartItem";
import axios from "../utils/axios"; 
import './Cart.css'; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("cartitems/");
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQtyChange = async (id, newQty) => {
    try {
      const item = cartItems.find((item) => item.id === id);
      const updatedItem = { ...item, quantity: newQty };
      await axios.patch(`cartitems/${id}/`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`cartitems/${id}/`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

 const cartTotal = cartItems.reduce(
  (total, item) => total + item.product.new_price * item.quantity,
  0
);


  return (
    <Container className="my-5">
      <h2 className="mb-4">Your Cart</h2>
      <Row>
        <Col md={8}>
          {loading ? (
            <Spinner animation="border" />
          ) : cartItems.length === 0 ? (
            <h5>Your cart is empty</h5>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            ))
          )}
        </Col>

        <Col md={4}>
          <Card className="p-3">
            <h5>Price Summary</h5>
            <hr />
            <div className="mb-0 mt-0">
              <p>Subtotal: ₹{cartTotal}</p>
              <p>Delivery: <span className="text-success">Free</span></p>
            </div>
            <hr />
            <h5>Total: ₹{cartTotal}</h5>
            <Button className="modern-checkout-btn mt-3 w-100">
  Proceed to Checkout
</Button>

            <Button variant="outline-secondary" className="mt-2 w-100">
              Continue Shopping
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
