import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, FormControl } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../config";

function DispatcherManage() {
  const [dispatcherData, setDispatcherData] = useState([]);
  const [dispatcherName, setDispatcherName] = useState(
    `${BASE_URL}/DispatcherManagement/FetchingDispatcher/123`
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching dispatcher data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(dispatcherName);
      setDispatcherData(response.data);
    } catch (error) {
      // console.log("Error fetching data:", error.message);
      // alert(error.message);
    }
  };

  const handleEditDispatcher = () => {
    // Code to handle editing a dispatcher entry based on dispatcher name
    setIsEditing(true);
  };

  const handleDeleteDispatcher = (index) => {
    // Code to handle deleting a dispatcher entry based on index
    console.log("Deleting dispatcher:", index);
  };

  //confirming updated car
  const handleConfirm = () => {
    console.log("confirm updating");
    setIsEditing(false);
  };

  // cancling change

  const handleCancel = (index) => {
    setIsEditing(false);
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
              onChange={(e) =>
                setDispatcherName(
                  `${BASE_URL}/DispatcherManagement/FetchingDispatcher/${e.target.value}`
                )
              }
              placeholder="Search Dispatcher"
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
            <th>Password</th>
            <th>photo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dispatcherData.map((dispatcher, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.name}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.name
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.gender}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.gender
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.email}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.email
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.phone}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.phone
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.address}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.address
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="password"
                    rows={1}
                    defaultValue={""}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  "******"
                )}
              </td>
              <td>
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
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={dispatcher.status}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  dispatcher.status
                )}
              </td>
              <td>
                {isEditing ? (
                  <>
                    <Button variant="success" onClick={handleConfirm}>
                      Confirm
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleEditDispatcher()}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteDispatcher(index)}
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
