import React, { useState, useMemo, useEffect } from "react";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import "./styles/fonts.css";

import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from "./components/MVPcomponents/ProfileForm";
import PlantGrid from "./components/MVPcomponents/PlantGrid";
import PlantModal from "./components/MVPcomponents/PlantModal";

//import { getPlantMatches, getPlantProfiles, defaultQuery } from "./plantData";
import { collection, getDocs } from "firebase/firestore";
import { db, store } from "./firebase";
import { fetchPlantData, updatePlantMatches } from "./plantData";
import Viewport from "./components/Viewport";
import ProfileBuilder from "./components/ProfileBuilder";

function App() {
  const [query, setQuery] = useState(collection(db, "plants")); // we can use setquery later on to make the search more scalable
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
    <div className="App">
      <Viewport profile={profile} />
      <ProfileBuilder
        profile={profile}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
