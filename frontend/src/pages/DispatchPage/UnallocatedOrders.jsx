import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UnallocatedOrders({
  orders,
  handleUpload,
  handleAllocate,
  handleAdd,
}) {
  const navigate = useNavigate();
  return (
    <div className="unallocated">
      <h3>Unallocated Orders</h3>
      {orders.map((order) => (
        <div key={order.id} className="order">
          <p>Order ID: {order.id}</p>
          <p>Customer: {order.customer}</p>
          <p>Items: {order.items}</p>
          <p>Price: {order.price}</p>
        </div>
      ))}
      <div className="order-buttons">
        <Button
          variant="warning"
          onClick={() => {
            navigate("/addOrder");
          }}
        >
          Add Order
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Upload Orders
        </Button>
        <Button variant="success" onClick={handleAllocate}>
          Allocate Orders
        </Button>
      </div>
    </div>
  );
}

export default UnallocatedOrders;
