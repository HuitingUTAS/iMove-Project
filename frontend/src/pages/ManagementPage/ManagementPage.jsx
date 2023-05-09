import React, { useState } from "react";
import { Form, Button, Tabs, Tab, Row, Col } from "react-bootstrap";
import "./Management.css";
import CarManage from "./CarManage";
import DispatcherMange from "./DispatcherMange";
import PackerManage from "./PackerManage";
import DriverManage from "./DriverManage";
import Manager from "./Manager";

function ManagementPage() {
  return (
    <div className="managementTest">
      <div className="roleTab">
        <Tabs defaultActiveKey="car" id="managementPage">
          <Tab
            eventKey="car"
            title="Car Management"
            style={{ margin: "1.5rem auto" }}
          >
            <CarManage></CarManage>
          </Tab>
          <Tab
            eventKey="packer"
            title="Packer Management"
            style={{ margin: "1.5rem auto" }}
          >
            <PackerManage></PackerManage>
          </Tab>
          <Tab
            eventKey="dispatcher"
            title="Dispatcher Management"
            style={{ margin: "1.5rem auto" }}
          >
            <DispatcherMange></DispatcherMange>
          </Tab>
          <Tab
            eventKey="driver"
            title="Driver Management"
            style={{ margin: "1.5rem auto" }}
          >
            <DriverManage></DriverManage>
          </Tab>
          <Tab
            eventKey="manager"
            title="Manager Management"
            style={{ margin: "1.5rem auto" }}
          >
            <Manager></Manager>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default ManagementPage;
