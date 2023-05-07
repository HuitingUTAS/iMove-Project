import React, { useState } from "react";
import { Container, Button, Row, Col, Alert, Dropdown } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./LoginPage.css";

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
  const [selectedRole, setSelectedRole] = useState('Select');
  
  const handleSelect = (number) => {
    setSelectedRole(number);
    };
  return (
    <Container fluid className="login-page" style={{ width: "100vw" }}>
      <Row className="justify-content-end align-items-center min-vh-100">
        <Col xs={12} md={6} lg={4} className="login-container">
          <h2>Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <label htmlFor="username">Username: </label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component={Alert} />
                  <br></br>
                  <br></br>
                  <label htmlFor="password">Password: </label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component={Alert} />
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
                      <Button
                        onClick={() => {
                          navigate("/Registration");
                        }}
                      >
                        Sign Up
                      </Button>
                    </Col>
                    
                  </Row>
                  <Row className="mt-5">
                    <Col md={{ span: 4, offset: 0 }}>
                      <label htmlFor="select role">Select your role:</label>
                    </Col>
                    <Col >
                      <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                        {selectedRole}
                        </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelect('manager') }>Manager</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect('dispatcher')}>Dispatcher</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect('packer')}>Packer</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect('driver')}>Driver</Dropdown.Item>
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
