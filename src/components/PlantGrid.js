import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PlantCard from './PlantCard';

function PlantGrid({ plantData, handleCardClick }) {
  return (
    <Row style={{ margin: 0 }}>
      {plantData.map((plant) => (
        <Col xs={12} sm={6} lg={3} className="p-1" key={plant.id}>
          <PlantCard plant={plant} onClick={handleCardClick} />
        </Col>
      ))}
    </Row>
  );
}

export default PlantGrid;