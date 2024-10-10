import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PlantCard from './PlantCard';

function PlantGrid({ plantScores, handleCardClick }) {
  
  const [scores, setPlantScores] = React.useState(plantScores);
  useEffect(() => {
    async function getPlantScores() {
      const plantProfiles = (await plantScores);
    setPlantScores(plantProfiles);
    }
    
    getPlantScores();
    console.log(scores);
  }, [plantScores]);
  if (!scores) {
    return null;
  }

  return (
    <Row style={{ margin: 0 }}>
      {scores.map((plant) => (
        <Col xs={12} sm={6} lg={3} className="p-1" key={plant.id}>
          <PlantCard plant={plant} onClick={handleCardClick} />
        </Col>
      ))}
    </Row>
  );
}

export default PlantGrid;