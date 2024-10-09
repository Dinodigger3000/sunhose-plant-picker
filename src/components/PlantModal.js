import React from 'react';
import { Modal, Row, Col, ProgressBar } from 'react-bootstrap';

function PlantModal({ plant, show, onHide }) {
  if (!plant) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{plant.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={4}>
            <img
              src={plant.imageUrl}
              alt={plant.title}
              className="rounded border"
              style={{ width: "100%" }}
            />
            <ProgressBar
              now={plant.matchPercentage}
              variant="success"
              className="mt-3"
            />
            <p className="mt-1">{plant.matchPercentage}% Match</p>
          </Col>
          <Col xs={8}>
            <p>{plant.description}</p>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default PlantModal;