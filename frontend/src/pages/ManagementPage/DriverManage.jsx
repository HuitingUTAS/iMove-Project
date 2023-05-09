import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function DriverManage() {
  const [drivers, setdrivers] = useState([]);
  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Driver ID</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="driverID"
              value={drivers}
              onChange={setdrivers}
              placeholder="Search Driver"
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

export default DriverManage;
