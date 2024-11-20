import React, { useState, useMemo, useEffect } from "react";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/customBootstrap.css";
import "./styles/fonts.css";

import { Container, Col, Row } from "react-bootstrap";
import ProfileForm from "./components/MVPcomponents/ProfileForm";
import PlantGrid from "./components/MVPcomponents/PlantGrid";
import PlantModal from "./components/MVPcomponents/PlantModal";

import { collection, getDocs } from "firebase/firestore";
import { db, store } from "./firebase";
import { fetchPlantData, updatePlantMatches } from "./plantData";

import { setTheme } from "./components/ColorTheme";

import Viewport from "./components/Viewport";
import ProfileBuilder from "./components/ProfileBuilder";
import AdaptiveScene from "./components/AdaptiveScene";

function App() {
  const [savedProfile, setSavedProfile] = useState({
    lightLevel: 3,
    petSafe: false,
    careLevel: 1,
    budget: 0,
    maxTemp: 80,
    minTemp: 65,
    priorities: ["light", "care", "budget", "pets", "temp"],
  });
  const [currentPage, setCurrentPage] = useState(0); // 0 = profile builder, 1 = results page, 2 = plant grid
  const [query, setQuery] = useState(collection(db, "plants"));
  const [plantData, setPlantData] = useState();
  const [plantScores, setPlantScores] = useState(null);

  useEffect(() => { // fetch plant data
    fetchPlantData(query, setPlantData);
  }, [query]);

  useEffect(()=> {
    updatePlantMatches(savedProfile, plantData, setPlantScores);
  }, [savedProfile, plantData]);

  const changePage = (page) => {
    setCurrentPage(page);
  };
  
  return (
    <div>
      {currentPage === 0 && <ProfileBuilder onProfileUpdate={setSavedProfile} />} {/* profile builder */}
      {currentPage === 1 && <>Results TBA</>} {/* results page */}
      {currentPage === 2 && <PlantGrid plantScores={plantScores} />} {/* plant grid */}
    </div>
  );
}

export default App;
