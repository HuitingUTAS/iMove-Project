import React, { useState } from "react";
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

function PackerPage(){ 
    const [orders] = useState(["Order1", "Order2", "Order3"]);
    const [selectedOrder, setSelectedPacker] = useState(orders[0]);
    const [selectedNumber, setSelectedNumber] = useState('Select');
    const handleSelect = (number) => {
      setSelectedNumber(number);
    };
    return (
      <Container fluid style={{ width:'100vw', padding:'100px' }}>
        <h1>Packer page</h1>
        <Row className="mt-5" >
          <Col  md={{ span: 4, offset: 1 }}>
            <Dropdown  onSelect={(selectedKey) => setSelectedPacker(orders[selectedKey])}>
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
                  <strong>Order ID:</strong>
                </div>
                <div className="mb-3" style={{ display: "flex" }}>
                <div>
                  <strong>Details:</strong>
                </div>
                <div
                  className="mb-3" style={{
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
                <div className="mb-3">
                  <strong>Date:</strong>
                </div>
                <div className="mb-3">
                  <strong>Parcel Needed:</strong>
                </div>
                <Dropdown className="mb-3">
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  {selectedNumber}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSelect('1')}>1</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect('2')}>2</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect('3')}>3</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {e.stopPropagation(); }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Other number"
                                aria-label="Other number"
                                aria-describedby="basic-addon2"
                                onBlur={(e) => handleSelect(e.target.value)}
                            />
                        </InputGroup>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-end" style={{ position: 'fixed', bottom: '200px', right: '200px' }}>
          <Button variant="success">Confirm</Button>
        </Row>
      </Container>
    );
  
};

export default PackerPage;