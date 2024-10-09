import React, { useState, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from "./components/ProfileForm";
import PlantGrid from "./components/PlantGrid";
import PlantModal from "./components/PlantModal";

function App() {
  // The current profile in progress
  const [profile, setProfile] = useState({
    lightLevel: 1,
    hasPet: false,
    careLevel: 1,
    budget: 0,
    maxTemp: 50,
    minTemp: 30,
  });

  // Array of plant image URLs
  const plantImages = [
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Snake-Hahnii_Small_Hyde_Cream_Variant.jpg?v=1725982079&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Large-Dracaena-Mass-Cane_Large_Mexia_Cream_Variant.jpg?v=1727274636&width=1100",
    "https://www.thesill.com/cdn/shop/products/the-sill_stromanthe-triostar_medium_growpot_all.jpg?v=1725897825&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Senizo-Mount-Everest-Stick-Succulent_Gayle_Pot_Quinn_Gray_White_Quinn_Variant_94dd458c-4ecc-4617-9e36-8932337ba78f.jpg?v=1727714290&width=1100",
    "https://www.thesill.com/cdn/shop/files/the-sill_Small-Extra-Tall-Red-Guzmania-Bromeliad-Quinn-White_Variant.jpg?v=1727710475&width=1100",
  ];

  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * plantImages.length);
    return plantImages[randomIndex];
  };

  // Function to calculate match percentage for a plant
  const calculateMatch = (plant) => {
    // TODO: Add formula for matching plants to profile

    // this is a placeholder for now
    return Math.floor(Math.random() * 100);
  };

  // Profile created on save changes used for plant matching
  const [savedProfile, setSavedProfile] = useState({ ...profile });

  // Function to handle changes in the profile form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to handle form submission and update saved profile
  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedProfile({ ...profile });
    console.log("Profile saved:", profile);
  };

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

  // Generate Plant Data considering the savedProfile
  // This should only recalculate when savedProfile changes
  const plantData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, idx) => ({
      // TODO: Change this to actual plant data from database

      id: idx + 1,
      title: `Plant ${idx + 1}`,
      imageUrl: getRandomImage(),
      description: `Very detailed description of Plant ${idx + 1}`,
      matchPercentage: calculateMatch(),
    }));
  }, [savedProfile]);

  return (
    <Container fluid>
      <Row>
        {/* Profile Form Column */}
        <Col xs={12} md={4} className="p-0">
          <div
            style={{
              backgroundColor: "#DFF7E6",
              padding: "20px",
              height: "100%",
            }}
          >
            <div className="separator"></div>
            <h4 className="title-label">❉ ✽ ❉ SUNHOSE</h4>
            <ProfileForm
              profile={profile}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </Col>
        {/* Plant Grid Column */}
        <Col xs={12} md={8} className="p-4">
          <PlantGrid plantData={plantData} handleCardClick={handleCardClick} />
        </Col>
      </Row>
      {/* Plant Modal */}
      <PlantModal
        plant={selectedPlant}
        show={showModal}
        onHide={handleCloseModal}
      />
    </Container>
  );
}

export default App;
