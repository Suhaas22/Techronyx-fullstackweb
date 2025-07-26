import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import './productcard.css';

function ProductCard({ image, title, oldPrice, newPrice, rating, reviews, features }) {
  return (
    <Link to="/product/1/" className="text-decoration-none"><Card className="cards" style={{borderRadius : '1.5rem',}}>
  <div className="img-wrapper">
    <Card.Img src={image} className="prod-img" />
  </div>

  <div className="card-content-wrapper d-flex flex-column justify-content-between flex-grow-1">
    <div className="d-flex align-items-center ms-3 mb-1 mt-2">
      <span className="text-warning fw-bold me-1">{rating}</span>
      <small className="text-muted">({reviews})</small>
    </div>

    <Card.Title className="prod-title ms-3">{title}</Card.Title>

    <div className="ms-3 mb-1">
      <span className="card-old-price me-2">{oldPrice}</span>
      <span className="card-price">{newPrice}</span>
    </div>

    <small className="card-features ms-3 mb-2 d-block">{features}</small>
  </div>
</Card>

    </Link>
  );
}

export default ProductCard;
