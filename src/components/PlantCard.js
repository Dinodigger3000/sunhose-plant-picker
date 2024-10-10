import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

function PlantCard({ plant, onClick }) {
  const [imageUrl, setImageUrl] = React.useState('');

  React.useEffect(() => {
    plant.data.imageUrl.then(url => setImageUrl(url));
  }, [plant.data.imageUrl]);
  return (
    <Card onClick={() => onClick(plant)} style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={imageUrl} alt={plant.data.title} />
      <Card.Body>
        <Card.Title>{plant.data.title}</Card.Title>
        <ProgressBar now={plant.matchPercentage} variant="success" />
        <Card.Text className="percent-match-label">
          {plant.matchPercentage}% Match
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PlantCard;