import React, { useState, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from "./components/ProfileForm";
import PlantGrid from "./components/PlantGrid";
import PlantModal from "./components/PlantModal";
//import { getPlantMatches, getPlantProfiles, defaultQuery } from "./plantData";
import { collection, getDocs } from "firebase/firestore";
import { db, store } from './firebase';
import { fetchPlantData, updatePlantMatches } from "./plantData";
function App() {
  const [query, setQuery] = useState(collection(db, 'plants')); // we can use setquery later on to make the search more scalable
  // The current profile in progress
  const [profile, setProfile] = useState({
    lightLevel: 1,
    hasPet: false,
    careLevel: 1,
    budget: 0,
    maxTemp: 50,
    minTemp: 30,
    priorities: ["light", "care", "budget", "pets", "temp"],
  });
  
  // Profile created on save changes used for plant matching
  const [savedProfile, setSavedProfile] = useState({ ...profile });

  const [plantData, setPlantData] = useState();

  useEffect(() => {
    fetchPlantData(query, setPlantData);
  }, [query]);

  // Generate Plant Data considering the savedProfile
  // This should only recalculate when savedProfile changes
  const [plantScores, setPlantScores] = useState(null);
  useEffect(() => {
    updatePlantMatches(savedProfile, plantData, setPlantScores);
  }, [savedProfile, plantData]);

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
          <PlantGrid plantScores={plantScores} handleCardClick={handleCardClick} />
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
