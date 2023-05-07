import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Dispatch.css";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const nagivation = new useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    SenderName: "",
    ReciverName: "",
    Address: "",
    PhoneNumber: "",
    Item: "",
    Requirement: "",
    Fridge: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "radio" ? target.value === "true" : target.value;
    const name = target.name;

    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit form data goes here
  };

  return (
    <div className="add">
      <h2>Add Order</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="senderName">
              <Form.Label>Sender Name</Form.Label>
              <Form.Control
                type="text"
                name="SenderName"
                value={orderDetails.SenderName}
                onChange={handleChange}
                placeholder="Enter Sender name"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="reciverName">
              <Form.Label>Reciver Name</Form.Label>
              <Form.Control
                type="text"
                name="ReciverName"
                value={orderDetails.ReciverName}
                onChange={handleChange}
                placeholder="Enter reciver name"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group controlId="address" style={{ margin: "1.5rem auto" }}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="Address"
              value={orderDetails.Address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                name="PhoneNumber"
                value={orderDetails.PhoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fridge" style={{ margin: "2.3rem auto" }}>
              <Form.Label>Require Fridge: </Form.Label>
              <Form.Check
                style={{ marginLeft: "10px" }}
                inline
                label="Yes"
                type="radio"
                name="requireFridge"
                value={true}
                checked={orderDetails.requireFridge === true}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="No"
                type="radio"
                name="requireFridge"
                value={false}
                checked={orderDetails.requireFridge === false}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="item">
              <Form.Label>Items</Form.Label>
              <Form.Control
                as="textarea"
                name="Item"
                value={orderDetails.Item}
                onChange={handleChange}
                placeholder="Enter including items"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="requirement">
              <Form.Label>Special Requirement</Form.Label>
              <Form.Control
                as="textarea"
                name="Requirement"
                value={orderDetails.Requirement}
                onChange={handleChange}
                placeholder="Enter special requirement"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={10} style={{ margin: "1rem auto" }}>
            <Button variant="primary" type="submit">
              Add Order
            </Button>
          </Col>
          <Col style={{ right: true, margin: "1rem auto" }}>
            <Button
              variant="secondary"
              onClick={() => {
                nagivation("/dispatch");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddOrder;
