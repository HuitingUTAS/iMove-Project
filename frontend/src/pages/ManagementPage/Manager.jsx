import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Manager() {
  const [managers, setmanagers] = useState([]);
  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Manager ID</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="managerID"
              value={managers}
              onChange={setmanagers}
              placeholder="Search Manager"
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

export default Manager;
