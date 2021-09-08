import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import jwt_decode from 'jwt-decode';

import SweetAlert from 'react-bootstrap-sweetalert';
import { MDBDataTable } from 'mdbreact';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Label,
  Modal,
} from 'reactstrap';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  apiError,
  updateCustomer,
} from '../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
// import './customer.scss';

const Customers = (props) => {
  //   const [selectedcustomerpremium, setSelectedCustomerPremium] = useState(null);

  const [customerObject, setCustomerObject] = useState({});
  const [customersTemp, setCustomersTemp] = useState([]);
  const [selectedArea, setSelectedAreaFrom] = useState(null); 
  const [customerIdTobeUpdated, setCustomerIdToBeUpdated] = useState(null);
  const [customerIdToBeDeleted, setCustomerIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    customers,
    addingCustomer,
    addCustomerResponse,
    deleteCustomerResponse,
    updateCustomerResponse,
    error,
  } = useSelector((state) => state.customers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));
      console.log(obj);

      setUserId(obj.user);
      setCustomerObject({ ['auth_userid']: userId });
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addCustomerResponse.type === 'success') {
      toastr.success(addCustomerResponse.message);
    } else if (addCustomerResponse.type === 'failure') {
      toastr.error(error.data.message, addCustomerResponse.message);
    }
  }, [addCustomerResponse]);

  useEffect(() => {
    if (deleteCustomerResponse.type === 'success') {
      toastr.success(deleteCustomerResponse.message);
    } else if (deleteCustomerResponse.type === 'failure') {
      toastr.error(error.data.message, deleteCustomerResponse.message);
    }
  }, [deleteCustomerResponse]);

  useEffect(() => {
    if (updateCustomerResponse.type === 'success') {
      setShowModal(false);
      setCustomerIdToBeUpdated(null);
      // setPasswordObject({});
      setCustomerIdToBeUpdated(null);
      toastr.success(updateCustomerResponse.message);
    } else if (updateCustomerResponse.type === 'failure') {
      toastr.error(error.data.message, updateCustomerResponse.message);
    }
  }, [updateCustomerResponse]);

  let preUpdateCustomer = (item) => {
    setCustomerIdToBeUpdated(item.customer_id);
    setCustomerObject(item);
  };
  let viewcartCustomer = (item) => {
    
  }
  

  useEffect(() => {
    let customersDuplicate = JSON.parse(JSON.stringify(customers));
    let customerData = [];
    customersDuplicate.map((item, index) => {
      item.auth_userid = userId;
      
      
      var url = "https://api.whatsapp.com/send/?phone="+item.customer_mob+"&text=Hi "+item.customer_name+"\n Welcome to Cococa ";
      item.action = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* //   <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
           
          <a href={url} class="text-dark" target="_blank" ><i
            className="uil-whatsapp"
            style={{
              fontSize: '1.3em',
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
          ></i></a>
           <i
            className="uil-shopping-cart-alt"
            style={{
              fontSize: '1.3em',
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
            onClick={() => {
              viewcartCustomer(item);
            }}
          ></i>
          <i
            className="uil-edit-alt"
            style={{
              fontSize: '1.3em',
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
            onClick={() => {
              preUpdateCustomer(item);
            }}
          ></i>
         
          
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setCustomerIdToBeDeleted(item.customer_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
         
        </div>
      );
      item.id = index + 1;

      customerData.push(item);
    });
    setCustomersTemp(customerData);
  }, [customers]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 100,
      },
     

      {
        label: 'Customer Name',
        field: 'customer_name',
        sort: 'asc',
        width: 100,
      },
      
      {
        label: 'Mobile Number',
        field: 'customer_contact_number',
        sort: 'asc',
        width: 100,
      },
     
      

      {
        label: 'Email ID',
        field: 'customer_email_id',
        sort: 'asc',
        width: 100,
      },
      
      {
        label: 'Area',
        field: 'customer_area_id',
        sort: 'asc',
        width: 100,
      },


      {
        label: 'Action',
        field: 'action',
        sort: 'disabled',
        width: 10,
      },
    ],
    rows: customersTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCustomerObject({
      ...customerObject,
      [name]: value,
    });
  };
  const handleValidSubmitCustomer = (event, values) => {
    customerIdTobeUpdated
      ? dispatch(updateCustomer(customerObject))
      : dispatch(addCustomer(customerObject));
  };

  //   let handleChangeImageUpload =(event) => {
  // setCustomerObject({...customerObject, customerlogo:event.target.files[0]})
  //   }
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
                dispatch(deleteCustomer(customerIdToBeDeleted, userId));
                setConfirmDeleteAlert(false);
              }}
              onCancel={() => setConfirmDeleteAlert(false)}
            >
              Are you sure you want to delete it?
            </SweetAlert>
          ) : null}
          <div className="page-content">
            <div className="container-fluid">
              <Breadcrumbs title="Home" breadcrumbItem="Customers" />
             
    
    
              <Row>
                <Col xl="12">
                  <Card>
                    <CardBody>
                      <AvForm
                        className="needs-validation"
                        onValidSubmit={(e, v) => {
                          handleValidSubmitCustomer(e, v);
                        }}
                      >
                        <Row>
                          <Col md="3">
                            <div className="mb-3">
                              <Label htmlFor="validationCustom01">
                               Customer Name
                              </Label>
                              <AvField
                                name="createdBy"
                                value={userId}
                                type="hidden"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                                onChange={handleChangeInput}
                              />
    
                              <AvField
                                name="customer_name"
                                value={customerObject.customer_name}
                                placeholder="Customer Name"
                                type="text"
                                errorMessage="Enter Customer Name"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom01"
                                onChange={handleChangeInput}
                              />
                            </div>
                          </Col>
    
                          <Col md="3">
                            <div className="mb-3">
                              <Label htmlFor="validationCustom02">Mobile Number</Label>
                              <AvField
                                name="customer_contact_number"
                                value={customerObject.customer_contact_number}
                                placeholder="Mob Number"
                                type="text"
                                errorMessage="Enter Mob Number"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom02"
                                onChange={handleChangeInput}
                              />
                            </div>
                          </Col>
    
                          <Col md="3">
                            <div className="mb-3">
                              <Label htmlFor="validationCustom03">
                                Email
                              </Label>
                              <AvField
                                name="customer_email_id"
                                value={customerObject.customer_email_id}
                                placeholder="E mail"
                                type="text"
                                errorMessage="Enter valid Email"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom03"
                                onChange={handleChangeInput}
                              />
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="mb-3">
                              <Label htmlFor="validationCustom04">
                                Area
                              </Label>
                              <AvField
                                name="customer_apartment_no"
                                value={customerObject.customer_area_id}
                                placeholder="Apartment Number"
                                type="text"
                                errorMessage="Enter Apartment Number"
                                className="form-control"
                                validate={{ required: { value: true } }}
                                id="validationCustom04"
                                onChange={handleChangeInput}
                              />
                            </div>
                          </Col>
                        </Row>
    
                        {customerIdTobeUpdated ? (
                          <Button
                            color="primary"
                            type="submit"
                            disabled={addingCustomer ? true : false}
                          >
                            {addingCustomer ? 'Updating' : 'Update'}
                          </Button>
                        ) : (
                          <Button
                            color="primary"
                            type="submit"
                            disabled={addingCustomer ? true : false}
                          >
                            {addingCustomer ? 'Adding' : 'Submit'}
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
                      <MDBDataTable responsive bcustomered data={data} />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </React.Fragment>
      );
    };
  

const mapStateToProps = (state) => {
  // const { error } = state.Users;
  // return { error };
};

export default withRouter(connect(mapStateToProps, { apiError })(Customers));

Customers.propTypes = {
  error: PropTypes.any,
  customers: PropTypes.array,
};