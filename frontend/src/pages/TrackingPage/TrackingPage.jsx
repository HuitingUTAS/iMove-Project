import React, { useState, useEffect } from "react";
import { Dropdown, Table, Modal, Button, Container } from "react-bootstrap";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};
const cars = ["Car 1", "Car 2", "Car 3", "Car 4"];
const initialOrders = [
  {
    id: "Order 1",
    address: "128 King street, Dynnyrne TAS 7005",
    items: ["Item 1", "Item 2"],
    parcelNumber: "Parcel 1",
  },
  {
    id: "Order 2",
    address: "1 Risdon road, New Town TAS 7008",
    items: ["Item 3", "Item 4"],
    parcelNumber: "Parcel 2",
  },
  {
    id: "Order 3",
    address: "Lower Domain road, Hobart TAS 7000",
    items: ["Item 5", "Item 6"],
    parcelNumber: "Parcel 3",
  },
];
const libraries = ["places"];
function TrackingPage() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [map, setMap] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [orders, setOrders] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY",
    libraries,
  });
  useEffect(() => {
    // This code fetches the geocode for each address in the orders
    const fetchGeocodes = async () => {
      const newOrders = await Promise.all(
        initialOrders.map(async (order) => {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
              order.address
            )}&key=AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY`
          );
          const data = await response.json();

          return {
            ...order,
            location: data.results[0].geometry.location,
          };
        })
      );

      console.log("Geocoded orders:", newOrders);
      newOrders.forEach((order) => {
        console.log(
          `Order: ${order.id}, lat: ${order.location.lat}, lng: ${order.location.lng}`
        );
      });
      setTimeout(() => {
        setOrders(newOrders);
      }, 1000);

      setOrders(newOrders);
      if (newOrders.length > 0) {
        setMapCenter(newOrders[0].location);
      }
    };

    if (isLoaded) {
      fetchGeocodes();
    }
  }, [isLoaded]);
  const handleMarkerClick = (order) => {
    setSelectedOrder(order);
    setInfoWindowPosition(order.location);
    setShowInfoWindow(true);
  };
  useEffect(() => {
    if (map) {
      orders.forEach((order) => {
        const marker = new window.google.maps.Marker({
          position: order.location,
          map,
          title: `This is order: ${order.id}`,
        });

        marker.addListener("click", () => {
          handleMarkerClick(order);
        });
      });
    }
  }, [orders, map]);
  useEffect(() => {
    if (map && isLoaded) {
      const locationButtonDiv = document.createElement("div");
      const locationButton = document.createElement("button");
      locationButton.innerHTML = "<span><FaLocationArrow /></span>";
      locationButtonDiv.appendChild(locationButton);

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              map.panTo(userLatLng);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });

      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        locationButtonDiv
      );
    }
  }, [map, isLoaded]);
  const renderMap = () => {
    if (showMap && isLoaded) {
      return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={13}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          {selectedOrder && showInfoWindow && (
            <InfoWindow
              position={selectedOrder.location}
              onCloseClick={() => setShowInfoWindow(false)}
            >
              <div>{selectedOrder.id}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      );
    } else {
      return <div>No Map Available</div>;
    }
  };
  if (loadError) {
    console.error("Google Maps API load error:", loadError);
    return <div>Error loading Google Maps API</div>;
  }
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
            <span className="map-icon" onClick={() => setShowMap(!showMap)}>
              <Icon icon={locationIcon} />
            </span>
          </h2>

          <div>{renderMap()}</div>

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
