import React, { useEffect, useRef, useState } from "react";
import { getPlant, getAllPlants, getPlantImageURL } from "../../plantData";

/**
 * Component to display the description of a plant.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.id - The ID of the plant.
 * @returns {JSX.Element} The JSX element representing the plant description.
 *
 * @example
 * <PlantDesc id="snake_plant" />
 *
 * @component
 */
export function PlantDesc(props) {
  const { id } = props;
  const [plantData, setPlantData] = useState({});

  useEffect(() => {
    async function fetchPlantData() {
      const data = await getPlant(id);
      setPlantData(data);
    }
    fetchPlantData();
  }, [id]);
  const [url, setUrl] = useState("");
  useEffect(() => {
    async function fetchUrl() {
      const data = await getPlantImageURL(id);
      setUrl(data);
    }
    fetchUrl();
  }, [id]);

  return (
    <div style={{ borderRadius: "10px", background: "#86e5ff" }}>
      <p>The name of the plant is: {id}.</p>
      <p>
        {plantData.light_level} light is needed and it{" "}
        {plantData.pet_safe ? "is" : "is not"} safe for pets. It costs $
        {plantData.avg_cost}. the photo url is {url}
      </p>
      <img src={url} alt="plant" style={{ maxHeight: "10vh" }} />
    </div>
  );
}

/**
 * Component to render a list of plants.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.plants - An array of plant objects.
 * @returns {JSX.Element} A JSX element containing a list of PlantDesc components.
 */
export function PlantView(props) {
  const { plants } = props;

  return (
    <>
      {plants.map((plant) => (
        <PlantDesc key={plant.id} id={plant.id} />
      ))}
    </>
  );
}

export default PlantView;
