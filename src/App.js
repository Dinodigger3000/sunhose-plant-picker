import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom CSS for the Bootstrap Components
import "./customBootstrap.css";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
  ProgressBar,
  Modal,
} from "react-bootstrap";

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
        {/* First Column: Forms, Background, and Separators */}
        <Col xs={12} md={4} className="p-0">
          {" "}
          {/* Different column sizes for phone and desktop */}
          <div
            style={{
              backgroundColor: "#DFF7E6",
              padding: "20px",
              height: "100%",
            }}
          >
            <div className="separator"></div>
            <h4 className="title-label">❉ ✽ ❉ SUNHOSE</h4>
            {/* <h4 className="subtitle-label">Plant Picker</h4> */}
            <Form onSubmit={handleSubmit}>
              {/* Light Level */}
              <div className="separator"></div>
              <Form.Group controlId="formLightLevel" className="m-4">
                <Form.Label className="question-label">LIGHT LEVEL</Form.Label>
                <Form.Select
                  name="lightLevel"
                  value={profile.lightLevel}
                  onChange={handleChange}
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                  <option value={4}>Very High</option>
                </Form.Select>
              </Form.Group>

              {/* Pet Ownership */}
              <div className="separator"></div>
              <Form.Group controlId="formHasPet" className="m-4">
                <Form.Label className="question-label">CAT OR DOG?</Form.Label>
                <Form.Check
                  type="switch"
                  label={profile.hasPet ? "Yes" : "No"}
                  name="hasPet"
                  checked={profile.hasPet}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Care Level */}
              <div className="separator"></div>
              <Form.Group controlId="formCareLevel" className="m-4">
                <Form.Label className="question-label">CARE LEVEL</Form.Label>
                <Form.Range
                  min={1}
                  max={3}
                  name="careLevel"
                  value={profile.careLevel}
                  onChange={handleChange}
                  className="custom-slider"
                />
                <div className="d-flex justify-content-between">
                  <span className="small-label">1</span>
                  <span className="small-label">3</span>
                </div>
                <p className="selected-label">{profile.careLevel}</p>
              </Form.Group>

              {/* Budget */}
              <div className="separator"></div>
              <Form.Group controlId="formBudget" className="m-4">
                <Form.Label className="question-label">BUDGET</Form.Label>
                <Form.Range
                  min={0}
                  max={100}
                  name="budget"
                  value={profile.budget}
                  onChange={handleChange}
                  className="custom-slider"
                />
                <div className="d-flex justify-content-between">
                  <span className="small-label">$0</span>
                  <span className="small-label">$100</span>
                </div>
                <p className="selected-label">${profile.budget}</p>
              </Form.Group>

              {/* Max & Min Temp */}
              <div className="separator"></div>
              {/* Max Temp */}
              <Form.Group controlId="formMaxTemp" className="m-4">
                <Form.Label className="question-label">
                  MAXIMUM TEMPERATURE
                </Form.Label>
                <Form.Range
                  min={50}
                  max={100}
                  name="maxTemp"
                  value={profile.maxTemp}
                  onChange={handleChange}
                  className="custom-slider"
                />
                <div className="d-flex justify-content-between">
                  <span className="small-label">50°F</span>
                  <span className="small-label">100°F</span>
                </div>
                {/* <p className="selected-label">{profile.maxTemp}°F</p> */}
              </Form.Group>
              {/* Min Temp */}
              <Form.Group controlId="formMinTemp" className="m-4">
                <Form.Label className="question-label">
                  MINIMUM TEMPERATURE
                </Form.Label>
                <Form.Range
                  min={30}
                  max={70}
                  name="minTemp"
                  value={profile.minTemp}
                  onChange={handleChange}
                  className="custom-slider"
                />
                <div className="d-flex justify-content-between">
                  <span className="small-label">30°F</span>
                  <span className="small-label">70°F</span>
                </div>
                <p className="selected-label">
                  {profile.minTemp}°F - {profile.maxTemp}°F
                </p>
              </Form.Group>

              <div className="separator"></div>

              {/* Save Changes */}
              <div className="text-center">
                <Button
                  variant="success"
                  type="submit"
                  className="m-4 align-center"
                >
                  ✅ SAVE CHANGES
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        {/* Second Column: Grid of Plant Cards */}
        <Col xs={12} md={8} className="p-4">
          <Row style={{ margin: 0 }}>
            {plantData.map((plant) => (
              <Col xs={12} sm={6} lg={3} className="p-1" key={plant.id}>
                <Card
                  onClick={() => handleCardClick(plant)} // Make card clickable
                  style={{ cursor: "pointer" }} // Change cursor to hand
                >
                  <Card.Img
                    variant="top"
                    src={plant.imageUrl}
                    alt={plant.title}
                  />
                  <Card.Body>
                    <Card.Title>{plant.title}</Card.Title>
                    <ProgressBar
                      now={plant.matchPercentage}
                      variant="success"
                    />
                    <Card.Text className="percent-match-label">
                      {plant.matchPercentage}% Match
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* If the Selected Plant isn't null, show Modal (Pop-up) for Plant Details */}
      {selectedPlant && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{selectedPlant.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {/* Column for the image */}
              <Col xs={4}>
                <img
                  src={selectedPlant.imageUrl}
                  alt={selectedPlant.title}
                  className="rounded border"
                  style={{ width: "100%" }}
                />
                <ProgressBar
                  now={selectedPlant.matchPercentage}
                  variant="success"
                  className="mt-3"
                />
                <p className="mt-1">{selectedPlant.matchPercentage}% Match</p>
              </Col>

              {/* Column for Description*/}
              <Col xs={8}>
                <p>{selectedPlant.description}</p>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
}

export default App;
