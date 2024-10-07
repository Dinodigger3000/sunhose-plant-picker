import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

// Custom CSS for the Bootstrap Components
import "./customBootstrap.css";

import { Container, Col, Row, Card, Form, Button } from "react-bootstrap";

function App() {
  // Constant to store user profile data
  const [profile, setProfile] = useState({
    lightLevel: 1,
    hasPet: false,
    careLevel: 1,
    budget: 1,
    maxTemp: 75,
    minTemp: 60,
  });

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
            <h4 className="title-label">Adjust Your Environment</h4>
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

              {/* Maximum Temperature */}
              <div className="separator"></div>

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
                <p className="selected-label">{profile.maxTemp}°F</p>
              </Form.Group>

              {/* Minimum Temperature */}
              <div className="separator"></div>

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
                <p className="selected-label">{profile.minTemp}°F</p>
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
          {" "}
          {/* Different column sizes for phone and desktop */}
          <h4>Plant Grid</h4>
          <Row style={{ margin: 0 }}>
            {Array.from({ length: 20 }).map((_, idx) => (
              <Col
                xs={12}
                sm={6}
                lg={3}
                className="p-1"
                style={{ margin: 0 }}
                key={idx}
              >
                <Card>
                  <Card.Img
                    variant="top"
                    // Placeholder Image that just says plant lol
                    src={`https://via.placeholder.com/150?text=plant`}
                    alt={`Card image ${idx + 1}`}
                  />
                  <Card.Body>
                    <Card.Title>Plant {idx + 1}</Card.Title>
                    <Card.Text>
                      This is a brief description of plant {idx + 1}.
                    </Card.Text>
                    <Button variant="success">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
