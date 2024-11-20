import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import PlantCard from './PlantCard';
import PlantModal from './PlantModal';

function PlantGrid({ plantScores }) {

  const [scores, setPlantScores] = React.useState(plantScores);
  useEffect(() => {
    async function getPlantScores() {
      const plantProfiles = (await plantScores);
      setPlantScores(plantProfiles);
    }

    getPlantScores();
    console.log(scores);
  }, [plantScores]);

  // Modal controls

  // Modal States
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to handle plant card click and show modal
  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlant(null);
  };
  return (
    <>
      {plantScores && // render only if plantScores is not null
        <Row style={{ margin: 0 }}>
          {scores.map((plant) => (
            <Col xs={12} sm={6} lg={3} className="p-1" key={plant.id}>
              <PlantCard plant={plant} onClick={handleCardClick} />
            </Col>
          ))}
        </Row>
      }
      <PlantModal
        plant={selectedPlant}
        show={showModal}
        onHide={handleCloseModal}
      />
    </>
  );
}

export default PlantGrid;