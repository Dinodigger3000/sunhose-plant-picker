import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from './components/ProfileForm';
import PlantGrid from './components/PlantGrid';
import PlantModal from './components/PlantModal';

function App() {
  // Constant to store user profile data
  const [profile, setProfile] = useState({
    lightLevel: 1,
    hasPet: false,
    careLevel: 1,
    budget: 0,
    maxTemp: 50,
    minTemp: 30,
  });

  // State for modal control
  const [selectedPlant, setSelectedPlant] = useState(null); // Tracks selected plant for modal
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  // Function to handle card click and show modal
  const handleCardClick = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true); // Show the modal
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlant(null); // Clear the selected plant
  };

  // Handle Changes in the Form (Rewrite profile with new answers after save)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    // to make sure the profile doesn't reset apon save profile
    e.preventDefault();

    //placeholder for what we will do once we have the fomula
    console.log("Profile saved:", profile);
  };

  // State to store the plant match percentages
  const [plantMatches, setPlantMatches] = useState([]);

  // Placeholder function to calculate percentage match for each plant
  const calculateMatch = (plantIdx) => {
    //put in formula to calculate percent match ! !
    // right now it just returns a random percentage

    return Math.floor(Math.random() * 100);
  };

  const plantImages = [
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Snake-Hahnii_Small_Hyde_Cream_Variant.jpg?v=1725982079&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Large-Dracaena-Mass-Cane_Large_Mexia_Cream_Variant.jpg?v=1727274636&width=1100",
    "https://www.thesill.com/cdn/shop/products/the-sill_stromanthe-triostar_medium_growpot_all.jpg?v=1725897825&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Senizo-Mount-Everest-Stick-Succulent_Gayle_Pot_Quinn_Gray_White_Quinn_Variant_94dd458c-4ecc-4617-9e36-8932337ba78f.jpg?v=1727714290&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Extra-Tall-Red-Guzmania-Bromeliad-Quinn-White_Variant.jpg?v=1727710475&width=1100",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * plantImages.length);
    return plantImages[randomIndex];
  };

  // Mock plant data for illustration purposes
  const plantData = Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    title: `Plant ${idx + 1}`,
    imageUrl: getRandomImage(),
    description: `Very detailed description of Plant ${idx + 1}`,
    matchPercentage: calculateMatch(idx),
  }));

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={4} className="p-0">
          <div style={{ backgroundColor: "#DFF7E6", padding: "20px", height: "100%" }}>
            <div className="separator"></div>
            <h4 className="title-label">❉ ✽ ❉ SUNHOSE</h4>
            <ProfileForm 
              profile={profile} 
              handleChange={handleChange} 
              handleSubmit={handleSubmit} 
            />
          </div>
        </Col>
        <Col xs={12} md={8} className="p-4">
          <PlantGrid plantData={plantData} handleCardClick={handleCardClick} />
        </Col>
      </Row>
      <PlantModal 
        plant={selectedPlant} 
        show={showModal} 
        onHide={handleCloseModal} 
      />
    </Container>
  );
}

export default App;