import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Modal,
} from "react-bootstrap";

const sampleItems = [
  {
    id: 1,
    name: "Item 1",
    volume: "0-1m³",
  },
  {
    id: 2,
    name: "Item 2",
    volume: "1-2m³",
  },
  {
    id: 3,
    name: "Item 3",
    volume: "2-3m³",
  },
  {
    id: 4,
    name: "Item 4",
    volume: "3-4m³",
  },
  {
    id: 5,
    name: "Item 5",
    volume: "4-5m³",
  },
];
function ItemManage() {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [items, setItems] = useState(sampleItems);
  const [showModal, setShowModal] = useState(false);
  const [originalItem, setOriginalItem] = useState(null);
  const [originalItems, setOriginalItems] = useState([]);
  const [newItem, setNewItem] = useState({ id: "", name: "", volume: "" });
  const handleSearchChange = (e) => {
    if (e.target.value) {
      setSearch(e.target.value.toLowerCase());
    } else {
      setSearch("");
    }
  };
  const filteredItems = items.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(keyword) ||
      item.id.toString().toLowerCase().includes(keyword)
    );
  });
  const handleAdd = () => {
    if (newItem.name && newItem.volume) {
      setItems([...items, newItem]);
      setNewItem({ id: "", name: "", volume: "" });
      setShowModal(false);
    } else {
      alert("Please enter a name and select a volume.");
    }
  };
  const handleEdit = (index) => {
    setOriginalItem(JSON.parse(JSON.stringify(items[index])));
    setEditIndex(index);
  };
  const handleNameChange = (e, index) => {
    const newItems = [...items];
    newItems[index].name = e.target.value;
    setItems(newItems);
  };
  //add button to show modal
  const handleShowModal = () => {
    const nextId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    setNewItem({ ...newItem, id: nextId });
    setShowModal(true);
  };
  const handleVolumeChange = (newVolume, index) => {
    const newItems = [...items];
    newItems[index].volume = newVolume;
    setItems(newItems);
  };
  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const handleConfirm = () => {
    setEditIndex(null);
  };
  const handleCancel = (index) => {
    const newItems = [...items];
    newItems[index] = originalItem;
    setItems(newItems);
    setEditIndex(null);
  };
  return (
    <Container fluid>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search by name or ID"
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
        <Col className="ml-5">
          <Button onClick={handleShowModal}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Name</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => {
              const isEditing = editIndex === index;
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {isEditing ? (
                      <FormControl
                        defaultValue={item.name}
                        onChange={(e) => handleNameChange(e, index)}
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <DropdownButton
                        id="volume-dropdown"
                        title={item.volume}
                        onSelect={(newVolume) =>
                          handleVolumeChange(newVolume, index)
                        }
                      >
                        <Dropdown.Item eventKey="0-1m³">
                          0-1m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="1-2m³">
                          1-2m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2-3m³">
                          2-3m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="3-4m³">
                          3-4m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="4-5m³">
                          4-5m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="5-6m³">
                          5-6m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="6-7m³">
                          6-7m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="7-8m³">
                          7-8m&sup3;
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="8+m³">8+m&sup3;</Dropdown.Item>
                      </DropdownButton>
                    ) : (
                      item.volume
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
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Item</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Item ID: <strong>{newItem.id}</strong>
              </p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Item Name</span>
                </div>
                <textarea
                  className="form-control"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  rows="1"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Volume</span>
                </div>
                <DropdownButton
                  as={InputGroup.Append}
                  variant="outline-secondary"
                  title={newItem.volume || "Select volume"}
                  onSelect={(volume) => setNewItem({ ...newItem, volume })}
                >
                  <Dropdown.Item eventKey="0-1m³">0-1m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="1-2m³">1-2m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="2-3v">2-3m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="3-4m³">3-4m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="4-5m³">4-5m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="5-6m³">5-6m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="6-7m³">6-7m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="7-8m³">7-8m&sup3;</Dropdown.Item>
                  <Dropdown.Item eventKey="8+m³">8+m&sup3;</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAdd}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
}

export default ItemManage;
