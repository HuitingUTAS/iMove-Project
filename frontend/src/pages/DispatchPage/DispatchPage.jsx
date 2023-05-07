import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UnallocatedOrders from "./UnallocatedOrders";
import AllocatedOrders from "./AllocatedOrders";
import "./Dispatch.css";

function DispatchPage() {
  const [unallocatedOrders, setUnallocatedOrders] = useState([]);
  const [allocatedOrders, setAllocatedOrders] = useState([]);

  // function to handle uploading orders
  const handleUploadOrders = (orders) => {
    setUnallocatedOrders(orders);
  };

  // function to handle allocating orders
  const handleAllocateOrders = (ordersToAllocate) => {
    setUnallocatedOrders((prevUnallocatedOrders) =>
      prevUnallocatedOrders.filter((order) => !ordersToAllocate.includes(order))
    );
    setAllocatedOrders((prevAllocatedOrders) =>
      prevAllocatedOrders.concat(ordersToAllocate)
    );
  };

  // function to handle adding a new order
  const handleAddOrder = (newOrder) => {
    setUnallocatedOrders((prevUnallocatedOrders) =>
      prevUnallocatedOrders.concat(newOrder)
    );
  };

  // function to handle exporting allocated orders
  const handleExportAllocatedOrders = () => {
    // implement export logic here
    console.log("Exporting allocated orders:", allocatedOrders);
  };

  return (
    <div className="dispatchtest">
      <h1>Order Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <UnallocatedOrders
            orders={unallocatedOrders}
            onUploadOrders={handleUploadOrders}
            onAllocateOrders={handleAllocateOrders}
            onAddOrder={handleAddOrder}
          />
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
