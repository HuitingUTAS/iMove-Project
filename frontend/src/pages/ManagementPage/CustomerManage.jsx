import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";
const sampleCustomers = [
  {
    id: 1,
    name: "Customer 1",
    address: "xxxxxxxxxxxxx",
  },
  {
    id: 2,
    name: "Customer 2",
    address: "sssssssssssss",
  },
  {
    id: 3,
    name: "Customer 3",
    address: "dddddddddddddd",
  },
  {
    id: 4,
    name: "Customer 4",
    address: "fffffffffffff",
  },
  {
    id: 5,
    name: "Customer 5",
    address: "ggggggggggggg",
  },
];
function CustomerManage() {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    id: "",
    name: "",
    address: "",
  });
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();
    return (
      customer.name.toLowerCase().includes(keyword) ||
      customer.id.toString().toLowerCase().includes(keyword)
    );
  });
  const handleAdd = () => {
    if (newCustomer.name && newCustomer.address) {
      setCustomers([...customers, newCustomer]);
      setNewCustomer({ id: "", name: "", address: "" });
      setShowModal(false);
    } else {
      alert("Please enter a name and an address.");
    }
  };
  const handleEdit = (index) => {
    setOriginalCustomer(JSON.parse(JSON.stringify(customers[index])));
    setEditIndex(index);
  };
  const handleNameChange = (e, index) => {
    const newCustomers = [...customers];
    newCustomers[index].name = e.target.value;
    setCustomers(newCustomers);
  };
  const handleShowModal = () => {
    const nextId =
      customers.length > 0 ? customers[customers.length - 1].id + 1 : 1; //set next id
    setNewCustomer({ ...newCustomer, id: nextId });
    setShowModal(true);
  };
  const handleAddressChange = (e, index) => {
    const newCustomers = [...customers];
    newCustomers[index].address = e.target.value;
    setCustomers(newCustomers);
  };
  const handleDelete = (index) => {
    const newCustomers = customers.filter((_, i) => i !== index);
    setCustomers(newCustomers);
  };
  const handleConfirm = () => {
    setEditIndex(null);
  };
  const handleCancel = (index) => {
    const newCustomers = [...customers];
    newCustomers[index] = originalCustomer;
    setCustomers(newCustomers);
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
              <th>Customer Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((Customer, index) => {
              const isEditing = editIndex === index;
              return (
                <tr key={Customer.id}>
                  <td>{Customer.id}</td>
                  <td>
                    {isEditing ? (
                      <FormControl
                        defaultValue={Customer.name}
                        onChange={(e) => handleNameChange(e, index)}
                      />
                    ) : (
                      Customer.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <FormControl
                        as="textarea"
                        rows={1}
                        defaultValue={Customer.address}
                        onChange={(e) => handleAddressChange(e, index)}
                      />
                    ) : (
                      Customer.address
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
              <h5 className="modal-title">Add New Customer</h5>
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
                Customer ID: <strong>{newCustomer.id}</strong>
              </p>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Customer Name</span>
                </div>
                <textarea
                  className="form-control"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                  rows="1"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Address</span>
                </div>
                <FormControl
                  as="textarea"
                  rows={1}
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, address: e.target.value })
                  }
                />
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

export default CustomerManage;
