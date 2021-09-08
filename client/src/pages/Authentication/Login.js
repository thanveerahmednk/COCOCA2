import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { Row, Col, Alert, Container, CardBody, Card } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// actions
import { loginUser, apiError } from "../../store/actions";

// import images
import logo from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo.svg";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    props.loginUser(values, props.history);
  };

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
      <div className="account-pages-container">
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card>
                  <CardBody className="p-4">
                    <Row>
                      <Col lg={12}>
                        <div className="text-center">
                          <Link to="/" className="mb-3 d-block auth-logo">
                            <img
                              src={logo}
                              alt=""
                              height="19"
                              className="logo logo-dark"
                            />
                            <img
                              src={logolight}
                              alt=""
                              height="19"
                              className="logo logo-light"
                            />
                          </Link>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center mt-2">
                      <h5>Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Cococa
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v);
                        }}
                      >
                        {props.error && typeof props.error === 'string' ? (
                          <Alert color="danger">{props.error}</Alert>
                        ) : null}

                        <div className="mb-3">
                          <AvField
                            name="username"
                            label="Username"
                            value={username}
                            className="form-control"
                            placeholder="Username"
                            type="text"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <AvField
                            name="password"
                            label="Password"
                            value={password}
                            type="password"
                            required
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {/* {apiError ? (
                          <Row className="mt-4">
                            <p>{apiError.message}</p>
                          </Row>
                        ) : null} */}
                        <Row className="mt-4">
                          <Col lg={6}>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customControlInline"
                              >
                                Remember me
                              </label>
                            </div>
                          </Col>
                          <Col lg={6} md={12} sm={12} className="right-button">
                            <div>
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>
                          </Col>
                        </Row>

                        {/* <div className="mt-4">
                          <Link to="/forgot-password" className="text-muted">
                            <i class="mdi mdi-lock"></i>
                            &nbsp;Forgot password?
                          </Link>
                        </div> */}
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center text-dark">
                  <p>
                    ©{new Date().getFullYear()} Cococa
                    {/* <a href="https://srvinfotech.com" target="_blank">
                      &nbsp;Powered by SRV InfoTech
                    </a> */}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { error } = state.Login;
  return { error };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
);

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
};
