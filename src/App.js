import React, { useState, useMemo, useEffect } from "react";

import "./styles/App.css";
import "./styles/fonts.css";

import PlantGrid from "./components/PlantResultComponents/PlantGrid";

import { collection, getDocs } from "firebase/firestore";
import { db, store } from "./firebase";
import { fetchPlantData, updatePlantMatches } from "./plantData";

import ProfileBuilder from "./components/ProfileBuilder";
import Results from "./components/Results";

function App() {
  const defaultProfile = {
    lightLevel: 4,
    petSafe: false,
    careLevel: 1,
    budget: 3,
    maxTemp: 80,
    minTemp: 65,
    priorities: ["light", "care", "budget", "pets", "temp"],
  };

  const [savedProfile, setSavedProfile] = useState(defaultProfile);
  const [currentPage, setCurrentPage] = useState(0); // 0 = profile builder, 1 = results page, 2 = plant grid
  const [query, setQuery] = useState(collection(db, "plants"));
  const [plantData, setPlantData] = useState();
  const [plantScores, setPlantScores] = useState(null);

  const [builderPage, setBuilderPage] = useState(0);
  const [resultsPage, setResultsPage] = useState(0);
  const [petSafePage, setPetSafePage] = useState(0);

  const [reviewPage, setReviewPage] = useState(0);

  useEffect(() => {
    // fetch plant data
    fetchPlantData(query, setPlantData);
  }, [query]);

  useEffect(() => {
    updatePlantMatches(savedProfile, plantData, setPlantScores);
  }, [savedProfile, plantData]);

  const changePage = (page, builderPage) => {
    setCurrentPage(page);
    if (builderPage !== undefined && page === 0) {
      // If we're going to ProfileBuilder and a specific page is requested
      setBuilderPage(builderPage);
    }
  };

  const resetProfile = () => {
    setSavedProfile(defaultProfile);
    setCurrentPage(0);
    setBuilderPage(0);
    setPetSafePage(0);
    setResultsPage(0);
    setReviewPage(0);
  };

  return (
    <div>
      {currentPage === 0 && (
        <ProfileBuilder
          onProfileUpdate={setSavedProfile}
          changePage={changePage}
          initialPage={builderPage}
          initialProfile={savedProfile}
          petSafePage={petSafePage}
          setPetSafePage={setPetSafePage}
          reviewPage={reviewPage}
          setReviewPage={setReviewPage}
        />
      )}{" "}
      {/* profile builder */}
      {currentPage === 1 && (
        <Results
          plantScores={plantScores}
          changePage={changePage}
          resetProfile={resetProfile}
          resultsPage={resultsPage}
          setResultsPage={setResultsPage}
        />
      )}{" "}
      {/* results page */}
      {currentPage === 2 && (
        <PlantGrid
          plantScores={plantScores}
          changePage={changePage}
          resetProfile={resetProfile}
        />
      )}{" "}
      {/* plant grid */}
    </div>
  );
}

export default App;
