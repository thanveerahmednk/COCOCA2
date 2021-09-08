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
  getOrders,
  addOrder,
  deleteOrder,
  apiError,
  updateOrder,
  getCustomerOptions,
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './order.scss';

const Orders = (props) => {
  
  const [selectedOrder, setSelectedOrderFrom] = useState(null); 
  const [orderObject, setOrderObject] = useState({});
  const [ordersTemp, setOrdersTemp] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [orderIdTobeUpdated, setOrderIdToBeUpdated] = useState(null);
  const [orderIdToBeDeleted, setOrderIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    orders,
    addingOrder,
    addOrderResponse,
    deleteOrderResponse,
    updateOrderResponse,
    error,
  } = useSelector((state) => state.orders);

  const customerListOptions = useSelector((state) => state.customers.customerOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getCustomerOptions());

  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));
      console.log(obj);

      setUserId(obj.user);
      setOrderObject({ ['auth_userid']: userId });
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addOrderResponse.type === 'success') {
      toastr.success(addOrderResponse.message);
    } else if (addOrderResponse.type === 'failure') {
      toastr.error(error.data.message, addOrderResponse.message);
    }
  }, [addOrderResponse]);

  useEffect(() => {
    if (deleteOrderResponse.type === 'success') {
      toastr.success(deleteOrderResponse.message);
    } else if (deleteOrderResponse.type === 'failure') {
      toastr.error(error.data.message, deleteOrderResponse.message);
    }
  }, [deleteOrderResponse]);

  useEffect(() => {
    if (updateOrderResponse.type === 'success') {
      setShowModal(false);
      setOrderIdToBeUpdated(null);
      // setPasswordObject({});
      setOrderIdToBeUpdated(null);
      toastr.success(updateOrderResponse.message);
    } else if (updateOrderResponse.type === 'failure') {
      toastr.error(error.data.message, updateOrderResponse.message);
    }
  }, [updateOrderResponse]);

  let preUpdateOrder = (item) => {
    setOrderIdToBeUpdated(item.o_id);
    setOrderObject(item);
  };
  const OrderOptionsGroup = [
    { value: 1, label: "CRM" },
    { value: 2 , label: "WEBSITE" },
    
  ]
 


  function handleSelectedOrder(value) {
    setSelectedOrderFrom(value);
    setOrderObject({ ...orderObject,o_from: value.value });
  }

  useEffect(() => {
    let ordersDuplicate = JSON.parse(JSON.stringify(orders));
    let orderData = [];
    ordersDuplicate.map((item, index) => {
      // item.fname = item.User.fname + ' ' + item.User.lname;
      // item.auth_userid = userId;
    //   item.customer_name = item.customer.customer_name;
    //   if (item.o_from === 0) {
    //     item.o_from ="CRM"
    // }
    // else{
    //   item.o_from ="Website"
    // }
      item.action = (
        <div style={{ display: 'flex', justifyContent:'center'}}> 
          {/* //   <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
          <i
            className="uil-edit-alt"
            style={{
              fontSize: '1.3em',
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
            onClick={() => {
              preUpdateOrder(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setOrderIdToBeDeleted(item.o_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;

      orderData.push(item);
    });
    setOrdersTemp(orderData);
  }, [orders]);

//   const data = {
//     columns: [
//       {
//         label: '#',
//         field: 'id',
//         sort: 'asc',
//         width: 10,
//       },

//       {
//         label: 'Order Number',
//         field: 'o_number',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Date',
//         field: 'o_date',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Time',
//         field: 'o_time',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Order From',
//         field: 'o_from',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Name',
//         field: 'customer_name',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Sub Total',
//         field: 'o_subtotal',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Delivery charges',
//         field: 'o_delivery_charge',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'GST',
//         field: 'o_gst',
//         sort: 'asc',
//         width: 70,
//       },
//       {
//         label: 'Total',
//         field: 'o_total',
//         sort: 'asc',
//         width: 70,
//       },
      

//       // {
//       //   label: 'Added by',
//       //   field: 'fname',
//       //   sort: 'asc',
//       //   width: 100,
//       // },

//       {
//         label: 'Action',
//         field: 'action',
//         sort: 'disabled',
//         width: 100,
//       },
//     ],
//     rows: ordersTemp,
//   };

let customerOptionsData =
customerListOptions &&
customerListOptions.map((item) => {
  return {
    label: item.customer_name,
    value: item.customer_id,
  };
});

const customerOptionsGroup = [
{
  options: customerOptionsData,
},
];

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setOrderObject({
      ...orderObject,
      [name]: value,
    });
  };

  function handleSelectedCustomer(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };

    setSelectedCustomer(value);
    console.log(newValue._id
      );
    setOrderObject({ ...orderObject, newValue });
  }
  const handleValidSubmitOrder = (event, values) => {
    orderIdTobeUpdated
      ? dispatch(updateOrder(orderObject))
      : dispatch(addOrder(orderObject));
  };

  //   let handleChangeImageUpload =(event) => {
  // setOrderObject({...orderObject, orderlogo:event.target.files[0]})
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
            dispatch(deleteOrder(orderIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Add Orders" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmitOrder(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Order Number
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
                            name="o_number"
                            value={orderObject.o_number}
                            placeholder="Order Number"
                            type="text"
                            errorMessage="Enter Order Number"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Date</Label>
                          <AvField
                            name="o_date"
                            value={orderObject.o_date}
                            
                            type="date"
                            errorMessage="Enter Date"
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
                            Customer Name
                          </Label>
                          <Select
                            name="o_customer_id"
                            value={selectedCustomer}
                            onChange={(value) => {
                                handleSelectedCustomer(value);
                              }}
                              options={customerOptionsGroup}
                              classNamePrefix="select2-selection"
                        
                            validate={{ required: { value: true } }}
                            
                          />
                        </div>
                      </Col>
                      <Col md="3">
                      <div className="mb-3">
                          <Label htmlFor="validationCustom04">
                            Order From
                          </Label>
                          <Select
                            name="o_from"
                            value={selectedOrder}
                            onChange={(value) => {
                                handleSelectedOrder(value);
                              }}
                              options={OrderOptionsGroup}
                              classNamePrefix="select2-selection"
                        
                            validate={{ required: { value: true } }}
                            
                          />
                        </div>
                        </Col>

                    </Row>
                    <Row>
                    <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom05">Sub Total</Label>
                          <AvField
                            name="o_subtotal"
                            value={orderObject.o_subtotal}
                            
                            type="text"
                            errorMessage="Enter Sub Total"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom06">Delivery Charges</Label>
                          <AvField
                            name="o_delivery_charge"
                            value={orderObject.o_delivery_charge}
                            
                            type="text"
                            errorMessage="Enter Delivery Charges"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom06"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom07">GST</Label>
                          <AvField
                            name="o_gst"
                            value={orderObject.o_gst}
                            
                            type="text"
                            errorMessage="Enter GST"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom07"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom08">Total</Label>
                          <AvField
                            name="o_total"
                            value={orderObject.o_total}
                            
                            type="text"
                            errorMessage="Enter Total"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom08"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>


                    </Row>

                    {orderIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingOrder ? true : false}
                      >
                        {addingOrder ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingOrder ? true : false}
                      >
                        {addingOrder ? 'Adding' : 'Submit'}
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
                {/* <CardBody>
                  <MDBDataTable responsive bordered data={data} />
                </CardBody> */}
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

export default withRouter(connect(mapStateToProps, { apiError })(Orders));

Orders.propTypes = {
  error: PropTypes.any,
  orders: PropTypes.array,
};
