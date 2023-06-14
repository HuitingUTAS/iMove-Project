import "./Driver.css";
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
function DriverPage() {
  const [orders] = useState(["Order1", "Order2", "Order3"]);

  const [selectedOrder, setSelectedPacker] = useState(orders[0]);

  const [selectedStatus, setSelectedStatus] = useState("Waiting");

  const [orderData, setOrderData] = useState(null); // Store the received order data

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:3002/order/SOF003101");
      if (response.ok) {
        const data = await response.json();
        setOrderData(data);
        console.log(data);
      } else {
        console.log("Error response:", response.status);
      }
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);
  const handleSelect = (number) => {
    setSelectedStatus(number);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };
  return (
    <div className="drivertest">
      <h1>This is Driver Page</h1>
      {orderData && (
        <div>
          <h2>Order Data:</h2>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
      )}
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 1 }}>
          <Dropdown
            onSelect={(selectedKey) => setSelectedPacker(orders[selectedKey])}
          >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedOrder}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {orders.map((order, index) => (
                <Dropdown.Item key={index} eventKey={index}>
                  {order}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="mb-4 h-100">
            <Card.Header>{selectedOrder}</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Order number:</strong>
              </div>
              <div className="mb-3">
                <strong>Recevier name:</strong>
              </div>
              <div className="mb-3">
                <strong>Address:</strong>
              </div>
              <div className="mb-3">
                <strong>Parcel number:</strong>
              </div>
              <div className="mb-3" style={{ display: "flex" }}>
                <div>
                  <strong>Special requirements:</strong>
                </div>
                <div
                  className="mb-3"
                  style={{
                    marginLeft: "10px",
                    flexGrow: 1,
                    overflowY: "scroll",
                    maxHeight: "200px",
                    border: "1px solid #ccc",
                    padding: "10px",
                  }}
                >
                  <FormControl
                    as="textarea"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>

              <Dropdown className="mb-3">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {selectedStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect("Waiting")}>
                    Waiting
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("In progress")}>
                    In progress
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("Completed")}>
                    Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Row
        className="justify-content-end"
        style={{ position: "fixed", bottom: "100px", right: "200px" }}
      >
        <Button variant="success" onClick={handleButtonClick}>
          upload
        </Button>
      </Row>
    </div>
  );
}
export default DriverPage;
