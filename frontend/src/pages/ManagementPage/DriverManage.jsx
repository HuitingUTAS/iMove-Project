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

function DriverManage() {
  const [driverData, setDriverData] = useState([]);
  const [filteredDriver, setFilteredDriver] = useState([]);
  const [driverName, setDriverName] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);
  const [editedData, setEditedData] = useState([]);
  // const [updateDriver, setUpdateDriver] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // Fetching driver data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DriverManagement/FetchingAllDrivers`
      );
      setDriverData(response.data);
      setFilteredDriver(response.data);
      // console.log("driver info:", response.data);
    } catch (error) {
      console.log("Error fetching driver data:", error.message);
    }
  };

  //Filter driver by name
  const handleSearch = () => {
    const searchTerm = driverName.toLowerCase();
    const filteredData = driverData.filter((driver) =>
      driver.name.toLowerCase().includes(searchTerm)
    );
    setFilteredDriver(filteredData);
  };

  //update attributes of driver
  const handleChange = (e, index, field) => {
    const updateDriver = [...driverData];
    const editedDriver = { ...editedData[index] }; // Get the edited data for the specific row
    editedDriver["_id"] = driverData[index]["_id"]; // updated driver's id
    if (field === "gender" || field === "status") {
      // console.log("gender change !!!!", e);
      updateDriver[index][field] = e;
      editedDriver[field] = e; // Update the edited driver gender
    } else {
      const { value } = e.target;
      updateDriver[index][field] = value;
      editedDriver[field] = value; // Update the edited field
    }
    setDriverData(updateDriver);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [index]: editedDriver, // Update the edited data for the specific row
    }));
  };

  //confirming updated driver
  const handleConfirm = async (index) => {
    const editedDriver = editedData[index];
    console.log("confirm updating:", editedDriver);
    try {
      const response = await axios.put(
        `${BASE_URL}/DriverManagement/UpdatingDriver`,
        editedDriver // Send only the edited data for the specific driver ID
      );
      // Clear edited data and reset editing status
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [index]: {}, // Clear the edited data for the specific driver ID
      }));
      setIsEditing(-1);
      fetchData();
    } catch (error) {
      console.log("Error updating driver:", error.message);
    }
  };

  // deleting a driver entry based on index
  const handleDeleteDriver = (driverID) => {
    if (window.confirm("Dou want to delete this driver?")) {
      axios
        .delete(`${BASE_URL}/DriverManagement/DeletingDriver/${driverID}`, {})
        .then((response) => {
          // console.log(response.data);
          alert("Remove successfully!");
          fetchData();
        })
        .catch((error) => {
          alert(
            "Cannot remove this driver, please contact to system administrator."
          );
          console.error(error);
        });
    }
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
              name="driverName"
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Search driver"
              required
            />
          </Col>
          <Col xs="auto" className="text-right">
            <Button variant="success" onClick={handleSearch}>
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
            {/* <th>license Photo</th>
            <th>photo</th> */}
            <th>Password</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDriver.map((driver, index) => (
            <tr key={index}>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.name}
                    onChange={(e) => handleChange(e, index, "name")}
                  />
                ) : (
                  driver.name
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="gender-dropdown">
                      {driver.gender}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"Male"}
                        onClick={(e) => handleChange("Male", index, "gender")}
                      >
                        {"Male"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"Female"}
                        onClick={(e) => handleChange("Female", index, "gender")}
                      >
                        {"Female"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  driver.gender
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.email}
                    onChange={(e) => handleChange(e, index, "email")}
                  />
                ) : (
                  driver.email
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.phone}
                    onChange={(e) => handleChange(e, index, "phone")}
                  />
                ) : (
                  driver.phone
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.address}
                    onChange={(e) => handleChange(e, index, "address")}
                  />
                ) : (
                  driver.address
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={driver.licenseNumber}
                    onChange={(e) => handleChange(e, index, "licenseNumber")}
                  />
                ) : (
                  driver.licenseNumber
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    type="password"
                    rows={1}
                    defaultValue={""}
                    onChange={(e) => handleChange(e, index, "password")}
                  />
                ) : (
                  "******"
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="gender-dropdown">
                      {driver.status}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        key={"Valid"}
                        onClick={(e) => handleChange("Valid", index, "status")}
                      >
                        {"Valid"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        key={"Invalid"}
                        onClick={(e) =>
                          handleChange("Invalid", index, "status")
                        }
                      >
                        {"Invalid"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  driver.status
                )}
              </td>
              <td>
                {" "}
                {isEditing === index ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => handleConfirm(index)}
                    >
                      Confirm
                    </Button>
                    <Button variant="warning" onClick={() => setIsEditing(-1)}>
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
                      onClick={() => handleDeleteDriver(driver._id)}
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

export default DriverManage;
