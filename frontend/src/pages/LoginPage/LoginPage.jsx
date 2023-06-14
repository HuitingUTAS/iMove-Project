import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Alert,
  Dropdown,
  Navbar,
  Nav,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useNavigate,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import * as Yup from "yup";
import "./LoginPage.css";
import DispatchPage from "../DispatchPage/DispatchPage";
import DriverPage from "../DriverPage/DriverPage";
import ManagementPage from "../ManagementPage/ManagementPage";
import PackerPage from "../PackerUpPage/PackerPage";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import TrackingPage from "../TrackingPage/TrackingPage";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const onSubmit = (values) => {
  console.log("Form data", values);
  // 在此处处理表单提交
};

function LoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("Select");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async (values) => {
    console.log("Form data", values);

    try {
      const response = await fetch("http://localhost:3002/LoginPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, role: selectedRole }), // 包含选择的角色值
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);

        // 验证用户名、密码和角色的一致性
        if (
          data.message === "login successfully" &&
          data.user &&
          data.user.username === values.username &&
          data.role === selectedRole
        ) {
          // 登录成功，执行相应操作
          console.log("Login successful");
          window.location.href = "/packer"; // 根据角色跳转到相应页面
        } else {
          // 登录失败，执行相应操作
          console.log("Login failed");
        }
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
    }
  };

  const handleSelect = (number) => {
    setSelectedRole(number);
  };
  return (
    <Container fluid className="login-page" style={{ width: "100vw" }}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to="/dispatch" className="nav-link">
              Dispatch
            </Link>
            <Link to="/driver" className="nav-link">
              Driver
            </Link>
            <Link to="/tracking" className="nav-link">
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
        <Route path="/dispatch" element={<DispatchPage />} />
        <Route path="/driver" element={<DriverPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/packer" element={<PackerPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
      <Row className="justify-content-end align-items-center min-vh-100">
        <Col xs={12} md={6} lg={4} className="login-container">
          <h2>Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const { handleChange } = formik;
              return (
                <Form>
                  <label htmlFor="username">Username: </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange} // 绑定handleChange函数
                  />
                  <br />
                  <br />
                  <label htmlFor="password">Password: </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange} // 绑定handleChange函数
                  />
                  <Row>
                    <Col className="mt-3">
                      <Button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Login
                      </Button>
                    </Col>
                    <Col className="mt-3">
                      <Button onClick={() => navigate("/Registration")}>
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col md={{ span: 4, offset: 0 }}>
                      <label htmlFor="select role">Select your role:</label>
                    </Col>
                    <Col>
                      <Dropdown className="mb-3">
                        <Dropdown.Toggle
                          variant="outline-secondary"
                          id="dropdown-basic"
                        >
                          {selectedRole}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleSelect("manager")}
                          >
                            Manager
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleSelect("dispatcher")}
                          >
                            Dispatcher
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleSelect("packer")}>
                            Packer
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleSelect("driver")}>
                            Driver
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
