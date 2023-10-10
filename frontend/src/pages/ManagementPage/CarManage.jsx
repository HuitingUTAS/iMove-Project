import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../config";

function CarManage() {
  const [carData, setCarData] = useState([]);
  const [searchCarID, setSearchCarID] = useState(
    `${BASE_URL}/CarManagement/FetchingAllCars`
  );
  const [isEditing, setIsEditing] = useState("-1"); // representing no row is being edited
  const [editedData, setEditedData] = useState({}); // to hold edited data
  const [drivers, setDrivers] = useState([]); // Store the list of drivers from the database

  //Initialization page
  useEffect(() => {
    fetchData();
    fetchDrivers();
  }, []);

  // Fetching car data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(searchCarID);
      setCarData(response.data);
      // console.log("fetched car: ", carData);
    } catch (error) {
      // alert(error.message);
      console.log("Error fetching data:", error.message);
    }
  };

  //Fetching driver information
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DriverManagement/FetchingAllDrivers`
      );
      setDrivers(response.data);
    } catch (error) {
      console.log("Error fetching drivers:", error.message);
    }
  };

  //update included driver
  const handleDriverSelect = (index, driverID, driverUserName) => {
    const updatedCarData = [...carData];
    updatedCarData[index].driver.username = driverUserName;

    setCarData(updatedCarData);
    handleChange(driverID, index, "driverUsername");
  };

  const handleDeleteCar = (carID) => {
    // // Code to handle deleting a car entry based on carID
    //alter a window to double check
    if (window.confirm("Dou want to delete this car?")) {
      axios
        .delete(`${BASE_URL}/CarManagement/DeletingCar/${carID}`, {})
        .then((response) => {
          // console.log(response.data);
          alert("Remove successfully!");
          fetchData();
        })
        .catch((error) => {
          alert(
            "Cannot remove this car, please contact to system administrator."
          );
          console.error(error);
        });
    }
  };

  // updating if there is any change
  const handleChange = (e, index, field) => {
    const updatedCarData = [...carData];
    const editedCar = { ...editedData[index] }; // Get the edited data for the specific row

    if (field === "driverUsername") {
      // console.log("updating driver !!!!");
      updatedCarData[index].driver.ObjectId = e;
      editedCar.driver = e; // Update the edited driver username
    } else if (field === "isInsuranced" || field === "hasFridge") {
      //Update the insuranced statu and whether include fridge
      updatedCarData[index][field] = e;
      editedCar[field] = e;
    } else {
      const { value } = e.target;
      updatedCarData[index][field] = value;
      editedCar[field] = value; // Update the edited field
    }
    editedCar["_id"] = carData[index]["_id"]; // updated car's id
    setCarData(updatedCarData);

    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [index]: editedCar, // Update the edited data for the specific row
    }));
  };

  //confirming updated car
  const handleConfirm = async (carID) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/CarManagement/UpdatingCar`,
        editedData[carID] // Send only the edited data for the specific carID
      );
      // Clear edited data and reset editing state
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [carID]: {}, // Clear the edited data for the specific carID
      }));
      setIsEditing("-1");
      fetchData();
    } catch (error) {
      console.log("Error updating car:", error.message);
    }
  };

  return (
    <div>
      <Form onSubmit={() => {}}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Rego Plate</Form.Label>
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
            <th>Rego Plate</th>
            <th>Volume</th>
            <th>Fridge</th>
            <th>Insuranced</th>
            <th>Driver</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carData.map((car, index) => (
            <tr key={index}>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.make}
                    onChange={(e) => handleChange(e, index, "make")}
                  />
                ) : (
                  car.make
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.model}
                    onChange={(e) => handleChange(e, index, "model")}
                  />
                ) : (
                  car.model
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.registrationNumber}
                    onChange={(e) =>
                      handleChange(e, index, "registrationNumber")
                    }
                  />
                ) : (
                  car.registrationNumber
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.volume}
                    onChange={(e) => handleChange(e, index, "volume")}
                  />
                ) : (
                  car.volume
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="fridge-dropdown">
                      {car.hasFridge ? "true" : "false"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"true"}
                        onClick={(e) => handleChange(true, index, "hasFridge")}
                      >
                        {"true"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"false"}
                        onClick={(e) => handleChange(false, index, "hasFridge")}
                      >
                        {"false"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : car.hasFridge ? (
                  "ture"
                ) : (
                  "false"
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="insuranced-dropdown">
                      {car.isInsuranced ? "true" : "false"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"true"}
                        onClick={(e) =>
                          handleChange(true, index, "isInsuranced")
                        }
                      >
                        {"true"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"false"}
                        onClick={(e) =>
                          handleChange(false, index, "isInsuranced")
                        }
                      >
                        {"false"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : car.isInsuranced ? (
                  "ture"
                ) : (
                  "false"
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="driver-dropdown">
                      {car.driver.username}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {drivers.map((driver) => (
                        <Dropdown.Item
                          key={driver._id}
                          onClick={() =>
                            handleDriverSelect(
                              index,
                              driver._id,
                              driver.username
                            )
                          }
                        >
                          {driver.username}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  car.driver.username
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={car.status}
                    onChange={(e) => handleChange(e, index, "status")}
                  />
                ) : (
                  car.status
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleConfirm(index)}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => setIsEditing("-1")}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(index)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCar(car._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CarManage;
