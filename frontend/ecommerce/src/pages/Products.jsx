import React, { useEffect, useState } from "react";
import ProductGridCard from "../components/ProductGridCard";
import { Container, Row, Col, Dropdown, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import { IoPricetag } from "react-icons/io5";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((res) => {
        setProducts(res.data);
        setSortedProducts(res.data); // Default to unsorted initially
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSort = (option) => {
    setSortOption(option);

    let sorted = [...products];

    if (option === "lowToHigh") {
      sorted.sort((a, b) => a.new_price - b.new_price);
    } else if (option === "highToLow") {
      sorted.sort((a, b) => b.new_price - a.new_price);
    }

    setSortedProducts(sorted);
  };

  return (
    <Container className="my-5">
      <h2 className="text-white mb-4">Results for "Headphones"</h2>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {["Categories", "Brand", "Price", "Device Type", "Delivery Mode", "All Filters"].map((label) => (
          <Dropdown as={ButtonGroup} key={label}>
            <Dropdown.Toggle variant="secondary" className="rounded-pill">
              {label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Option 1</Dropdown.Item>
              <Dropdown.Item>Option 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ))}

        <Dropdown className="ms-auto">
          <Dropdown.Toggle variant="dark">
            Sort By:{" "}
            {sortOption === "featured"
              ? "Featured"
              : sortOption === "lowToHigh"
              ? "Price(Lowest First)"
              : "Price(Highest First)"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSort("featured")}>
              Featured
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort("lowToHigh")}>
             <IoPricetag /> Price(Lowest First)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort("highToLow")}>
             <IoPricetag /> Price(Highest First)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Product Grid */}
      <Row className="g-4">
        {sortedProducts.map((prod) => (
          <Col key={prod.id} xs={12} sm={6} md={4} lg={4}>
            <ProductGridCard {...prod} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
