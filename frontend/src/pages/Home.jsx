import "./Home.css"; 
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "../utils/axios";
import { Button, Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import ProductCard from "../components/productcard";
import sectphone from "../assets/section/categorymobile_PhotoGrid.png";
import sectlaptop from "../assets/section/sectionlaptop.jpeg";
import sectheadphones from "../assets/section/sectionheadphones.jpeg";
import sectwatch from "../assets/section/sectionsmartwatch.jpeg";
import sectkeyboard from "../assets/section/sectionkeyboard.jpeg";
import laptop from "../assets/bestsellers/laptop3.jpeg";
import headphones from "../assets/bestsellers/headphones.jpg";
import smrtwatch from "../assets/bestsellers/watch.jpeg";
import apple from "../assets/dealers/applelogo.jpeg";
import realme from "../assets/dealers/realmelogo.jpeg";
import boat from "../assets/dealers/boatlogo.jpeg";
import noise from "../assets/dealers/noiselogo.jpeg";
import sony from "../assets/dealers/sonylogo.jpeg";
import TestimonialCard from "./Testimonials";
import avatar from "../assets/testimonialuser.png";
import { Row, Col } from "react-bootstrap";
import carouselimage1 from "../assets/carousel/carousel1_PhotoGrid.png";
import carouselimage2 from "../assets/carousel/carousel2_PhotoGrid.png";
import boatbuds from '../assets/boatairdopes.jpeg';
import realmebuds from '../assets/realmeearbuds.jpeg';
import boultmain from '../assets/boultmain.png';
import "../components/productcard.css";
import AOS from 'aos';
import 'aos/dist/aos.css';



function Home() {

  useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);

  return (
    <>
      {/* Carousel */}
      <div className="backgroundgradient">
      <div
        className="mx-4"
        style={{
          borderRadius: "30px",
         marginTop: "10px",
          overflow: "hidden",
          marginRight : '30px',
          marginBottom: "40px", 
        }}
      >
<Carousel
 className = "carousel"
  controls={true}
  indicators={false}
  interval={6000}
  style={{ height: "calc(100vh - 100px)", }}
>

    <Carousel.Item>
    <div
      className="carousel-slide-with-btn"
      style={{
        backgroundImage: `url(${carouselimage1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 100px)",
        position: "relative",
      }}
    >
      <button variant="none" className="carousel-btn1">Shop Now</button>
    </div>
  </Carousel.Item>
  {/* Slide 1 */}
  <Carousel.Item>
    <div
      className="carousel-slide-with-btn"
      style={{
        backgroundImage: `url(${carouselimage2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 100px)",
        position: "relative",
      }}
    >
      <button className="carousel-btn2">Shop Now</button>
    </div>
  </Carousel.Item>

  {/* Slide 2 */}

</Carousel>

      </div>
      </div>
      {/* categories */}

      <div className="container my-5"  data-aos="fade-right">
        <h4 className="section-heading mb-4">Shop by Category</h4>

        <div className="category-scroll-container">
          <div className="category-card" data-aos="zoom-in" data-aos-delay="100">
            <img src={sectlaptop} className="img-fluid rounded" alt="Laptops" />
            <div className="overlay-text">
              <small>SHOP</small>
              <h5>Laptops</h5>
            </div>
          </div>


<Link to="/products" className="text-decoration-none">
  <div className="category-card" data-aos="zoom-in" data-aos-delay="100">
    <img
      src={sectheadphones}
      className="img-fluid rounded"
      alt="Headphones"
    />
    <div className="overlay-text">
      <small>SHOP</small>
      <h5>AudioGear</h5>
    </div>
  </div>
</Link>


          <div className="category-card" data-aos="zoom-in" data-aos-delay="100">
            <img
              src={sectphone}
              className="img-fluid rounded"
              alt="Smartwatches"
            />
            <div className="overlay-text">
              <small>SHOP</small>
              <h5>Smartphones</h5>
            </div>
          </div>

          <div className="category-card" data-aos="zoom-in" data-aos-delay="100">
            <img
              src={sectwatch}
              className="img-fluid rounded"
              alt="Smartwatches"
            />
            <div className="overlay-text">
              <small>SHOP</small>
              <h5>Smartwatches</h5>
            </div>
          </div>

          <div className="category-card" data-aos="zoom-in" data-aos-delay="100">
            <img
              src={sectkeyboard}
              className="img-fluid rounded"
              alt="Accessories"
            />
            <div className="overlay-text">
              <small>SHOP</small>
              <h5>Accessories</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Best Sellers */}

      <div className="container my-5" data-aos="fade-left">
        <h2 className="section-heading mb-4">Best Sellers</h2>

        <div className="product-scroll-row">
          <ProductCard
            image={laptop}
            title="Apple MacBook Air Laptop: Apple M1 chip"
            oldPrice="₹74,900"
            newPrice="₹64,990"
            rating="★★★★☆"
            reviews="4.3k"
            features="8GB RAM, 256GB SSD Storage..."
          />



          <ProductCard
            image={boultmain}
            title="Boult X Mustang Bluetooth Headphones"
            oldPrice="₹4,999"
            newPrice="₹2,799"
            rating="★★★★☆"
            reviews="94"
            features='70H Playtime | 40mm Bass drivers'
          />

          <ProductCard
            image={boatbuds}
            title="boAt Airdopes 141 Bluetooth Earbuds"
            oldPrice="₹2,999"
            newPrice="₹1,299"
            rating="★★★★☆"
            reviews="94"
            features='50H battery | Real Spatial Audio'
          />

          <ProductCard
            image={smrtwatch}
            title="NoiseFit Quad Call Smartwatch"
            oldPrice="₹3,999"
            newPrice="₹1,999"
            rating="★★★★☆"
            reviews="94"
            features='1.39" HD Display | Metal Build'
          />


                    <ProductCard
            image={headphones}
            title="Srhythm NC25 Wireless Headphones"
            oldPrice="₹6,999"
            newPrice="₹4,499"
            rating="★★★★☆"
            reviews="239"
            features="Adaptive ANC | 80H Playtime"
          />
        </div>
      </div>

      {/* featured brands */}

      <div className="container my-5" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500">
        <h2 className="section-heading text-center mb-4">Featured Brands</h2>
        <Row className="justify-content-center gx-4 gy-4">
          {[apple, sony, noise, boat, realme].map((brand, idx) => (
            <Col
              xs={6}
              md={2}
              className="d-flex justify-content-center"
              key={idx}
               data-aos="zoom-in" data-aos-delay={idx * 100}
            >
              <div className="brand-logo-wrapper">
                <img
                  src={brand}
                  className="brand-logo"
                  alt={`Brand ${idx + 1}`}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* testimonial section */}

      <div className="container"  data-aos="fade-up">
        <Row className="my-5 px-4 justify-content-center">
          <h2 className="section-heading text-center mb-4">What Our Customers Say</h2>

          <Col md={4} className="mb-4" data-aos="flip-left"      data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
            <TestimonialCard
              name="Ravi Teja"
              role="Verified Buyer"
              quote="“I’ve been ordering from TechNest for over six months now, 
      and every time I’m amazed by the attention to detail. The packaging is neat,
       products are exactly as described, and the delivery is surprisingly quick even in remote areas.
        As someone who’s super particular about design, I love how clean and intuitive the website feels too. 
        Keep up the great work. I’m already planning my next purchase!”"
              avatar={avatar}
              rating={4}
            />
          </Col>
          <Col md={4} className="mb-4" data-aos="flip-down"      data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
            <TestimonialCard
              name="Anjali Sharma"
              role="Software Engineer"
              quote="“Finding quality tech at affordable prices in India used to be a challenge, 
              but TechNest has changed that for me completely. I recently purchased wireless headphones and a monitor 
              both arrived in perfect condition with original packaging and manuals. 
              What stood out most was they followed up even after delivery to ensure I was satisfied. 
              That kind of service is rare!”"
              avatar={avatar}
              rating={5}
            />
          </Col>
          <Col md={4} className="mb-4" data-aos="flip-right"      data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
            <TestimonialCard
              name="Karthik R"
              role="Gadget Reviewer"
              quote="“I came across TechNest through a friend’s recommendation and was skeptical at first. 
      But after ordering a smartwatch and a set of earbuds, I’ve become a loyal customer. 
      Their curated product range is genuinely useful, and you don’t have to scroll endlessly to find what you need. 
      Even returns and exchanges were handled smoothly without any hassle.”"
              avatar={avatar}
              rating={4.5}
            />
          </Col>
        </Row>
      </div>

      <div className="newsletter-section text-center text-white py-5 px-3">
        <h2 className="fw-bold mb-3">Stay Updated!</h2>
        <p className="mb-4">
          Subscribe to our newsletter and never miss out on the latest tech
          trends and exclusive deals.
        </p>
        <form className="newsletter-form d-flex justify-content-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="form-control me-2 rounded-pill px-4 py-2"
            style={{ maxWidth: "400px" }}
          />
          <button
            type="submit"
            className="btn btn-light px-4 rounded-pill fw-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
}

export default Home;
