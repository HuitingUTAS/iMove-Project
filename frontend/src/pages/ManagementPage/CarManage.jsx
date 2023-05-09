import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function CarManage() {
  const [cars, setcars] = useState([]);
  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Car ID</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="carID"
              value={cars}
              onChange={setcars}
              placeholder="Search Car "
              required
            />
          </Col>
          <Col xs="auto" className="text-right">
            <Button variant="success">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CarManage;
