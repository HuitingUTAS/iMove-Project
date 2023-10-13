import "./Driver.css";
import React, { useState, useRef, useEffect } from "react";
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
function DriverPage() {
  const [orders, setOrders] = useState([]);
  const [driverID, setDriverID] = useState("");
  const [driverName, setDriverName] = useState("");
  const [selectedOrder, setSelectedOrder] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("Allocated");

  const [orderData, setOrderData] = useState(null); // Store the received order data

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    console.log("User:", user);
    console.log("Role:", role);
    if (user && user.name) {
      setDriverID(user._id);
      setDriverName(user.name);
    }
  }, []);

  useEffect(() => {
    if (driverID) {
      fetchOrderData();
    }
  }, [driverID]);
  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/DriverPage/GetOrders/${driverID}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("test 1", data);
        setOrders(data);
      } else {
        console.log("Error response:", response.status);
      }
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };
  const updateStatus = async () => {
    const currentDateTime = new Date().toISOString(); // get current date-time in ISO format

    if (selectedStatus === "In Progress") {
      setStartTime(currentDateTime);
      console.log("start time: ", currentDateTime);
    } else if (selectedStatus === "Completed") {
      setCompletionTime(currentDateTime);
      console.log("end time: ", currentDateTime);
    }
    try {
      const response = await fetch(`${BASE_URL}/DriverPage/UpdateStatus`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedOrder._id,
          shipmentStatus: selectedStatus,
        }),
      });

      if (response.ok) {
        console.log("Status updated successfully");
      } else {
        console.log("Error updating status:", response.status);
      }
      console.log(
        "current status: ",
        selectedOrder.orderStatus?.map((mystatus) => {
          mystatus.status;
        })
      );
      // if (startTime && completionTime) {
      //   const timeResponse = await fetch(
      //     `${BASE_URL}/DriverPage/AddTime/${selectedOrder._id}`,
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         _id: selectedOrder._id,
      //         startTime: startTime,
      //         endTime: completionTime,
      //       }),
      //     }
      //   );

      //   if (!timeResponse.ok) {
      //     console.log("Error uploading time:", timeResponse.status);
      //   }
      // }
      //   if (fileInputRef) {
      //     const fileResponse = await fetch(
      //       `${BASE_URL}/DriverPage/UploadFile/${selectedOrder._id}`,
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           _id: selectedOrder._id,
      //           file: fileInputRef,
      //         }),
      //       }
      //     );

      //     if (!fileResponse.ok) {
      //       console.log("Error uploading file:", fileResponse.status);
      //     }
      //   }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  const handleSelect = (number) => {
    setSelectedStatus(number);
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };
  return (
    <div className="drivertest">
      <strong>Welcome {driverName}</strong>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 1 }}>
          <Dropdown
            onSelect={(selectedKey) => setSelectedOrder(orders[selectedKey])}
          >
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {selectedOrder ? selectedOrder.orderNumber : "Select Order"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {orders.map((order, index) => (
                <Dropdown.Item key={index} eventKey={index}>
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
            <Card.Header>
              {selectedOrder ? selectedOrder.orderNumber : "Order Details"}
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <strong>Order number: </strong>
                {/* {selectedOrder.orderNumber} */}
                <div>{selectedOrder.orderNumber}</div>
              </div>

              <div className="mb-3">
                <strong>Recevier name:</strong>
                {selectedOrder.customer?.firstName}
              </div>
              <div className="mb-3">
                <strong>Address: </strong>
                <div>{selectedOrder.customer?.address}</div>
                {/* {selectedOrder.customer.address} */}
              </div>
              <div className="mb-3">
                <strong>Parcel number: </strong>
                {selectedOrder.parcelQty}
              </div>
              <div className="mb-3" style={{ display: "flex" }}>
                <div>
                  <strong>Items:</strong>{" "}
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
                  {selectedOrder.items?.map((item, index) => (
                    <div key={index}>
                      itemName: {item.itemName} <br />
                      quantity: {item.quantity}
                    </div>
                  ))}
                </div>
              </div>

              <Dropdown className="mb-3">
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-basic"
                >
                  {selectedStatus}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleSelect("allocated")}>
                    Allocated
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("In Progress")}>
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSelect("Completed")}>
                    Completed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <Row
        className="justify-content-end"
        style={{ position: "fixed", bottom: "100px", right: "50px" }}
      >
        <Button variant="success" onClick={handleButtonClick}>
          upload
        </Button>
        <Button variant="success" className="mt-3" onClick={updateStatus}>
          confirm
        </Button>
      </Row>
    </div>
  );
}
export default DriverPage;
