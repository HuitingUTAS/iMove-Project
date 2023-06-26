import React, { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import "./Dispatch.css";
import { useNavigate } from "react-router-dom";

function AddOrder() {
  const nagivation = new useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    OrderID: "",
    SenderName: "",
    ReciverName: "",
    Address: "",
    PhoneNumber: "",
    Item: "",
    Requirement: "",
    Fridge: "",
    DeliverDate: "",
  });

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    itemName: "",
    uom: "",
    quantity: 0,
  });

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, newItem]);
    setNewItem({
      itemName: "",
      uom: "",
      quantity: 0,
    });
  };

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
  // Predictive selecting receiver name and address from database when it changed
  const handleChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //Predictiv selecting item name when it changed
  const changeItem = (event) => {
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
          <Col md={5}>
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
          <Col md={5}>
            <Form.Group controlId="address" style={{ margin: "1.5rem auto" }}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                name="Address"
                value={orderDetails.Address}
                onChange={handleChange}
                placeholder="Enter address"
                disabled
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group
              controlId="phoneNumber"
              style={{ margin: "1.5rem auto" }}
            >
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="PhoneNumber"
                value={orderDetails.PhoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Form.Group controlId="deliverdate">
              <Form.Label>Deliver Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="DeliverDate"
                value={orderDetails.DeliverDate}
                onChange={handleChange}
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
            <Form.Group controlId="requirement">
              <Form.Label>Special Requirement</Form.Label>
              <Form.Control
                as="textarea"
                name="Requirement"
                value={orderDetails.Requirement}
                onChange={handleChange}
                rows={2}
                placeholder="Enter special requirement"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="addItem">
          <h2>Insert Item</h2>
          <hr />
          <Row>
            <Col>
              <Form.Group controlId="itemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={newItem.itemName}
                  onChange={changeItem}
                  placeholder="Enter item name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="itemUOM">
                <Form.Label>Item UOM</Form.Label>
                <Form.Control
                  type="text"
                  name="uom"
                  value={newItem.uom}
                  onChange={(e) =>
                    setNewItem({ ...newItem, uom: e.target.value })
                  }
                  placeholder="Enter unit of measure"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="itemQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter item quantity"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary"
                onClick={handleAddItem}
                style={{ textAlign: "right" }}
              >
                Add Item
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{
                  margin: "1.5rem auto",
                  overflowY: "scroll",
                  maxHeight: "500px",
                }}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>UOM</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.uom}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
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
