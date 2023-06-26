import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../config";

function DriverManage() {
  const [driverData, setDriverData] = useState([]);
  const [driverName, setdriverName] = useState(
    `${BASE_URL}/DriverManagement/FetchingDriver/{123}`
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  // Fetching dispatcher data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(driverName);
      setDriverData(response.data);
    } catch (error) {
      // console.log("Error fetching data:", error.message);
      // alert(error.message);
    }
  };

  const handleEditDriver = () => {
    // Code to handle editing a Driver entry based on driver name
    setIsEditing(true);
  };

  const handleDeleteDriver = (index) => {
    // Code to handle deleting a driver entry based on index
    console.log("Deleting Driver:", index);
  };

  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Driver Name</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="dispatcherName"
              onChange={(e) =>
                setDispatcherName(
                  `${BASE_URL}/DriverManagement/FetchingDriver/{${e.target.value}}`
                )
              }
              placeholder="Search driver"
              required
            />
          </Col>
          <Col xs="auto" className="text-right">
            <Button variant="success" onClick={fetchData}>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <hr></hr>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>license Number</th>
            <th>license Photo</th>
            <th>photo</th>
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {driverData.map((driver, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.name}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.name
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.gender}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.gender
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.email}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.email
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.phone}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.phone
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.address}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.address
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.licenseNumber}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.licenseNumber
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.licensePhoto}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.licensePhoto
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.Photo}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.Photo
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="password"
                    rows={1}
                    defaultValue={driver.password}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.password
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.status}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  driver.status
                )}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEditDriver()}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteDriver(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DriverManage;
