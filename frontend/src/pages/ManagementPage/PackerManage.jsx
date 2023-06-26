import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, FormControl } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../config";

function PackerManage() {
  const [packerData, setPackerData] = useState([]);
  const [packerName, setPackerName] = useState(
    `${BASE_URL}/PackerManagement/FetchingPacker/123`
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching dispatcher data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(packerName);
      setPackerData(response.data);
    } catch (error) {
      // console.log("Error fetching data:", error.message);
      // alert(error.message);
    }
  };

  const handleEditPacker = () => {
    // Code to handle editing a packer entry based on packer name
    setIsEditing(true);
  };

  const handleDeletePacker = (index) => {
    // Code to handle deleting a packer entry based on index
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
            <Form.Label className="mr-sm-4">Packer Name</Form.Label>
          </Col>
          <Col xs={2}>
            <Form.Control
              type="text"
              name="packerName"
              onChange={(e) =>
                setPackerName(
                  `${BASE_URL}/PackerManagement/FetchingPacker/${e.target.value}`
                )
              }
              placeholder="Search Packer"
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
            <th>Photo</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packerData.map((packer, index) => (
            <tr key={index}>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.name}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.name
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.gender}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.gender
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.email}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.email
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.phone}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.phone
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.address}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.address
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
                    defaultValue={packer.photo}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.photo
                )}
              </td>
              <td>
                {isEditing ? (
                  <FormControl
                    as="textarea"
                    rows={1}
                    defaultValue={packer.status}
                    onChange={(e) => handleChange(e, index)}
                  />
                ) : (
                  packer.status
                )}
              </td>
              <td>
                {" "}
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
                      onClick={() => handleEditPacker()}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePacker(index)}
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

export default PackerManage;
