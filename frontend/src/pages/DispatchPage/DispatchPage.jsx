import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UnallocatedOrders from "./UnallocatedOrders";
import AllocatedOrders from "./AllocatedOrders";
import "./Dispatch.css";
import axios from "axios";
import { BASE_URL } from "../../../config";

function DispatchPage() {
  // function to handle exporting allocated orders
  const handleExportAllocatedOrders = () => {
    // implement export logic here
    console.log("Exporting allocated orders:", allocatedOrders);
  };

  return (
    <div className="dispatchtest">
      <h1>Order Allocation</h1>
      <div className="row">
        <div className="col-md-7">
          <UnallocatedOrders />
        </div>
        <div className="col-md-5">
          <AllocatedOrders />
        </div>
      </div>
    </div>
  );
}
export default DispatchPage;
