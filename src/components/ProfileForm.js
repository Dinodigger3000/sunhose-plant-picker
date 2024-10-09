import React from 'react';
import { Form, Button } from 'react-bootstrap';

function ProfileForm({ profile, handleChange, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      {/* Move all form groups here */}
      {/* Example: */}
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
  );
}

export default ProfileForm;