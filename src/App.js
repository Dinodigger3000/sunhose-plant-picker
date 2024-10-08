import React, { useState, useEffect } from "react";
import { PlantDesc, PlantView } from "./components/PlantView";
import { getAllPlants } from "./plantData";

function App() {


  const [plants, setPlants] = useState([]);
  useEffect(() => { // gets all plants from the database and sets the state of the plants variable to the array of plants.
    const fetchPlants = async () => {
      const plantsCollection = await getAllPlants(); // replace this with the query function once it is ready.
      setPlants(plantsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPlants();
  }, []);

  return (
    <>
      <PlantView plants={plants} />
    </>
  );
}

export default App;
