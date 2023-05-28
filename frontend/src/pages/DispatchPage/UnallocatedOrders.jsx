import React from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UnallocatedOrders({ orders, handleAllocate }) {
  const navigate = useNavigate();
  return (
    <div className="unallocated">
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
      <Table title="Unlocated">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Sender</th>
            <th>Revicer</th>
            <th>Requirement</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
      <Button variant="success" onClick={handleAllocate}>
        Allocate Orders
      </Button>
    </div>
  );
}

export default UnallocatedOrders;
