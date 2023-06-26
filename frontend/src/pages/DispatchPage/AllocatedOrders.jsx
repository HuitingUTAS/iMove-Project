import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./Dispatch.css";
import axios from "axios";
import { BASE_URL } from "../../../config";

const AllocatedOrders = () => {
  const [allocatedOrders, setAllocatedOrders] = useState([]);
  //fetch allocated data from mangoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/DispatchPage/FetchAllocatedOrder`
        );
        setAllocatedOrders(response.data);
        console.log(allocatedOrders);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //Exporting all allocated data
  const handleExport = () => {
    const handleExport = () => {
      // Create a data string to hold the exported data
      let dataString = "";

      // Add headers to the data string
      const headers = ["Order ID", "Sender", "Receiver", "Requirement"];
      dataString += headers.join(",") + "\n";

      // Add rows to the data string
      allocatedOrders.forEach((order) => {
        const row = [
          order.orderNumber,
          order.sender,
          order.customer,
          order.remark,
        ];
        dataString += row.join(",") + "\n";
      });

      // Create a Blob with the data string
      const blob = new Blob([dataString], { type: "text/csv;charset=utf-8;" });

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "allocated_orders.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
  };

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
            {allocatedOrders.length > 0
              ? allocatedOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="column-wrap">{order.orderNumber}</td>
                    <td className="column-wrap">{order.sender}</td>
                    <td className="column-wrap">{order.customer}</td>
                    <td className="column-wrap">{order.remark}</td>
                  </tr>
                ))
              : null}
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
