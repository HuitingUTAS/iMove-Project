import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UnallocatedOrders from "./UnallocatedOrders";
import AllocatedOrders from "./AllocatedOrders";
import "./Dispatch.css";
import axios from "axios";

function DispatchPage() {
  const [unallocatedOrders, setUnallocatedOrders] = useState([]);
  const [allocatedOrders, setAllocatedOrders] = useState([]);

  //fetch unallocated data from mangoDB

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/order/SOF003101"
        );
        setUnallocatedOrders(response.data);
        // console.log("useEffect unallocatedOrders", response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // function to handle exporting allocated orders
  const handleExportAllocatedOrders = () => {
    // implement export logic here
    console.log("Exporting allocated orders:", allocatedOrders);
  };

  return (
    <div className="dispatchtest">
      <h1>Order Allocation</h1>
      <div className="row">
        <div className="col-md-6">
          <UnallocatedOrders orders={unallocatedOrders} />
        </div>
        <div className="col-md-6">
          <AllocatedOrders
            orders={allocatedOrders}
            onExportAllocatedOrders={handleExportAllocatedOrders}
          />
        </div>
      </div>
    </div>
  );
}
export default DispatchPage;
