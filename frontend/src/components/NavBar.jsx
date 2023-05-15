import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import LoginPage from "../pages/LoginPage/LoginPage";
import DispatchPage from "../pages/DispatchPage/DispatchPage";
import DriverPage from "../pages/DriverPage/DriverPage";
import ManagementPage from "../pages/ManagementPage/ManagementPage";
import PackerPage from "../pages/PackerUpPage/PackerPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import AddOrder from "../pages/DispatchPage/AddOrder";
import TrackingPage from "../pages/TrackingPage/TrackingPage";
import ErrorPage from "./ErrorPage";

function CustomNavbar() {
  return (
    <BrowserRouter>
      <Navbar fixed="top">
        <Link to="./Dispatch" className="nav-link">
          Dispatch
        </Link>{" "}
        <Link to="/Driver" className="nav-link">
          Driver
        </Link>{" "}
        <Link to="/Tracking" className="nav-link">
          Tracking
        </Link>
        <Link to="/Packer" className="nav-link">
          Packer
        </Link>
        <Link to="/Packer" className="nav-link">
          Packer
        </Link>
        <Link to="/Registration" className="nav-link">
          Sign Up
        </Link>
      </Navbar>
      <Routes>
        <Route path="/" element={<LoginPage />}>
          <Route path="/DispatchPage" element={<DispatchPage />} />
          <Route path="/Driver" element={<DriverPage />} />
          <Route path="/Management" element={<ManagementPage />} />
          <Route path="/Packer" element={<PackerPage />} />
          <Route path="/Registration" element={<RegistrationPage />} />
          <Route path="/AddOrder" element={<AddOrder />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/Tracking" element={<TrackingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default CustomNavbar;
