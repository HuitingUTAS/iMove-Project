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

function PackerManage() {
  const [packerData, setPackerData] = useState([]);
  const [packerName, setPackerName] = useState(``);
  const [isEditing, setIsEditing] = useState(false);
  // const [editedPacker, setEditedPacker] = useState([]);
  // const [updatePacker, setUpdatePacker] = useState([]);
  const [editedData, setEditedData] = useState({}); // to hold edited data
  const [filteredPackers, setFilteredPackers] = useState([]); //search packers

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching dispatcher data from MangoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/PackerManagement/FetchingAllPackers`
      );
      setPackerData(response.data);
      setFilteredPackers(response.data);
      // console.log("fetehced packer infor:", packerData);
    } catch (error) {
      console.log("Error fetching data:", error.message);
      alert(error.message);
    }
  };

  //searching packers by packer name
  const handleSearch = () => {
    console.log("packer name:", packerName);
    const searchTerm = packerName.toLowerCase();
    const filteredData = packerData.filter((packer) =>
      packer.name.toLowerCase().includes(searchTerm)
    );
    setFilteredPackers(filteredData);
  };

  //update attributes of packer
  const handleChange = (e, index, field) => {
    const updatePacker = [...packerData];
    const editedPacker = { ...editedData[index] }; // Get the edited data for the specific row
    editedPacker["_id"] = packerData[index]["_id"]; // updated car's id
    if (field === "gender") {
      // console.log("gender change !!!!", e);
      updatePacker[index][field] = e;
      editedPacker[field] = e; // Update the edited packer gender
    } else {
      const { value } = e.target;
      updatePacker[index][field] = value;
      editedPacker[field] = value; // Update the edited field
    }
    setPackerData(updatePacker);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [index]: editedPacker, // Update the edited data for the specific row
    }));
    // console.log("updatepackerData:", updatePacker);
    // console.log("this time is the edited data:", editedPacker);
  };

  // deleting a packer entry based on index
  const handleDeletePacker = (packerID) => {
    if (window.confirm("Dou want to delete this packer?")) {
      axios
        .delete(`${BASE_URL}/PackerManagement/DeletingPacker/${packerID}`, {})
        .then((response) => {
          // console.log(response.data);
          alert("Remove successfully!");
          fetchData();
        })
        .catch((error) => {
          alert(
            "Cannot remove this packer, please contact to system administrator."
          );
          console.error(error);
        });
    }
  };
  //confirming updated car
  const handleConfirm = async (index) => {
    const editedPacker = editedData[index];
    console.log("confirm updating:", editedPacker);
    try {
      const response = await axios.put(
        `${BASE_URL}/PackerManagement/UpdatingPacker`,
        editedPacker // Send only the edited data for the specific carID
      );
      // Clear edited data and reset editing state
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [index]: {}, // Clear the edited data for the specific carID
      }));
      setIsEditing("-1");
      fetchData();
    } catch (error) {
      console.log("Error updating packer:", error.message);
    }
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
              value={packerName}
              onChange={(e) => setPackerName(e.target.value)}
              placeholder="Search Packer"
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
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "400px",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Password</th>
              {/* <th>Photo</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackers.map((packer, index) => (
              <tr key={index}>
                <td>
                  {isEditing === index ? (
                    <FormControl
                      as="textarea"
                      rows={1}
                      defaultValue={packer.name}
                      onChange={(e) => handleChange(e, index, "name")}
                    />
                  ) : (
                    packer.name
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <Dropdown>
                      <Dropdown.Toggle id="gender-dropdown">
                        {packer.gender}
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
                          onClick={(e) =>
                            handleChange("Female", index, "gender")
                          }
                        >
                          {"Female"}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    packer.gender
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <FormControl
                      as="textarea"
                      rows={1}
                      defaultValue={packer.email}
                      onChange={(e) => handleChange(e, index, "email")}
                    />
                  ) : (
                    packer.email
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <FormControl
                      as="textarea"
                      rows={1}
                      defaultValue={packer.phone}
                      onChange={(e) => handleChange(e, index, "phone")}
                    />
                  ) : (
                    packer.phone
                  )}
                </td>
                <td>
                  {isEditing === index ? (
                    <FormControl
                      as="textarea"
                      rows={1}
                      defaultValue={packer.address}
                      onChange={(e) => handleChange(e, index, "address")}
                    />
                  ) : (
                    packer.address
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
                  {isEditing === index ? (
                    <FormControl
                      as="textarea"
                      rows={1}
                      defaultValue={packer.photo}
                      onChange={(e) => handleChange(e, index)}
                    />
                  ) : (
                    packer.photo
                  )}
                </td> */}
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
                      <Button
                        variant="warning"
                        onClick={() => setIsEditing(-1)}
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
                        onClick={() => handleDeletePacker(packer._id)}
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
    </div>
  );
}

export default PackerManage;
