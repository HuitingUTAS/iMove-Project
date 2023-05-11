import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import "./Registration.css";

function RegistrationPage() {
  const [role, setRole] = useState("");

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
  };
  const renderForm = () => {
    switch (role) {
      case "packer":
        return (
          <form className="border border-dark p-3">
            <h3>Packer Registration</h3>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select className="form-control" id="formGender">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formAge">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formAge"
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button variant="success" type="submit" className="mr-2" >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button" >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      case "dispatcher":
        return (
          <form className="border border-dark p-3">
            <h3>Dispatcher Registration</h3>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select className="form-control" id="formGender">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formAge">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formAge"
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button variant="success" type="submit" className="mr-2" >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button" >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      case "car":
        return (
          <form className="border border-dark p-3">
            <h3>Car Registration</h3>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formMake">Make</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formMake"
                    placeholder="Enter Make"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formModel">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formModel"
                    placeholder="Enter Model"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formType">Type</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formType"
                    placeholder="Enter Type"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formRegistrationNumber">Registration Number</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formRegistrationNumber"
                    placeholder="Enter Registration Number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formContainerVolumer">Container Volume</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formContainerVolumer"
                    placeholder="Enter Container Volume"
                  />
                </div>
              </div>
              <div className="col">
              <div className="form-group">
                <label htmlFor="hasFridge">Has Fridge</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="hasFridge"
                    id="hasFridgeYes"
                    value="yes"
                  />
                  <label className="form-check-label" htmlFor="hasFridgeYes">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="hasFridge"
                    id="hasFridgeNo"
                    value="no"
                  />
                  <label className="form-check-label" htmlFor="hasFridgeNo">
                    No
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="isInsuranced">Is Insuranced</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isInsuranced"
                    id="isInsurancedYes"
                    value="yes"
                  />
                  <label className="form-check-label" htmlFor="isInsurancedYes">
                    Yes
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isInsuranced"
                    id="isInsurancedNo"
                    value="no"
                  />
                  <label className="form-check-label" htmlFor="isInsurancedNo">
                    No
                  </label>
                </div>
              </div>
                <div className="form-group mt-2">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button variant="success" type="submit" className="mr-2" >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button" >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      case "driver":
        return (
          <form className="border border-dark p-3">
            <h3>Driver Registration</h3>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select className="form-control" id="formGender">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formAge">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formAge"
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formLicenseNumber">License Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formLicenseNumber"
                    placeholder="Enter License Number"
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="formLicense">License &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formLicense"
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button variant="success" type="submit" className="mr-2" >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button" >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      case "manager":
        return (
          <form className="border border-dark p-3">
            <h3>Manager Registration</h3>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select className="form-control" id="formGender">
                    <option>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="formAge">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formAge"
                    placeholder="Enter age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formAccessCode">Access code</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formAccessCode"
                    placeholder="Enter Access code"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button variant="success" type="submit" className="mr-2" >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button" >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        );
      default:
        return null;
    }
  };
  return (
    <Container fluid className="mt-5 pt-5">
    <Row>
      <Col>
        <h2>Registration Page</h2>
        <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {role ? `${role}` : "Select the role"}
        </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="packer">packer</Dropdown.Item>
            <Dropdown.Item eventKey="dispatcher">dispatcher</Dropdown.Item>
            <Dropdown.Item eventKey="car">car</Dropdown.Item>
            <Dropdown.Item eventKey="driver">driver</Dropdown.Item>
            <Dropdown.Item eventKey="manager">manager</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {renderForm()}
      </Col>
    </Row>
  </Container>
  );
};
export default RegistrationPage;
