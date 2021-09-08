import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

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
  Badge
} from 'reactstrap';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  getOrders,
  addOrder,
  deleteOrder,
  apiError,
  updateOrder,
  deliverOrder,
  outofdeliverOrder
} from '../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import './order.scss';

const Orders = (props) => {
  //   const [selectedorderpremium, setSelectedOrderPremium] = useState(null);

  const [orderObject, setOrderObject] = useState({});
  const [ordersTemp, setOrdersTemp] = useState([]);

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
    deliverOrderResponse,
    error,
  } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
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

  useEffect(() => {
    if (deliverOrderResponse.type === 'success') {
      toastr.success(deliverOrderResponse.message);
      dispatch(getOrders());
    } else if (deliverOrderResponse.type === 'failure') {
      toastr.error(error.data.message, deliverOrderResponse.message);
    }
  }, [deliverOrderResponse]);


  let preUpdateOrder = (item) => {
    setOrderIdToBeUpdated(item.o_id);
    setOrderObject(item);
  };



  useEffect(() => {
    let ordersDuplicate = JSON.parse(JSON.stringify(orders));
    let orderData = [];
    ordersDuplicate.map((item, index) => {
      // item.fname = item.User.fname + ' ' + item.User.lname;
      // item.auth_userid = userId;
      item.o_date = moment(item.o_date).format('DD/MM/YYYY');
      var time = item.o_time;
      item.o_time=moment(time, ["hh:mm:ss"]).format("h:mm A");
      item.o_date = item.o_date + " "+item.o_time;
      item.customer_name = item.customer.customer_name;
      if (item.o_from === 0) {
        item.o_from ="CRM"
    }
    else{
      item.o_from ="Website"
    }
    if(item.o_approved_status==0)
    {
      item.o_approved_status = "Received";
      item.action = (
        <div style={{ display: 'flex', justifyContent:'center'}}> 
          {/* //   <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
          <i style={{
              fontSize: '1 em',
              cursor: 'pointer',
              fontWeight:'bold'
            }}
            onClick={() => {
              dispatch(deliverOrder(item.o_id, userId));
            }}
            >
          <h6>
         <Badge className="bg-dark">Deliver</Badge>
          </h6>
          </i>
          <i
            className="uil-edit-alt"
            style={{
              fontSize: '1 em',
              cursor: 'pointer',
              paddingLeft:'5px'
            }}
            onClick={() => {
              preUpdateOrder(item);
            }}
          ></i>
          
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1 em', cursor: 'pointer', paddingLeft:'5px' }}
            onClick={() => {
              setOrderIdToBeDeleted(item.o_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
    }
    else if(item.o_approved_status==1)
    {
      item.o_approved_status = "Delivered";
      item.action = (
        <div style={{ display: 'flex', justifyContent:'center'}}> 
          {/* //   <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
          <i style={{
            
              fontSize: '1em',
              cursor: 'pointer',
              fontWeight:'bold'
            }}
            onClick={() => {
              dispatch(outofdeliverOrder(item.o_id, userId));
            }}
            >
          <h6>
         <Badge className="bg-dark">Out for Delivery</Badge>
          </h6>
          </i>
          <i
            className="uil-edit-alt"
            style={{
              fontSize: '1 em',
              cursor: 'pointer',
              paddingLeft:'5px'
            }}
            onClick={() => {
              preUpdateOrder(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1 em', cursor: 'pointer' ,paddingLeft:'5px'}}
            onClick={() => {
              setOrderIdToBeDeleted(item.o_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
    }
    else
    {
      item.o_approved_status = "Out for Delivery";
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
              fontSize: '1 em',
              cursor: 'pointer',
            }}
            onClick={() => {
              preUpdateOrder(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1 em', cursor: 'pointer',paddingLeft:'5px' }}
            onClick={() => {
              setOrderIdToBeDeleted(item.o_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
    }

      
      item.id = index + 1;

      orderData.push(item);
    });
    setOrdersTemp(orderData);
  }, [orders]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },

      {
        label: 'ID',
        field: 'o_number',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Date',
        field: 'o_date',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'From',
        field: 'o_from',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Name',
        field: 'customer_name',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Amount',
        field: 'o_subtotal',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Charges',
        field: 'o_delivery_charge',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'GST',
        field: 'o_gst',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Total',
        field: 'o_total',
        sort: 'asc',
        width: 70,
      },
      

       {
         label: 'Status',
         field: 'o_approved_status',
         sort: 'asc',
         width: 100,
       },

      {
        label: 'Action',
        field: 'action',
        sort: 'disabled',
        width: 100,
      },
    ],
    rows: ordersTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setOrderObject({
      ...orderObject,
      [name]: value,
    });
  };
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
          <Breadcrumbs title="Home" breadcrumbItem="Orders" />
          { <Row hidden>
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
                            Defaul Order
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
                            name="default_order"
                            value={orderObject.default_order}
                            placeholder="Default order"
                            type="text"
                            errorMessage="Enter Default order"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Sub Order</Label>
                          <AvField
                            name="product_sub_order"
                            value={orderObject.product_sub_order}
                            placeholder="Sub order"
                            type="text"
                            errorMessage="Enter Sub Order"
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
                            Sub Order value
                          </Label>
                          <AvField
                            name="sub_order_value"
                            value={orderObject.sub_order_value}
                            placeholder="Sub order value"
                            type="text"
                            errorMessage="Enter sub order value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
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
          </Row> }
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <MDBDataTable responsive bordered data={data} />
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

export default withRouter(connect(mapStateToProps, { apiError })(Orders));

Orders.propTypes = {
  error: PropTypes.any,
  orders: PropTypes.array,
};