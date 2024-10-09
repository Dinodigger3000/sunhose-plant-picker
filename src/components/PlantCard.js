import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

function PlantCard({ plant, onClick }) {
  return (
    <Card onClick={() => onClick(plant)} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={plant.imageUrl} alt={plant.title} />
      <Card.Body>
        <Card.Title>{plant.title}</Card.Title>
        <ProgressBar now={plant.matchPercentage} variant="success" />
        <Card.Text className="percent-match-label">
          {plant.matchPercentage}% Match
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PlantCard;