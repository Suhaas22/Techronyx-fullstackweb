import React from 'react';
import Card from 'react-bootstrap/Card';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './Testimonials.css'; 

function TestimonialCard({ name, role, quote, avatar, rating }) {

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} />);
  }
  if (halfStar) {
    stars.push(<FaStarHalfAlt key="half-star" />);
  }
  return stars;
};




  return (
    <Card className="testimonial-card p-4 text-center shadow-sm" style={{borderRadius : '1.5rem'}}>
      <div className="testimonial-avatar-wrapper mx-auto mb-3">
        <img src={avatar} className="testimonial-avatar" alt={name} />
      </div>
      <Card.Body>
        <Card.Title className="fw-bold">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text className="fst-italic text-dark">“{quote}”</Card.Text>
        <div className="testimonial-rating text-warning">
  {renderStars(rating)}
</div>

      </Card.Body>
    </Card>
  );
}

export default TestimonialCard;
