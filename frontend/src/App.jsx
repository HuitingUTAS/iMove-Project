import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import LoginPage from "./pages/LoginPage/LoginPage";
import DispatchPage from "./pages/DispatchPage/DispatchPage";
import DriverPage from "./pages/DriverPage/DriverPage";
import ManagementPage from "./pages/ManagementPage/ManagementPage";
import PackerPage from "./pages/PackerUpPage/PackerPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AddOrder from "./pages/DispatchPage/AddOrder";
import ErrorPage from "./components/ErrorPage";
import BatchOrder from "./pages/DispatchPage/BatchOrder";
import TrackingPage from "./pages/TrackingPage/TrackingPage";
import "./App.css";

function App() {
  return (
    <div className="test">
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Link to="/dispatch" className="nav-link">
                Dispatch
              </Link>
              <Link to="/driver" className="nav-link">
                Driver
              </Link>
              <Link to="/Tracking" className="nav-link">
                Tracking
              </Link>
              <Link to="/packer" className="nav-link">
                Packer
              </Link>
              <Link to="/management" className="nav-link">
                Management
              </Link>
              <Link to="/registration" className="nav-link">
                Sign Up
              </Link>
              <Link to="/" className="nav-link">
                Log Out
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dispatch" element={<DispatchPage />} />
          <Route path="/driver" element={<DriverPage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/packer" element={<PackerPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/batchOrder" element={<BatchOrder />} />
          <Route path="/Tracking" element={<TrackingPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
