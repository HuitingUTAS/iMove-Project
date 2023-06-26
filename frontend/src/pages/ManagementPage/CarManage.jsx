import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../config";

function CarManage() {
  const [carData, setCarData] = useState([]);
  const [searchCarID, setSearchCarID] = useState(
    `${BASE_URL}/CarManagement/FetchingCar/123`
  );
  const [isEditing, setIsEditing] = useState(false);

  //Initialization page
  useEffect(() => {
    fetchData();
  }, []);

  // Fetching car data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(searchCarID);
      setCarData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
      // alert(error.message);
    }
  };

  const handleEditCar = (carID) => {
    // Code to handle editing a car entry based on carID
    setIsEditing(true);
    console.log("Editing car:", carID);
  };

  const handleDeleteCar = (carID) => {
    // Code to handle deleting a car entry based on carID
    console.log("Deleting car:", carID);
  };

  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Registration Number</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="searchCarID"
              onChange={(e) =>
                setSearchCarID(
                  `${BASE_URL}/CarManagement/FetchingCar/${e.target.value}`
                )
              }
              placeholder="Search Car"
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
            <th>Make</th>
            <th>Model</th>
            <th>Type</th>
            <th>Registration Number</th>
            <th>Volume</th>
            <th>Has Fridge</th>
            <th>Is Insuranced</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carData.map((car, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.make}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.make
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.model}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.model
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.type}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.type
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.registrationNumber}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.registrationNumber
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.volume}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.volume
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.hasFridge}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.hasFridge
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.isInsuranced}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.isInsuranced
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.status}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  car.status
                )}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEditCar(index)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCar(car.registrationNumber)}
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

export default CarManage;
