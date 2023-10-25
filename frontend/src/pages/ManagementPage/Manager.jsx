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

function Manager() {
  const [managerData, setManagerData] = useState([]);
  const [FilteredManager, setFilteredManager] = useState([]);
  const [managerName, setManagerName] = useState([]);
  // const [updateManager, setUpdateManager] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [isEditing, setIsEditing] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);
  // Fetching manager data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/ManagerManagement/FetchingAllManagers`
      );
      setManagerData(response.data);
      setFilteredManager(response.data);
    } catch (error) {
      console.log("Error fetching manager data:", error.message);
    }
  };

  //Filter manager by name
  const handleSearch = () => {
    const searchTerm = managerName.toLowerCase();
    const filteredData = managerData.filter((manager) =>
      manager.name.toLowerCase().includes(searchTerm)
    );
    setFilteredManager(filteredData);
  };

  //update attributes of manager
  const handleChange = (e, index, field) => {
    const updateManager = [...managerData];
    const editedManager = { ...editedData[index] }; // Get the edited data for the specific row
    editedManager["_id"] = managerData[index]["_id"]; // updated manager's id
    if (field === "gender") {
      // console.log("gender change !!!!", e);
      updateManager[index][field] = e;
      editedManager[field] = e; // Update the edited manager gender
    } else {
      const value = e.target.value;
      updateManager[index][field] = value;
      editedManager[field] = value; // Update the edited field
    }
    setManagerData(updateManager);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [index]: editedManager, // Update the edited data for the specific row
    }));
  };

  //confirming updated manager
  const handleConfirm = async (index) => {
    const editedManager = editedData[index];
    console.log("confirm updating:", editedManager);
    console.log(
      "updating url:",
      `${BASE_URL}"/ManagerManagement/UpdatingManager`
    );
    try {
      const response = await axios.put(
        `${BASE_URL}"/ManagerManagement/UpdatingManager`,
        editedManager // Send only the edited data for the specific manager ID
      );
      // Clear edited data and reset editing state
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [index]: {}, // Clear the edited data for the specific manager ID
      }));
      setIsEditing(-1);
      fetchData();
    } catch (error) {
      alert(
        "Cannot update manager information, please contact system administrator!"
      );
      console.log("Error updating manager:", error.message);
    }
  };

  // deleting a manager entry based on index
  const handleDeleteManager = (managerID) => {
    if (window.confirm("Dou want to delete this manager?")) {
      axios
        .delete(
          `${BASE_URL}/ManagerManagement/DeletingManager/${managerID}`,
          {}
        )
        .then((response) => {
          // console.log(response.data);
          alert("Remove successfully!");
          fetchData();
        })
        .catch((error) => {
          alert(
            "Cannot remove this manager, please contact to system administrator."
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
            <Form.Label className="mr-sm-4">Manager Name</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="managerName"
              onChange={(e) => setManagerName(e.target.value)}
              placeholder="Search manager"
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
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {FilteredManager.map((manager, index) => (
            <tr key={index}>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={manager.name}
                    onChange={(e) => handleChange(e, index, "name")}
                  />
                ) : (
                  manager.name
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="gender-dropdown">
                      {manager.gender}
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
                  manager.gender
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={manager.email}
                    onChange={(e) => handleChange(e, index, "email")}
                  />
                ) : (
                  manager.email
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={manager.phone}
                    onChange={(e) => handleChange(e, index, "phone")}
                  />
                ) : (
                  manager.phone
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={manager.address}
                    onChange={(e) => handleChange(e, index, "address")}
                  />
                ) : (
                  manager.address
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
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteManager(manager._id)}
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

export default Manager;
