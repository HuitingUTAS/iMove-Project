import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col, Table, Dropdown } from "react-bootstrap";
import "./Dispatch.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../config";

function AddOrder() {
  const nagivation = new useNavigate();
  const [items, setItems] = useState([]); //the whole inserted item array
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: "order123",
    sender: "",
    customer: "",
    remark: "",
    need_fridge: "",
    prefferedDeliveryDate: "",
    OrderStatus: "1", //unallocated
    items: [],
  });

  //new added item to item array
  const [newItem, setNewItem] = useState({
    itemName: "",
    uom: "",
    qty: "0",
  });
  const [fetchedReceiver, setFetchedReceiver] = useState([]);
  const [receiverInput, setReceiverInput] = useState("");

  const [selectedAddress, setselectedAddress] = useState("");
  const [selectedPhone, setselectedPhone] = useState("");

  const [fetchedItem, setFetchedItem] = useState([]); //fetched all item data
  const [selectedItem, setSelectedItem] = useState(""); //selected item data from item name list
  const [selectedUOM, setSelectedUOM] = useState(""); //selected UOM based on item

  const itemNameRef = useRef(null);
  const uomRef = useRef(null);
  const qtyRef = useRef(null);

  // loding data
  useEffect(() => {
    fetchReceiverData();
    fetchItemData();
  }, []);

  // get all avaliable sender from MangoDB
  const fetchReceiverData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/CustomerManagementPage/GetAllCustomers`
      );
      setFetchedReceiver(response.data);
      // console.log(fetchedReceiver);
    } catch (error) {
      console.log("Error fetching receiver data:", error.message);
    }
  };

  // get all avaliable items infromation
  const fetchItemData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/ItemManagementPage/GetAllItems`
      );
      setFetchedItem(response.data);
      console.log("item fetching result:", fetchedItem);
    } catch (error) {
      console.log("Error fetching item data:", error);
    }
  };
  //add items
  const handleAddItem = () => {
    console.log("this is single new item:", newItem);
    if (newItem.itemName && newItem.uom && newItem.qty > 0) {
      //insert added items to the order detail
      setItems((prevItems) => [...prevItems, newItem]);
      setOrderDetails((prevOrderDetails) => ({
        ...prevOrderDetails,
        items: [...prevOrderDetails.items, newItem], // Update the items array
      }));
      // Reset the newItem state to clear input fields
      setNewItem({
        itemName: "",
        uom: "",
        qty: "0",
      });
      // Clear input fields using refs
      setSelectedUOM("");
      itemNameRef.current.value = "";
      uomRef.current.value = "";
      qtyRef.current.value = "0";
    } else {
      alert("Please fill in all item details before adding.");
    }
  };

  // recording whether require fridge or not
  const handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "radio" ? target.value === "true" : target.value;
    const name = target.name;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };
  // Predictive selecting receiver name and address from database when it changed
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "customer") {
      setReceiverInput(value); // Track user input
      filterReceiver(value); // Filter receiver list based on user input
      //get the selected customer information to achive customer ID
      const selectedCustomer = fetchedReceiver.find(
        (receiver) => receiver.companyName === value
      );
      // console.log("selected Customer:", selectedCustomer);
      if (selectedCustomer) {
        setOrderDetails((prevState) => ({
          ...prevState,
          [name]: selectedCustomer._id, // Store customer's ID
        }));
      }
    } else {
      setOrderDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.log("this is for checking order details:", orderDetails);
  };

  const filterReceiver = (input) => {
    if (input) {
      const filteredReceivers = fetchedReceiver.filter((receiver) =>
        receiver.companyName.toLowerCase().includes(input.toLowerCase())
      );
      if (filteredReceivers.length > 0) {
        setselectedAddress(filteredReceivers[0].address);
        setselectedPhone(filteredReceivers[0].contactMobile);
      } else {
        // Handle case when no matching receiver is found
        setselectedAddress("");
        setselectedPhone("");
      }
    } else {
      // Handle case when input is empty
      setselectedAddress("");
      setselectedPhone("");
    }
  };

  //Filtering items
  const filterItems = (input) => {
    if (typeof input === "string" && input.length > 0) {
      // console.log("item babababa:", input.toLowerCase());
      const filteredItems = fetchedItem.filter((item) =>
        item.itemName.toLowerCase().includes(input.toLowerCase())
      );
      if (filteredItems.length > 0) {
        setSelectedUOM(filteredItems[0].uom);
      } else {
        alert("There isn't this item, please select another item!");
        setSelectedItem("");
        setSelectedUOM("");
      }
    } else {
      // Handle case when input is empty
      setSelectedItem("");
      setSelectedUOM("");
    }
  };

  //Predictive selecting item name when it changed
  const handleItemChange = (event) => {
    const value = event.target.value;
    console.log("selected item Name:", event.target);
    setSelectedItem(value);
    filterItems(value); // Filter item list based on content
    // Get the selected item based on its name
    const selectedItem = fetchedItem.find((item) => item.itemName === value);
    if (selectedItem) {
      setNewItem({
        itemName: value,
        uom: selectedItem.uom, // Set the uom based on the selected item
        qty: "", // Keep the previous quantity value
      });
    }
  };

  //add order
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Code to submit form data goes here
    console.log("order details:", orderDetails);
    console.log("order details type:", orderDetails.type);

    try {
      const response = await axios.post(
        `${BASE_URL}/DispatchPage/InsertingOrder`,
        orderDetails
      );

      if (response.status === 200) {
        // Reset state variables to empty values
        setOrderDetails({
          OrderID: "",
          sender: "",
          customer: "",
          remark: "",
          need_fridge: "",
          prefferedDeliveryDate: "",
          OrderStatus: "1",
          items: [],
        });
        setItems([]);
        setNewItem({
          itemName: "",
          uom: "",
          qty: "0",
        });

        // Clear input fields using refs
        itemNameRef.current.value = "";
        uomRef.current.value = "";
        qtyRef.current.value = "0";
      } else {
        console.log("Error response:", response.data);
      }
    } catch (error) {
      alert("Cannot adding order, please contact to system administrator!");
      console.log("Error adding order:", error);
    }
  };

  return (
    <div className="add">
      <h2>Add Order</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={5}>
            <Form.Group controlId="senderName">
              <Form.Label>Sender Name</Form.Label>
              <Form.Control
                type="text"
                name="sender"
                value={orderDetails.sender}
                onChange={handleChange}
                placeholder="Enter sender name"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="receiver">
              <Form.Label>Receiver</Form.Label>
              <Form.Control
                type="text"
                list="receiverOptions"
                name="customer"
                value={receiverInput}
                onChange={handleChange}
                placeholder="Enter receiver name"
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
            <Form.Group controlId="address" style={{ margin: "1.5rem auto" }}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="address"
                name="Address"
                value={selectedAddress}
                placeholder="Enter address"
                disabled
                required
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
                value={selectedPhone}
                placeholder="Enter phone number"
                disabled
                required
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
                name="prefferedDeliveryDate"
                value={orderDetails.prefferedDeliveryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="fridge" style={{ margin: "2.3rem auto" }}>
              <Form.Label>Require Fridge: </Form.Label>
              <Form.Check
                style={{ marginLeft: "10px" }}
                inline
                label="Yes"
                type="radio"
                name="need_fridge"
                value={true}
                checked={orderDetails.need_fridge === true}
                onChange={handleInputChange}
              />
              <Form.Check
                inline
                label="No"
                type="radio"
                name="need_fridge"
                value={false}
                checked={orderDetails.need_fridge === false}
                onChange={handleInputChange}
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
                name="remark"
                value={orderDetails.remark}
                onChange={handleChange}
                rows={2}
                placeholder="Enter special requirement"
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="addItem">
          <h2>Insert Item</h2>
          <hr />
          <Row>
            <Col>
              <Form.Group controlId="itemName">
                <Form.Label>Item</Form.Label>
                <Form.Control
                  type="text"
                  list="itemOptions"
                  name="itemName"
                  // value={selectedItem}
                  onChange={handleItemChange}
                  ref={itemNameRef}
                  placeholder="Enter item name"
                />
                <datalist id="itemOptions">
                  {fetchedItem.map((item, index) => (
                    <option key={index} value={item.itemName} />
                  ))}
                </datalist>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="itemUOM">
                <Form.Label>UOM</Form.Label>
                <Form.Control
                  type="text"
                  name="uom"
                  ref={uomRef}
                  value={selectedUOM}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      uom: e.target.value,
                    })
                  }
                  placeholder="Enter unit of item"
                  disabled
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="itemQuantity">
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  ref={qtyRef}
                  // value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      qty: e.target.value,
                    })
                  }
                  placeholder="Enter item quantity"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="warning"
                onClick={handleAddItem}
                style={{ textAlign: "right" }}
              >
                Add Item
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{
                  margin: "1.5rem auto",
                  overflowY: "scroll",
                  maxHeight: "500px",
                }}
              >
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>UOM</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.itemName}</td>
                        <td>{item.uom}</td>
                        <td>{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md={10} style={{ margin: "1rem auto" }}>
            <Button variant="success" type="submit">
              Add Order
            </Button>
          </Col>
          <Col style={{ right: true, margin: "1rem auto" }}>
            <Button
              variant="secondary"
              onClick={() => {
                nagivation("/dispatch");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddOrder;
