import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UnallocatedOrders from "./UnallocatedOrders";
import AllocatedOrders from "./AllocatedOrders";
import "./Dispatch.css";
import axios from "axios";
import { BASE_URL } from "../../../config";

function DispatchPage() {
  const [unallocatedOrders, setUnallocatedOrders] = useState([]);
  const [allocatedOrders, setAllocatedOrders] = useState([]);

  //fetch unallocated data from mangoDB

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/DispatchPage/FetchUnallocatedOrder`
        );
        setUnallocatedOrders(response.data);
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
          <AllocatedOrders />
        </div>
      </div>
    </div>
  );
}
export default DispatchPage;
