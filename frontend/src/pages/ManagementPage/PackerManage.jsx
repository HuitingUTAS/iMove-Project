import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function PackerManage() {
  const [packers, setpackers] = useState([]);
  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Packer ID</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="packerID"
              value={packers}
              onChange={setpackers}
              placeholder="Search Packer "
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

export default PackerManage;
