import React from "react";
import { Button, Table } from "react-bootstrap";
import "./Dispatch.css";

const AllocatedOrders = ({ orders, handleExport }) => {
  return (
    <div className="allocated">
      <h3>Allocated Orders</h3>
      <div className="allocatedOrder">
        <Table title="Unlocated">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Sender</th>
              <th>Revicer</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order) => (
              <div key={"123"} className="order">
                <p>Order ID: {123}</p>
                <p>Customer: {"Pixsal"}</p>
                <p>Items: {"jiangyou *5 , jiaozi *10"}</p>
                <p>Price: {"70.5"}</p>
              </div>
            ))} */}
          </tbody>
        </Table>
        <Button variant="primary" onClick={handleExport}>
          Export Orders
        </Button>
      </div>
    </div>
  );
};

export default AllocatedOrders;
