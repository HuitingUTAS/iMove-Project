import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UnallocatedOrders(orders) {
  const navigate = useNavigate();
  const [unallocatedOrders, setUnallocatedOrders] = useState([]);
  useEffect(() => {
    const ordersArray = Object.values(orders);
    setUnallocatedOrders(ordersArray);
    console.log("unallocatedOrders", unallocatedOrders);
  }, [orders]);
  const handleAllocate = () => {};
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
        <Table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Sender</th>
              <th>Revicer</th>
              <th>Requirement</th>
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
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
        <Button variant="success" onClick={handleAllocate}>
          Allocate Orders
        </Button>
      </div>
    </div>
  );
}

export default UnallocatedOrders;
