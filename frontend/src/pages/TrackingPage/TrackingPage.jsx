import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Table, Modal, Button, Container } from "react-bootstrap";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { FaMapMarkedAlt } from "react-icons/fa";
import "./Tracking.css";
const containerStyle = {
  width: "400px",
  height: "400px",
};
const center = {
  lat: -3.745,
  lng: -38.523,
};
const cars = ["Car 1", "Car 2", "Car 3", "Car 4"];
const orders = [
  {
    id: "Order 1",
    address: "Address 1",
    items: ["Item 1", "Item 2"],
    parcelNumber: "Parcel 1",
  },
];
function TrackingPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [center, setCenter] = useState(null);
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const controlDiv = document.createElement("div");
    controlDiv.style.backgroundColor = "#fff";
    controlDiv.style.border = "2px solid #fff";
    controlDiv.style.borderRadius = "3px";
    controlDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlDiv.style.cursor = "pointer";
    controlDiv.style.marginBottom = "22px";
    controlDiv.style.textAlign = "center";
    controlDiv.title = "Click to recenter the map";

    const controlIcon = document.createElement("div");
    controlIcon.style.margin = "10px";
    controlIcon.style.width = "20px";
    controlIcon.style.height = "20px";
    controlIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.852 10.055 5 9 5c-3.18 0-6 2.686-6 6 0 1.657.684 3.15 1.778 4.22l.582.59.582-.6A7.947 7.947 0 019 13c.88 0 1.72-.156 2.5-.45m0 0C13.168 12.148 13.945 12 15 12c3.18 0 6-2.686 6-6 0-1.657-.684-3.15-1.778-4.22l-.582-.59-.582.6A7.947 7.947 0 0015 6c-.88 0-1.72.156-2.5.45"></path></svg>';

    controlDiv.appendChild(controlIcon);
    controlDiv.addEventListener("click", () => {
      mapRef.current.panTo(center);
    });

    mapRef.current.controls[
      window.google.maps.ControlPosition.RIGHT_BOTTOM
    ].push(controlDiv);

    return () => {
      const controlPosition =
        mapRef.current.controls[
          window.google.maps.ControlPosition.RIGHT_BOTTOM
        ];
      for (let i = 0; i < controlPosition.length; i++) {
        if (controlPosition.getAt(i) === controlDiv) {
          controlPosition.removeAt(i);
          break;
        }
      }
    };
  }, [center, mapLoaded]);
  return (
    <Container fluid>
      <h2 className="mt-5 pt-5">This is the Tracking Page</h2>
      <Dropdown onSelect={(key) => setSelectedCar(cars[key])}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCar || "Select a car"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {cars.map((car, index) => (
            <Dropdown.Item key={index} eventKey={index}>
              {car}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedCar && (
        <div>
          <h2>
            {selectedCar} - Driver Name{" "}
            <FaMapMarkedAlt onClick={() => setShowMap(!showMap)} size={32} />
          </h2>

          <div style={{ display: showMap ? "block" : "none" }}>
            <LoadScript googleMapsApiKey="AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={(map) => {
                  mapRef.current = map;
                  setMapLoaded(true);
                }}
              >
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowOrderDetails(true);
                  }}
                >
                  <td>{order.id}</td>
                  <td>In progress</td>
                  <td>
                    Start Time： <br></br>End Time：
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showOrderDetails} onHide={() => setShowOrderDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              <p>
                <b>Order ID:</b> {selectedOrder.id}
              </p>
              <p>
                <b>Address:</b> {selectedOrder.address}
              </p>
              <p>
                <b>Items:</b> {selectedOrder.items.join(", ")}
              </p>
              <p>
                <b>Parcel Number:</b> {selectedOrder.parcelNumber}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowOrderDetails(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TrackingPage;
