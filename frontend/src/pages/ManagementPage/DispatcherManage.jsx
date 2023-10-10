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
import "./Management.css";

function DispatcherManage() {
  const [dispatcherData, setDispatcherData] = useState([]);
  const [dispatcherName, setDispatcherName] = useState([]);
  const [editedData, setEditedData] = useState([]);
  // const [updatePacker, setUpdatePacker] = useState([]);
  const [filteredDispatcher, setFilteredDispatcher] = useState([]);

  const [isEditing, setIsEditing] = useState(-1);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching dispatcher data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DispatcherManagement/FetchingAllDispatchers`
      );
      setDispatcherData(response.data);
      setFilteredDispatcher(response.data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
      // alert(error.message);
    }
  };

  //searching dispatchers by name
  const handleSearch = () => {
    const searchTerm = dispatcherName.toLowerCase();
    const filteredData = dispatcherData.filter((dispatcher) =>
      dispatcher.name.toLowerCase().includes(searchTerm)
    );
    setFilteredDispatcher(filteredData);
  };

  //update attributes of dispatcher
  const handleChange = (e, index, field) => {
    const updateDispatcher = [...dispatcherData];
    const editedDispatcher = { ...editedData[index] }; // Get the edited data for the specific row
    editedDispatcher["_id"] = dispatcherData[index]["_id"]; // updated dispacther's id
    if (field === "gender") {
      // console.log("gender change !!!!", e);
      updateDispatcher[index][field] = e;
      editedDispatcher[field] = e; // Update the edited dispatcher gender
    } else {
      const { value } = e.target;
      updateDispatcher[index][field] = value;
      editedDispatcher[field] = value; // Update the edited field
    }
    setDispatcherData(updateDispatcher);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [index]: editedDispatcher, // Update the edited data for the specific row
    }));
  };

  //confirming updated car
  const handleConfirm = async (index) => {
    const editedDispatcher = editedData[index];
    console.log("confirm updating:", editedDispatcher);
    try {
      const response = await axios.put(
        `${BASE_URL}/DispatcherManagement/UpdatingDispatcher`,
        editedDispatcher // Send only the edited data for the specific dispatcher ID
      );
      // Clear edited data and reset editing state
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [index]: {}, // Clear the edited data for the specific carID
      }));
      setIsEditing(-1);
      fetchData();
    } catch (error) {
      console.log("Error updating dispatcher:", error.message);
    }
  };

  // deleting a dispatcher entry based on index
  const handleDeleteDispatcher = (dispatcherID) => {
    if (window.confirm("Dou want to delete this dispacther?")) {
      axios
        .delete(
          `${BASE_URL}/DispatcherManagement/DeletingDispatcher/${dispatcherID}`,
          {}
        )
        .then((response) => {
          // console.log(response.data);
          alert("Remove successfully!");
          fetchData();
        })
        .catch((error) => {
          alert(
            "Cannot remove this dispatcher, please contact to system administrator."
          );
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Form>
        <Row className="align-items-center">
          <Col xs="auto">
            <Form.Label className="mr-sm-4">Dispacher Name</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="dispatcherName"
              onChange={(e) => setDispatcherName(e.target.value)}
              placeholder="Search Dispatcher"
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
            {/* <th>photo</th> */}
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDispatcher.map((dispatcher, index) => (
            <tr key={index}>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.name}
                    onChange={(e) => handleChange(e, index, "name")}
                  />
                ) : (
                  dispatcher.name
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="gender-dropdown">
                      {dispatcher.gender}
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
                  dispatcher.gender
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.email}
                    onChange={(e) => handleChange(e, index, "email")}
                  />
                ) : (
                  dispatcher.email
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.phone}
                    onChange={(e) => handleChange(e, index, "phone")}
                  />
                ) : (
                  dispatcher.phone
                )}
              </td>
              <td>
                {isEditing === index ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.address}
                    onChange={(e) => handleChange(e, index, "address")}
                  />
                ) : (
                  dispatcher.address
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
              {/* <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.photo}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.photo
                )}
              </td> */}
              <td>
                {isEditing === index ? (
                  <Dropdown>
                    <Dropdown.Toggle id="gender-dropdown">
                      {dispatcher.status}
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
                  dispatcher.status
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
                      onClick={() => handleDeleteDispatcher(dispatcher._id)}
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

export default DispatcherManage;
