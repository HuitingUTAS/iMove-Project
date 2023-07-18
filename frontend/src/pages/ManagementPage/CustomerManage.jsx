import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../../config";
function CustomerManage() {
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [originalCustomer, setOriginalCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    code: "",
    companyName: "",
    address: "",
  });
  const fetchCustomerData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/CustomerManagementPage/GetAllCustomers`
      );

      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
        console.log(data);
      } else {
        console.log("Error response:", response.status);
      }
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };
  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.trim();
    const customerName = customer.companyName || "";
    const customerCode = customer.code || "";

    const nameMatch = customerName.toLocaleLowerCase().includes(keyword);
    const codeMatch = new RegExp(keyword, "i").test(customerCode);

    return nameMatch || codeMatch;
  });
  const handleAdd = async () => {
    if (newCustomer.companyName && newCustomer.address) {
      try {
        const response = await fetch(
          `${BASE_URL}/CustomerManagementPage/AddCustomer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: newCustomer.code,
              companyName: newCustomer.companyName,
              address: newCustomer.address,
            }),
          }
        );

        if (response.ok) {
          const addedCustomer = await response.json();
          setCustomers([...customers, addedCustomer]);
          setNewCustomer({ code: "", companyName: "", address: "" });
          setShowModal(false);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error adding customer:", error);
      }
    } else {
      alert("Please enter a name and an address.");
    }
  };
  const handleEdit = (_id) => {
    setOriginalCustomer(
      JSON.parse(
        JSON.stringify(customers.find((customer) => customer._id === _id))
      )
    );
    setEditIndex(_id);
  };
  const handleCodeChange = (e, _id) => {
    const newCustomers = [...customers];
    const customerIndex = newCustomers.findIndex(
      (customer) => customer._id === _id
    );
    newCustomers[customerIndex].code = e.target.value;
    setCustomers(newCustomers);
  };
  const handleNameChange = (e, _id) => {
    const newCustomers = [...customers];
    const customerIndex = newCustomers.findIndex(
      (customer) => customer._id === _id
    );
    newCustomers[customerIndex].companyName = e.target.value;
    setCustomers(newCustomers);
  };
  const handleShowModal = () => {
    setNewCustomer({ ...newCustomer, code: "", name: "", address: "" });
    setShowModal(true);
  };
  const handleAddressChange = (e, _id) => {
    const newCustomers = [...customers];
    const customerIndex = newCustomers.findIndex(
      (customer) => customer._id === _id
    );
    newCustomers[customerIndex].address = e.target.value;
    setCustomers(newCustomers);
  };
  const handleDelete = (code) => {
    const selectedCustomer = customers.find(
      (customer) => customer.code === code
    );

    if (window.confirm("Are you sure you want to delete this customer?")) {
      axios
        .delete(
          `${BASE_URL}/CustomerManagementPage/DeleteCustomer/${selectedCustomer._id}`,
          {}
        )
        .then((response) => {
          // 处理成功响应
          console.log(response.data);
          // 更新 customers 列表，从中删除已删除的 customer
          const updatedCustomers = customers.filter(
            (customer) => customer._id !== selectedCustomer._id
          );
          setCustomers(updatedCustomers);
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
    }
  };

  const handleConfirm = (code) => {
    const selectedCustomer = customers.find(
      (customer) => customer.code === code
    );
    axios
      .put(`${BASE_URL}/CustomerManagementPage/EditCustomer`, {
        _id: selectedCustomer._id,
        code: selectedCustomer.code,
        companyName: selectedCustomer.companyName,
        address: selectedCustomer.address,
      })
      .then((response) => {
        // 处理成功响应
        console.log(response.data);
        setEditIndex(null);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
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
              <th>Code</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => {
              const isEditing = editIndex === customer._id;
              return (
                <tr key={customer.code}>
                  <td>
                    {isEditing ? (
                      <FormControl
                        defaultValue={customer.code}
                        onChange={(e) => handleCodeChange(e, customer._id)}
                      />
                    ) : (
                      customer.code
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <FormControl
                        defaultValue={customer.companyName}
                        onChange={(e) => handleNameChange(e, customer._id)}
                      />
                    ) : (
                      customer.companyName
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <FormControl
                        as="textarea"
                        rows={1}
                        defaultValue={customer.address}
                        onChange={(e) => handleAddressChange(e, customer._id)}
                      />
                    ) : (
                      customer.address
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleConfirm(customer.code)}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => handleCancel(customer._id)}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(customer._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(customer.code)}
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
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Code</span>
                </div>
                <textarea
                  className="form-control"
                  value={newCustomer.code}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, code: e.target.value })
                  }
                  rows="1"
                  style={{ resize: "none" }}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Customer Name</span>
                </div>
                <textarea
                  className="form-control"
                  value={newCustomer.companyName}
                  onChange={(e) =>
                    setNewCustomer({
                      ...newCustomer,
                      companyName: e.target.value,
                    })
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
