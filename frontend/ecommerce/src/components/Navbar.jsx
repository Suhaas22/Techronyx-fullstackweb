import { useState, useEffect } from "react";
import navlogo from "../assets/techronyxwhitelogonobg.png";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Dropdown,
} from "react-bootstrap";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <BootstrapNavbar
      expand="lg"
      variant="dark"
      className={`glass-navbar py-3 fixed-top ${
        isScrolled ? "navbar-scrolled" : "navbar-transparent"
      }`}
    >
      <Container fluid>
        <BootstrapNavbar.Brand
          href="/"
          className="fw-bold text-light fs-4 py-0 ms-5 mt-1"
        >
          <img
            src={navlogo}
            alt="TechNest Logo"
            style={{
              maxHeight: "35px",
              height: "100%",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="BootstrapNavbar-nav" />
        <BootstrapNavbar.Collapse id="BootstrapNavbar-nav">
          <Nav className="mx-auto text-center">
            <Nav.Link href="/" className="px-3 text-light fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="/products" className="px-3 text-light fw-semibold">
              Wireless Audio
            </Nav.Link>
            <Nav.Link
              href="/UnderDevelopment"
              className="px-3 text-light fw-semibold"
            >
              Smartwatches
            </Nav.Link>
            <Nav.Link href="/UnderDevelopment" className="px-3 text-light fw-semibold">
              Accessories
            </Nav.Link>
            <Nav.Link href="/UnderDevelopment" className="px-3 text-light fw-semibold">
              SmartPhones
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto d-flex flex-row align-items-center gap-3 pe-3">
            {/* Search with Hover */}
            <div
              className="search-container"
              onMouseEnter={() => setShowSearch(true)}
              onMouseLeave={() => setShowSearch(false)}
            >
              <input
                type="text"
                placeholder="Search..."
                className={`search-input ${showSearch ? "visible" : ""}`}
              />
              <FaSearch size={19} className="search-icon" />
            </div>

            {/* Cart Icon */}
            <Nav.Link href="/cart" className="text-light">
              <FaShoppingCart size={19} />
            </Nav.Link>

            {/* Auth Section */}
            {!isLoggedIn ? (
              <>
                <Nav.Link href="/login" className="px-3 text-light fw-semibold">
                  Login
                </Nav.Link>
              </>
            ) : (
              <Dropdown
                show={showDropdown}
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                align="end"
              >
                <Dropdown.Toggle
                  as="span"
                  className="text-light"
                  style={{ cursor: "pointer" }}
                  id="dropdown-user"
                >
                  <FaUser size={19} className="dropdown" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                  <Dropdown.Item href="/orders">My Orders</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
