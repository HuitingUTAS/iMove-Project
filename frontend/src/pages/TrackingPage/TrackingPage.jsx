import React, { useState, useEffect, useRef } from "react";
import { Dropdown, Table, Modal, Button, Container } from "react-bootstrap";
import { GoogleMap, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";
// import useCars from "./getCars";
// import useOrders from "./getOrders";
// import fetchGeocodes from "./fetchGeocodes";
import { BASE_URL } from "../../../config";
const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places"];
function TrackingPage() {
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [geocodes, setGeocodes] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCNrvo40mebXB_2dB1G-pzEATUil7mLraY",
    libraries,
  });

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/TrackingPage/GetCars`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCars(data);
        } else {
          console.log("Failed to fetch car data");
        }
      } catch (error) {
        console.log("Error occurred while fetching car data:", error);
      }
    };

    getCars();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/TrackingPage/GetOrders/${selectedCar._id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders([data]);
        } else {
          console.log("Failed to fetch order data");
        }
      } catch (error) {
        console.log("Error occurred while fetching order data:", error);
      }
    };

    if (selectedCar) {
      getOrders();
    }
  }, [selectedCar]);

  // useEffect(() => {
  //   console.log("Updated Orders:", orders);
  // }, [orders]);

  useEffect(() => {
    // This code fetches the geocode for each address in the orders
    const fetchGeocodes = async () => {
      const newOrders = await Promise.all(
        orders.map(async (order) => {
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
          title: `This is order: ${order._id}`,
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
  console.log("update", orders);
  return (
    <Container fluid>
      <h2 className="mt-5 pt-5">This is the Tracking Page</h2>
      <Dropdown
        onSelect={(selectedCarId) => {
          const selectedCar = cars.find((car) => car._id === selectedCarId);
          console.log("Selected Car:", selectedCar);
          setSelectedCar(selectedCar);
        }}
      >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCar ? selectedCar.registrationNumber : "Select a car"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {cars.map((car) => (
            <Dropdown.Item key={car._id} eventKey={car._id}>
              {car.registrationNumber}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {selectedCar && (
        <div>
          <h2>
            {selectedCar.registrationNumber} - Driver Name{" "}
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
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderDetails(true);
                    }}
                  >
                    <td>{order.orderNumber}</td>
                    <td>
                      {order.shipmentStatus.map((status) => `${status.status}`)}
                    </td>
                    <td>
                      Start Time：
                      <br />
                      End Time：
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No orders available</td>
                </tr>
              )}
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
                <b>Order ID:</b> {selectedOrder._id}
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
