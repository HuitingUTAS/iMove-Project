import React, { useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Dispatch.css";

function BatchOrder() {
  const nagivation = useNavigate();
  const [items, setItems] = useState([]);
  const fileInputRef = useRef();
  const BatchAdd = () => {};
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        // Check if the Qty column is not null
        const validData = data.filter((item) => item.Qty > 0);

        if (validData.length > 0) {
          resolve(validData);
        } else {
          reject("No valid data found");
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise
      .then((d) => {
        //  console.log(d);
        setItems(d);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="add">
      <h3>Unallocated Orders</h3>
      <div className="order-buttons">
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".xlsx"
          onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
          }}
        />
        <Button variant="primary" onClick={handleUpload}>
          Import File
        </Button>
        <Button variant="success" onClick={BatchAdd}>
          Add
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            nagivation("/dispatch");
          }}
        >
          Cancel
        </Button>
      </div>
      <div style={{ flexGrow: 1, overflowY: "scroll", maxHeight: "500px" }}>
        <Table className="table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer</th>
              <th>Item Name</th>
              <th>UOM</th>
              <th>Qty</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item["SO #"]}</td>
                <td>{item["Customer"]}</td>
                <td>{item["Item Name"]}</td>
                <td>{item["UOM"]}</td>
                <td>{item["Qty"]}</td>
                <td>{item["Remarks"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BatchOrder;
