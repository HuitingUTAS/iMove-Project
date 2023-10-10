import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";

function UnallocatedOrders() {
  const navigate = useNavigate();
  const [unallocatedOrders, setUnallocatedOrders] = useState([]);
  const [fetchedSender, setFetchedSender] = useState([]);
  const [fetchedReceiver, setFetchedReceiver] = useState([]);
  const [editedOrder, setEditedOrder] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemEdit, setItemEdit] = useState(-1); //change item content status to avaliable editing

  // Function to fetch unallocated data from MongoDB
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/DispatchPage/FetchUnallocatedOrder`
      );
      const unallocatedData = response.data;

      // Fetch sender and receiver data
      const senderResponse = await axios.get(
        `${BASE_URL}/DispatchPage/FetchAllSenders`
      );
      const receiverResponse = await axios.get(
        `${BASE_URL}/CustomerManagementPage/GetAllCustomers`
      );

      const senderData = senderResponse.data;
      const receiverData = receiverResponse.data;

      // Map sender and receiver IDs to names
      const updatedOrders = unallocatedData.map((order) => {
        const sender = senderData.find((sender) => sender._id === order.sender);
        const receiver = receiverData.find(
          (receiver) => receiver._id === order.customer
        );

        return {
          ...order,
          sender: sender ? sender.name : "",
          customer: receiver ? receiver.companyName : "",
          Address: receiver ? receiver.address : "",
          PhoneNumber: receiver ? receiver.contactMobile : "",
        };
      });

      setUnallocatedOrders(updatedOrders);
      setFetchedSender(senderData);
      setFetchedReceiver(receiverData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //allocating all orders
  const handleAllocate = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/DispatchPage/AllocatingOrder`
      );
      // console.log("Allocated orders:", response.data);
    } catch (error) {
      console.log("Error allocating orders:", error.message);
    }
  };

  //delete order
  const handleDelete = (orderNum) => {
    console.log("delete selected order: ", orderNum);
  };

  //close the pop window
  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  //click the eidt button: showing edit pop window
  const handleEdit = (orderNumber) => {
    const order = unallocatedOrders.find(
      (order) => order.orderNumber === orderNumber
    );
    setEditedOrder(order);
    setShowEditModal(true);
    console.log("edited order:", order);
  };

  //changed content
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  //save changed order
  const handleSaveChanges = () => {
    // Code to save the edited order goes here
    // console.log("Edited Order:", editedOrder);
    handleCloseModal();
  };

  // recording whether require fridge or not
  const needFridgeChange = (event) => {
    const target = event.target;
    const value =
      target.type === "radio" ? target.value === "true" : target.value;
    const name = target.name;
    setEditedOrder({
      ...editedOrder,
      [name]: value,
    });
  };
  //click item edit button
  const handleItemEdit = (index) => {
    setItemEdit(index);
    console.log("isediting : ", itemEdit);
  };
  // delete item
  const handleItemDelete = () => {
    console.log("delete item:");
  };
  //save item change
  const handleItemConfirm = () => {
    console.log("confirm change");
  };
  // change item content
  const handleItemChange = (e, ind) => {
    const newItems = [...editedOrder.items];
    newItems[ind].itemName = e.target.value;
    console.log("changed item item:", newItems[ind].itemName);
  };
  return (
    <div className="unallocated">
      <div className="container">
        <h3>Unallocated Orders</h3>
        <div className="order-buttons">
          <Button
            variant="warning"
            onClick={() => {
              navigate("/addOrder");
            }}
          >
            Add Order
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/batchOrder");
            }}
          >
            Upload Orders
          </Button>
        </div>
        <div>
          <div
            style={{
              margin: "1.5rem auto",
              overflowY: "scroll",
              maxHeight: "1500px",
            }}
          >
            <Table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Sender</th>
                  <th>Revicer</th>
                  <th>Requirement</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {unallocatedOrders.length > 0 ? (
                  unallocatedOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="column-wrap">{order.orderNumber}</td>
                      <td className="column-wrap">{order.sender}</td>
                      <td className="column-wrap">{order.customer}</td>
                      <td className="column-wrap">{order.remark}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(order.orderNumber)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(order.orderNumber)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No unallocated orders found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <Button variant="success" onClick={handleAllocate}>
          Allocate Orders
        </Button>
      </div>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedOrder && (
            <Form>
              <Row>
                <Col md={5}>
                  <Form.Group controlId="senderName">
                    <Form.Label>Sender Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="senderName"
                      defaultValue={editedOrder.sender}
                      onChange={handleInputChange}
                      list="senderOptions"
                      placeholder="Enter Sender name"
                      required
                    />
                    <datalist id="senderOptions">
                      {fetchedSender.map((sender, index) => (
                        <option key={index} value={sender.name} />
                      ))}
                    </datalist>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="reciverName">
                    <Form.Label>Reciver Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ReciverName"
                      defaultValue={editedOrder.customer}
                      list="receiverOptions"
                      onChange={handleInputChange}
                      placeholder="Enter reciver name"
                      required
                    />
                    <datalist id="receiverOptions">
                      {fetchedReceiver.map((receiver, index) => (
                        <option key={index} value={receiver.companyName} />
                      ))}
                    </datalist>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Group
                    controlId="address"
                    style={{ margin: "1.5rem auto" }}
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="address"
                      name="Address"
                      defaultValue={editedOrder.Address}
                      placeholder="Enter address"
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="phoneNumber"
                    style={{ margin: "1.5rem auto" }}
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="PhoneNumber"
                      defaultValue={editedOrder.PhoneNumber}
                      placeholder="Enter phone number"
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={5}>
                  <Form.Group controlId="deliverdate">
                    <Form.Label>Deliver Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      name="DeliverDate"
                      defaultValue={
                        editedOrder.prefferedDeliveryDate
                          ? editedOrder.prefferedDeliveryDate.slice(0, -5)
                          : ""
                      }
                      onChange={handleInputChange}
                      min={new Date().toISOString().slice(0, -8)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    controlId="fridge"
                    style={{ margin: "2.3rem auto" }}
                  >
                    <Form.Label>Require Fridge: </Form.Label>
                    <Form.Check
                      style={{ marginLeft: "10px" }}
                      inline
                      label="Yes"
                      type="radio"
                      name="need_fridge"
                      value={true}
                      checked={editedOrder.need_fridge === true}
                      onChange={needFridgeChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      name="need_fridge"
                      value={false}
                      checked={editedOrder.need_fridge === false}
                      onChange={needFridgeChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="requirement">
                    <Form.Label>Special Requirement</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="Requirement"
                      defaultValue={editedOrder.remark}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Enter special requirement"
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* {items} */}
              <Row>
                <Col>
                  <div
                    style={{
                      margin: "1.5rem auto",
                      overflowY: "scroll",
                      maxHeight: "150px",
                    }}
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>UOM</th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editedOrder.items.map((editItem, ind) => (
                          <tr key={ind}>
                            <td>
                              {itemEdit === ind ? (
                                <FormControl
                                  defaultValue={editItem.itemName}
                                  onChange={(e) => handleItemChange(e, ind)}
                                />
                              ) : (
                                editItem.itemName
                              )}
                            </td>
                            <td>
                              {itemEdit === ind ? (
                                <FormControl
                                  defaultValue={editItem.uom}
                                  onChange={(e) => handleItemChange(e, ind)}
                                />
                              ) : (
                                editItem.uom
                              )}
                            </td>
                            <td>
                              {itemEdit === ind ? (
                                <FormControl
                                  defaultValue={editItem.qty}
                                  onChange={(e) => handleItemChange(e, ind)}
                                />
                              ) : (
                                editItem.qty
                              )}
                            </td>
                            <td>
                              {itemEdit === ind ? (
                                <>
                                  <Button
                                    variant="success"
                                    onClick={handleItemConfirm}
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    variant="warning"
                                    onClick={() => setItemEdit(-1)}
                                  >
                                    Cancel
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleItemEdit(ind)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleItemDelete(ind)}
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
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UnallocatedOrders;
