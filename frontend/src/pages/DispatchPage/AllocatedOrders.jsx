import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./Dispatch.css";
import axios from "axios";
import { BASE_URL } from "../../../config";
import * as XLSX from "xlsx";

const AllocatedOrders = () => {
  const [allocatedOrders, setAllocatedOrders] = useState([]);
  const [fetchedSender, setFetchedSender] = useState([]);
  const [fetchedReceiver, setFetchedReceiver] = useState([]);
  //fetch allocated data from mangoDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/DispatchPage/FetchAllocatedOrder`
        );
        const allocatedData = response.data;
        // Fetch sender and receiver data
        const senderResponse = await axios.get(
          `${BASE_URL}/DispatchPage/FetchAllSenders`
        );
        const receiverResponse = await axios.get(
          `${BASE_URL}/CustomerManagementPage/GetAllCustomers`
        );

        const senderData = senderResponse.data;
        const receiverData = receiverResponse.data;

        // Map sender and receiver IDs to names
        const updatedOrders = allocatedData.map((order) => {
          const sender = senderData.find(
            (sender) => sender._id === order.sender
          );
          const receiver = receiverData.find(
            (receiver) => receiver._id === order.customer
          );

          // Format the preferred delivery date
          const formattedDeliveryDate = new Date(
            order.prefferedDeliveryDate
          ).toLocaleString();

          return {
            ...order,
            sender: sender ? sender.name : "",
            customer: receiver ? receiver.companyName : "",
            prefferedDeliveryDate: formattedDeliveryDate,
          };
        });

        setAllocatedOrders(updatedOrders);
        setFetchedSender(senderData);
        setFetchedReceiver(receiverData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleExport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Create a new worksheet
    const ws = XLSX.utils.aoa_to_sheet([]);
    // Add the headers to the worksheet
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "Order ID",
          "Sender",
          "Receiver",
          "Requirement",
          "Need_Fridge",
          "Preffered Delivery Date",
          "Item Name",
          "UOM",
          "Quantity",
        ],
      ],
      { origin: "A1" }
    );

    // Add rows to the worksheet
    allocatedOrders.forEach((order) => {
      const rows = order.items.map((item) => [
        order.orderNumber,
        order.sender,
        order.customer,
        order.remark,
        order.need_fridge,
        order.prefferedDeliveryDate,
        item.itemName,
        item.uom,
        item.qty,
      ]);

      XLSX.utils.sheet_add_aoa(ws, rows, { origin: -1 });
    });

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Allocated Orders");
    // Create a blob from the workbook with the type "array"
    const blob = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    // Convert the blob to a Blob object
    const blobObject = new Blob([blob], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blobObject);
      link.setAttribute("href", url);
      link.setAttribute("download", "allocated_orders.xlsx");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="allocated">
      <h3>Allocated Orders</h3>
      <div
        className="allocatedOrder"
        style={{
          margin: "1.5rem auto",
          overflowY: "scroll",
          maxHeight: "1500px",
        }}
      >
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
            {allocatedOrders.length > 0 ? (
              allocatedOrders.map((order, index) => (
                <tr key={index}>
                  <td className="column-wrap">{order.orderNumber}</td>
                  <td className="column-wrap">{order.sender}</td>
                  <td className="column-wrap">{order.customer}</td>
                  <td className="column-wrap">{order.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No allocated orders found.</td>
              </tr>
            )}
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
