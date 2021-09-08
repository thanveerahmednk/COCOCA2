import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import jwt_decode from 'jwt-decode';
import moment  from 'moment';
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
  getStocklogs,

 
  apiError,
  
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './stocklog.scss';

const Stocklogs = (props) => {
  //   const [selectedstockpremium, setSelectedStockPremium] = useState(null);

  const [stocklogObject, setStocklogObject] = useState({});
  const [stocklogsTemp, setStocklogsTemp] = useState([]);

 const [stocklogIdTobeUpdated, setStocklogIdToBeUpdated] = useState(null);
 const [stocklogIdToBeDeleted, setStocklogIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    stocklogs,
    addingStock,
    addStockResponse,
    deleteStockResponse,
    updateStockResponse,
    error,
  } = useSelector((state) => state.stocklogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStocklogs());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));
      console.log(obj);

      setUserId(obj.user);
      setStocklogObject({ ['auth_userid']: userId });
    }
  }, [props.success, props]);

//   useEffect(() => {
//     if (addStockResponse.type === 'success') {
//       toastr.success(addStockResponse.message);
//     } else if (addStockResponse.type === 'failure') {
//       toastr.error(error.data.message, addStockResponse.message);
//     }
//   }, [addStockResponse]);

//   useEffect(() => {
//     if (deleteStockResponse.type === 'success') {
//       toastr.success(deleteStockResponse.message);
//     } else if (deleteStockResponse.type === 'failure') {
//       toastr.error(error.data.message, deleteStockResponse.message);
//     }
//   }, [deleteStockResponse]);

//   useEffect(() => {
//     if (updateStockResponse.type === 'success') {
//       setShowModal(false);
//       setStockIdToBeUpdated(null);
//       // setPasswordObject({});
//       setStockIdToBeUpdated(null);
//       toastr.success(updateStockResponse.message);
//     } else if (updateStockResponse.type === 'failure') {
//       toastr.error(error.data.message, updateStockResponse.message);
//     }
//   }, [updateStockResponse]);

//   let preUpdateStock = (item) => {
//     setStockIdToBeUpdated(item.stock_id);
//     setStockObject(item);
//   };

  useEffect(() => {
    let stocklogsDuplicate = JSON.parse(JSON.stringify(stocklogs));
    let stocklogData = [];
    stocklogsDuplicate.map((item, index) => {
        
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.auth_userid = userId;
    item.product_name_english = item.product.product_name_english;
    item.branch_name = item.Branch.branch_name;
    item.createdAt = moment(item.createdAt).format('DD/MM/YYYY');
      item.action = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* //   <i
            className="uil-key-skeleton"
            style={{ fontSize: "1.3em", cursor: "pointer" }}
            onClick={() => {
              preUpdateUserPassword(item);
            }}
          ></i> */}
          {/* <i
            className="uil-edit-alt"
            style={{
              fontSize: '1.3em',
              cursor: 'pointer',
              marginLeft: '1rem',
              marginRight: '1rem',
            }}
            onClick={() => {
              preUpdateStock(item);
            }}
          ></i> */}
          {/* <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setStockIdToBeDeleted(item.stock_id);
              setConfirmDeleteAlert(true);
            }}
          ></i> */}
        </div>
      );
      item.id = index + 1;

      stocklogData.push(item);
    });
    setStocklogsTemp(stocklogData);
  }, [stocklogs]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },

      {
        label: 'Product Name',
        field: 'product_name_english',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Product Qty',
        field: 'stock_log_product_qty',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Log Qty',
        field: 'stock_log_qty',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Current Qty',
        field: 'stock_log_current_qty',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Product Cost',
        field: 'stock_log_product_cost',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Activity',
        field: 'stock_log_activity',
        sort: 'asc',
        width: 70,
      },
     
      {
        label: 'Branch',
        field: 'branch_name',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Created On',
        field: 'createdAt',
        sort: 'asc',
        width: 70,
      },

      {
        label: 'Created by',
        field: 'fname',
        sort: 'asc',
        width: 100,
      },
     
      // {
      //   label: 'Action',
      //   field: 'action',
      //   sort: 'asc',
      //   width: 100,
      // },
    ],
    rows: stocklogsTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setStocklogObject({
      ...stocklogObject,
      [name]: value,
    });
  };
//   const handleValidSubmitStock = (event, values) => {
//     stocklogIdTobeUpdated
//       ? dispatch(updateStocklog(stocklogObject))
//       : dispatch(addStocklog(stocklogObject));
//   };

  //   let handleChangeImageUpload =(event) => {
  // setStockObject({...stockObject, stocklogo:event.target.files[0]})
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
          //  dispatch(deleteStocklog(stocklogIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Stock Logs" />
          {/* <Row>
            <Col xl="12">
              <Card>
                <CardBody> */}
                  {/* <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmitStock(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Defaul Stock
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
                            name="default_stock"
                            value={stockObject.default_stock}
                            placeholder="Default stock"
                            type="text"
                            errorMessage="Enter Default stock"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Sub Stock</Label>
                          <AvField
                            name="product_sub_stock"
                            value={stockObject.product_sub_stock}
                            placeholder="Sub stock"
                            type="text"
                            errorMessage="Enter Sub Stock"
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
                            Sub Stock value
                          </Label>
                          <AvField
                            name="sub_stock_value"
                            value={stockObject.sub_stock_value}
                            placeholder="Sub stock value"
                            type="text"
                            errorMessage="Enter sub stock value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                    </Row>

                    {stockIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingStock ? true : false}
                      >
                        {addingStock ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingStock ? true : false}
                      >
                        {addingStock ? 'Adding' : 'Submit'}
                      </Button>
                    )}
                  </AvForm> */}
                {/* </CardBody>
              </Card>
            </Col>
          </Row> */}
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

export default withRouter(connect(mapStateToProps, { apiError })(Stocklogs));

Stocklogs.propTypes = {
  error: PropTypes.any,
  stocklogs: PropTypes.array,
};
