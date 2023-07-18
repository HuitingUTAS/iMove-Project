import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import "./Registration.css";
import { BASE_URL } from "../../../config";

function RegistrationPage() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [carType, setCarType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [volume, setVolume] = useState(0);
  const [hasFridge, setHasFridge] = useState(false);
  const [isInsuranced, setIsInsuranced] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licensePhoto, setLicensePhoto] = useState(null);

  const handleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(Number(e.target.value));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleCarTypeChange = (e) => {
    setCarType(e.target.value);
  };

  const handleRegistrationNumberChange = (e) => {
    setRegistrationNumber(e.target.value);
  };

  const handleVolumeChange = (e) => {
    setVolume(Number(e.target.value));
  };

  const handleHasFridgeChange = (e) => {
    setHasFridge(e.target.value === "yes");
  };

  const handleIsInsurancedChange = (e) => {
    setIsInsuranced(e.target.value === "yes");
  };

  const handleLicenseNumberChange = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleLicensePhotoChange = (e) => {
    setLicensePhoto(e.target.files[0]);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formData = null;

    switch (role) {
      case "packer":
        formData = {
          username,
          password,
          name,
          gender,
          age,
          email,
          phone,
          address,
          photo,
        };
        break;
      case "dispatcher":
        formData = {
          username,
          password,
          name,
          gender,
          age,
          email,
          phone,
          address,
          photo,
        };
        break;
      case "car":
        formData = {
          username,
          password,
          make,
          model,
          type: carType,
          registrationNumber,
          volume,
          hasFridge,
          isInsuranced,
          photo,
        };
        break;
      case "driver":
        formData = {
          username,
          password,
          name,
          gender,
          age,
          email,
          phone,
          address,
          licenseNumber,
          licensePhoto,
          photo,
        };
        break;
      case "manager":
        formData = {
          username,
          password,
          name,
          gender,
          email,
          phone,
          address,
          photo,
        };
        break;
      default:
        return;
    }

    // Make a POST request to the server to save the data based on the selected role
    axios
      .post(`${BASE_URL}/RegistrationPage/${role}`, formData)
      .then((response) => {
        console.log("Data uploaded successfully");
        // Reset the form fields
        setUsername("");
        setPassword("");
        setName("");
        setGender("");
        setAge(0);
        setEmail("");
        setPhone("");
        setAddress("");
        setPhoto(null);
        setMake("");
        setModel("");
        setCarType("");
        setRegistrationNumber("");
        setVolume(0);
        setHasFridge(false);
        setIsInsuranced(false);
        setLicenseNumber("");
        setLicensePhoto(null);
        setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 10000);
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
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
                  <label htmlFor="formUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select
                    className="form-control"
                    id="formGender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
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
                    value={age}
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formPassword"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={handleAddressChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    onClick={handleFormSubmit}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button">
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
                  <label htmlFor="formUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select
                    className="form-control"
                    id="formGender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
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
                    value={age}
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formPassword"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={handleAddressChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    onClick={handleFormSubmit}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button">
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
                  <label htmlFor="formUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formMake">Make</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formMake"
                    placeholder="Enter Make"
                    value={make}
                    onChange={handleMakeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formModel">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formModel"
                    placeholder="Enter Model"
                    value={model}
                    onChange={handleModelChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formType">Type</label>
                  <input
                    type="number"
                    className="form-control"
                    id="formType"
                    placeholder="Enter Type"
                    value={carType}
                    onChange={handleCarTypeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formRegistrationNumber">
                    Registration Number
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="formRegistrationNumber"
                    placeholder="Enter Registration Number"
                    value={registrationNumber}
                    onChange={handleRegistrationNumberChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formContainerVolumer">Container Volume</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formContainerVolumer"
                    placeholder="Enter Container Volume"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formPassword"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hasFridge">Has Fridge</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="hasFridge"
                      id="hasFridgeYes"
                      value="yes"
                      onChange={handleHasFridgeChange}
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
                      onChange={handleIsInsurancedChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="isInsurancedYes"
                    >
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
                    <label
                      className="form-check-label"
                      htmlFor="isInsurancedNo"
                    >
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
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    onClick={handleFormSubmit}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button">
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
                  <label htmlFor="formUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select
                    className="form-control"
                    id="formGender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
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
                    value={age}
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="formPassword">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="formPassword"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={handleAddressChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="formLicenseNumber">License Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formLicenseNumber"
                    placeholder="Enter License Number"
                    value={licenseNumber}
                    onChange={handleLicenseNumberChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="formLicense">License &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formLicense"
                    value={licensePhoto}
                    onChange={handleLicensePhotoChange}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="formPhoto">Photo &nbsp;&nbsp;</label>
                  <input
                    type="file"
                    className="form-control-file custom-file-input"
                    id="formPhoto"
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    onClick={handleFormSubmit}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button">
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
                  <label htmlFor="formUsername">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formUsername"
                    placeholder="Enter username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formGender">Gender</label>
                  <select
                    className="form-control"
                    id="formGender"
                    value={gender}
                    onChange={handleGenderChange}
                  >
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
                    value={age}
                    onChange={handleAgeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="formEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formPhoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="formPhoneNumber"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="formPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="formPassword"
                      placeholder="Enter password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <label htmlFor="formAddress">Address</label>
                  <textarea
                    className="form-control"
                    id="formAddress"
                    rows="3"
                    placeholder="Enter address"
                    value={address}
                    onChange={handleAddressChange}
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
                    value={photo}
                    onChange={handlePhotoChange}
                  />
                </div>
                <div className="d-flex justify-content-end mt-5 pl-5">
                  <Button
                    variant="success"
                    type="submit"
                    className="mr-2"
                    onClick={handleFormSubmit}
                  >
                    Confirm
                  </Button>
                  <Button variant="danger" type="button">
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
}
export default RegistrationPage;
