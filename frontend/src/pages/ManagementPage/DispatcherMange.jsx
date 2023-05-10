import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function DispatcherMange() {
  const [dispatchers, setdispatchers] = useState([]);
  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Dispatcher ID</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="dispatcherID"
              value={dispatchers}
              onChange={setdispatchers}
              placeholder="Search Disparcher"
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

export default DispatcherMange;
