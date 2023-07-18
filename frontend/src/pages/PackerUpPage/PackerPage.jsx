import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { BASE_URL } from "../../../config";

function PackerPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState("Select");
  const [packerName, setPackerName] = useState("");
  const handleSelect = (number) => {
    setSelectedNumber(number);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/DispatchPage/FetchAllocatedOrder`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders(data);
        } else {
          console.log("Error response:", response.status);
        }
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    console.log("User:", user);
    console.log("Role:", role);
    if (user && user.name) {
      setPackerName(user.name);
    }
    // 清除用户信息
    // localStorage.removeItem("user");
    // localStorage.removeItem("role");
  }, []);
  const handleOrderSelect = (order) => {
    const selectedOrder = orders.find((o) => o._id === order);
    setSelectedOrder(selectedOrder);
  };
  const handleConfirm = async (_id) => {
    const selectOrder = orders.find((order) => order._id === _id);
    try {
      const response = await fetch(`${BASE_URL}/PackerPage/UpdateParcel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectOrder._id,
          parcelQty: selectedNumber,
        }),
      });

      if (response.ok) {
        console.log("Order confirmed successfully");
      } else {
        console.log("Failed to confirm order");
        // 执行失败后的操作
      }
    } catch (error) {
      console.log("Error occurred while confirming order:", error);
    }
  };
  return (
    <Container fluid style={{ width: "100vw", padding: "100px" }}>
      <h1>Packer page</h1>
      <h2>Packer name: {packerName}</h2>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 1 }}>
          <Dropdown onSelect={handleOrderSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedOrder ? selectedOrder.orderNumber : "Select an order"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {orders.map((order) => (
                <Dropdown.Item
                  key={order._id}
                  eventKey={order._id}
                  active={selectedOrder && selectedOrder._id === order._id}
                >
                  {order.orderNumber}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="mb-4 h-100">
            <Card.Body>
              {selectedOrder && (
                <>
                  <div className="mb-3">
                    <strong>Order ID: {selectedOrder.orderNumber}</strong>
                  </div>
                  <div className="mb-3" style={{ display: "flex" }}>
                    <div>
                      <strong>Details:</strong>
                    </div>
                    <div
                      className="mb-3"
                      style={{
                        marginLeft: "10px",
                        flexGrow: 1,
                        overflowY: "scroll",
                        maxHeight: "200px",
                        border: "1px solid #ccc",
                        padding: "10px",
                      }}
                    >
                      <strong>sender: {selectedOrder.sender}</strong>
                      <br />
                      <strong>Items:</strong>
                      <ul>
                        {selectedOrder.items.map((item, index) => (
                          <li key={index}>
                            itemName: {item.itemName} <br />
                            quantity: {item.quantity}
                          </li>
                        ))}
                      </ul>
                      <strong>total amount: {selectedOrder.totalAmount}</strong>
                      <br />
                      <strong>need fridge: {selectedOrder.need_fridge}</strong>
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Date: {selectedOrder.createDate}</strong>
                  </div>
                  <div className="mb-3">
                    <strong>Parcel Needed:</strong>
                  </div>
                  <Dropdown className="mb-3">
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                    >
                      {selectedNumber}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleSelect("1")}>
                        1
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSelect("2")}>
                        2
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleSelect("3")}>
                        3
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Other number"
                            aria-label="Other number"
                            aria-describedby="basic-addon2"
                            onBlur={(e) => handleSelect(e.target.value)}
                          />
                        </InputGroup>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row
        className="justify-content-end"
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
      >
        {selectedOrder && (
          <Button
            variant="success"
            onClick={() => handleConfirm(selectedOrder._id)}
          >
            Confirm
          </Button>
        )}
      </Row>
    </Container>
  );
}

export default PackerPage;
