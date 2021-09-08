import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import toastr from "toastr";
import { Row, Col, Card, CardBody, Button, Label } from "reactstrap";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import {
  getUsers,
  addUser,
  addUserSuccess,
  deleteUser,
  apiError,
  getPrivilagesOptions,
  getCompaniesOptions,
  getBranchesOptions,
  updateUser,
} from '../../store/actions';

// Redux

import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './user.scss';

const Users = (props) => {
  const [selectedPrivilage, setSelectedPrivilage] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [userIdTobeUpdated, setUserIdToBeUpdated] = useState(null);
  const [userIdToBeDeleted, setUserIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [usersForTable, setUsersForTable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [passwordObject, setPasswordObject] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });

  const {
    users,
    addingUser,
    addUserResponse,
    deleteUserResponse,
    updateUserResponse,
    error,
  } = useSelector((state) => state.users);

  const privilagesOptions = useSelector(
    (state) => state.privilages.privilagesOptions
  );
  // const companiesOptions = useSelector(
  //   (state) => state.companies.companiesOptions
  // );
  // const branchesOptions = useSelector(
  //   (state) => state.branches.branchesOptions
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPrivilagesOptions());
    // dispatch(getCompaniesOptions());
  }, [dispatch]);

  // useEffect(() => {
  //   if (selectedCompany !== null) {
  //     dispatch(getBranchesOptions(selectedCompany.value));
  //   }
  // }, [selectedCompany]);

  useEffect(() => {
    if (addUserResponse.type === 'success') {
      toastr.success(addUserResponse.message);
      setSelectedPrivilage({});
    } else if (addUserResponse.type === 'failure') {
      toastr.error(error.data.message, addUserResponse.message);
    }
  }, [addUserResponse]);

  useEffect(() => {
    if (deleteUserResponse.type === 'success') {
      toastr.success(deleteUserResponse.message);
      setUserIdToBeDeleted(null);
    } else if (deleteUserResponse.type === 'failure') {
      toastr.error(error.data.message, deleteUserResponse.message);
    }
  }, [deleteUserResponse]);

  useEffect(() => {
    if (updateUserResponse.type === 'success') {
      setShowModal(false);
      setUserIdToBeUpdated(null);
      setPasswordObject({});
      toastr.success(updateUserResponse.message);
    } else if (updateUserResponse.type === 'failure') {
      toastr.error(error.data.message, updateUserResponse.message);
    }
  }, [updateUserResponse]);

  let preUpdateUser = (item) => {
    if (item.privilage) {
      let privilage = {
        label: item.privilage.privilege_name,
        value: item.privilage.id,
      };
      handleSelectedPrivilage(privilage);
    }

    setUserIdToBeUpdated(item.id);
    setUserObject({ ...item, password: null });
  };
  useEffect(() => {
    let userData = [];
    users.map((user) => {
      user.action = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <i
            className="uil-key-skeleton"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              // preUpdateUserPassword(user);
            }}
          ></i>
          <i
            className="uil-edit-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              preUpdateUser(user);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setUserIdToBeDeleted(user.id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );

      user.name1 = `${user.fname} ${user.lname}`;

      user.privilage1 = user.previlage && user.previlage;

      userData.push(user);
    });
    setUsersForTable(userData);
  }, [users]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Name',
        field: 'name1',
        sort: 'asc',
        width: 270,
      },

      {
        label: 'Email',
        field: 'user_email',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Mobile',
        field: 'mobile',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Privilege',
        field: 'privilage1',
        sort: 'asc',
        width: 150,
      },

      {
        label: 'Action',
        field: 'action',
        width: 100,
      },
    ],

    rows: usersForTable,
  };

  let privilagesOptionsData =
    privilagesOptions &&
    privilagesOptions.map((item) => {
      return {
        label: item.privilege_name,
        value: item.id,
      };
    });

  const privilagesOptionsGroup = [
    {
      options: privilagesOptionsData,
    },
  ];

  function handleChangeUser(e) {
    let name = e.target.name;
    let value = e.target.value;
    setUserObject({ ...userObject, [name]: value });
  }

  function handleSelectedPrivilage(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };

    setSelectedPrivilage(value);
    setUserObject({ ...userObject });
  }

  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    userIdTobeUpdated
      ? dispatch(updateUser(userObject))
      : dispatch(addUser(userObject));
  };

  return (
    <React.Fragment>
      {confirmDeleteAlert ? (
        <SweetAlert
          title=""
          showCancel
          confirmButtonText="Delete"
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          onConfirm={() => {
            dispatch(deleteUser(userIdToBeDeleted));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}

      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Manage Users" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmit(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">First name</Label>
                          <AvField
                            name="fname"
                            placeholder="First name"
                            type="text"
                            errorMessage="Enter First Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            value={userObject.fname}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Last name</Label>
                          <AvField
                            name="lname"
                            placeholder="Last name"
                            type="text"
                            errorMessage="Enter Last name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                            value={userObject.lname}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Email</Label>
                          <AvField
                            name="user_email"
                            placeholder="Email"
                            type="email"
                            errorMessage="Enter valid Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.user_email}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">Username</Label>
                          <AvField
                            name="username"
                            placeholder="Username"
                            type="text"
                            errorMessage="Enter valid Username"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            value={userObject.username}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom04">Mobile</Label>
                          <AvField
                            name="mobile"
                            placeholder="Mobile"
                            type="text"
                            errorMessage="Please provide a valid mobile."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom04"
                            value={userObject.mobile}
                            onChange={handleChangeUser}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label>Privilege</Label>
                          <Select
                            name="previlage"
                            value={selectedPrivilage}
                            onChange={(value) => {
                              handleSelectedPrivilage(value);
                            }}
                            options={privilagesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      {/* <Col md={4}>
                        <div className="mb-3">
                          <Label>Company</Label>
                          <Select
                            name="company"
                            value={selectedCompany}
                            onChange={(value) => {
                              handleSelectedCompany(value);
                            }}
                            options={companiesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col> */}
                      {/* <Col md={4}>
                        <div className="mb-3">
                          <Label>Branch</Label>
                          <Select
                            name="branch"
                            value={selectedBranch}
                            onChange={(value) => {
                              handleSelectedBranch(value);
                            }}
                            options={branchesOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col> */}

                      {userIdTobeUpdated ? null : (
                        <Col md="3">
                          <div className="mb-3">
                            <Label htmlFor="validationCustom05">Password</Label>
                            <AvField
                              name="password"
                              placeholder="Password"
                              type="password"
                              errorMessage=" Please provide a valid password"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom05"
                              value={userObject.password}
                              onChange={handleChangeUser}
                            />
                          </div>
                        </Col>
                      )}
                    </Row>

                    <p
                      style={{
                        color:
                          addUserResponse.type === 'success' ? 'green' : 'red',
                      }}
                    >
                      {addUserResponse.message}
                    </p>
                    {error.data && error.data.message ? (
                      <li
                        style={{
                          color: 'red',
                          marginBottom: '1rem',
                        }}
                      >
                        {error.data.message}
                      </li>
                    ) : null}
                    {userIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingUser ? true : false}
                      >
                        {addingUser ? 'Adding' : 'Submit'}
                      </Button>
                    )}
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable
                    responsive
                    bordered
                    data={data}
                    searching={true}
                    paging={false}
                    info={false}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Users;
// const mapStateToProps = (state) => {
//   const { error } = state.Users;
//   return { error };
// };

// export default withRouter(connect(mapStateToProps, { apiError })(Users));

// Users.propTypes = {
//   error: PropTypes.any,
//   users: PropTypes.array,
// };
