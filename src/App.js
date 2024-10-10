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
import { getPlantImageURL, calculateMatch } from "./plantData";
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
  
  // Profile created on save changes used for plant matching
  const [savedProfile, setSavedProfile] = useState({ ...profile });

  const [plantData, setPlantData] = useState({});
  const getPlantData = async () => {
    const plants = await getDocs(collection(db, 'plants'));
      const plantProfiles = plants.docs.map((plant) => {
        console.log('plant ' + plant.data());
        const title = plant.id.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        const url = getPlantImageURL(plant.id);
        return {
          id: plant.id,
          title: title,
          imageUrl: url,
          //description: plant.data().description, // add descriptions to the database maybe, this field will be blank for now.
          description: `Very detailed description of Plant ${plant.id}`,
          //matchPercentage: calculateMatch(plant.data()), //can't call this method before initialization.
          data: plant.data(), // save the raw database values in case we need them later
        };
      });
      return plantProfiles;
  };

  useEffect(() => {
    async function fetchPlantData() {
      const plants = await getDocs(collection(db, 'plants'));
      const plantProfiles = plants.docs.map((plant) => {
        const title = plant.id.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        const url = getPlantImageURL(plant.id);
        return {
          id: plant.id,
          title: title,
          imageUrl: url,
          //description: plant.data().description, // add descriptions to the database maybe, this field will be blank for now.
          description: `Very detailed description of Plant ${plant.id}`,
          //matchPercentage: calculateMatch(plant.data()), //can't call this method before initialization.
          data: plant.data(), // save the raw database values in case we need them later
        };
      });
      console.log("Plant Data fetched:", plantProfiles);
      setPlantData(plantProfiles);
    }
    fetchPlantData();
  }, []);

  // Generate Plant Data considering the savedProfile
  // This should only recalculate when savedProfile changes
  const [plantScores, setPlantScores] = useState(null);
  useEffect(() => {
    async function getPlantScores() {
      const plantProfiles = await getPlantData();
      if (!plantProfiles) {
        return null;
      }
      return plantProfiles.map((plant) => {
        return {
            id: plant.id,
            data: plant,
            matchPercentage: calculateMatch(plant, savedProfile),
        };
    });
    
    }
    console.log("Profile changed:", getPlantScores());
    
    setPlantScores(getPlantScores());
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
