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
  getCommunityrequests,
  addCommunityrequest,
  deleteCommunityrequest,
  apiError,
  updateCommunityrequest,
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './communityrequest.scss';

const Communityrequests = (props) => {
  //   const [selectedunitpremium, setSelectedCommunityrequestPremium] = useState(null);

  const [communityrequestObject, setCommunityrequestObject] = useState({});
  const [communityrequestsTemp, setCommunityrequestsTemp] = useState([]);

  const [communityrequestIdTobeUpdated, setCommunityrequestIdToBeUpdated] = useState(null);
  const [communityrequestIdToBeDeleted, setCommunityrequestIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    communityrequests,
    addingCommunityrequest,
    addCommunityrequestResponse,
    deleteCommunityrequestResponse,
    updateCommunityrequestResponse,
    error,
  } = useSelector((state) => state.communityrequests);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunityrequests());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));
      console.log(obj);

      setUserId(obj.user);
      setCommunityrequestObject({ ['auth_userid']: userId });
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addCommunityrequestResponse.type === 'success') {
      toastr.success(addCommunityrequestResponse.message);
    } else if (addCommunityrequestResponse.type === 'failure') {
      toastr.error(error.data.message, addCommunityrequestResponse.message);
    }
  }, [addCommunityrequestResponse]);

  useEffect(() => {
    if (deleteCommunityrequestResponse.type === 'success') {
      toastr.success(deleteCommunityrequestResponse.message);
    } else if (deleteCommunityrequestResponse.type === 'failure') {
      toastr.error(error.data.message, deleteCommunityrequestResponse.message);
    }
  }, [deleteCommunityrequestResponse]);

  useEffect(() => {
    if (updateCommunityrequestResponse.type === 'success') {
      setShowModal(false);
      setCommunityrequestIdToBeUpdated(null);
      // setPasswordObject({});
      setCommunityrequestIdToBeUpdated(null);
      toastr.success(updateCommunityrequestResponse.message);
    } else if (updateCommunityrequestResponse.type === 'failure') {
      toastr.error(error.data.message, updateCommunityrequestResponse.message);
    }
  }, [updateCommunityrequestResponse]);

  let preUpdateCommunityrequest = (item) => {
    setCommunityrequestIdToBeUpdated(item.request_id);
    setCommunityrequestObject(item);
  };

  useEffect(() => {
    let communityrequestsDuplicate = JSON.parse(JSON.stringify(communityrequests));
    let communityrequestData = [];
    communityrequestsDuplicate.map((item, index) => {
      // item.fname = item.User.fname + ' ' + item.User.lname;
      // item.auth_userid = userId;
      item.action = (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              preUpdateCommunityrequest(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setCommunityrequestIdToBeDeleted(item.request_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
        </div>
      );
      item.id = index + 1;

      communityrequestData.push(item);
    });
    setCommunityrequestsTemp(communityrequestData);
  }, [communityrequests]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },

      {
        label: 'Request Name',
        field: 'request_name',
        sort: 'asc',
        width: 14,
      },
      {
        label: 'Email',
        field: 'request_email',
        sort: 'asc',
        width: 50,
      },
      {
        label: 'Address 1',
        field: 'request_address1',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Address 2',
        field: 'request_address2',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Pincode',
        field: 'request_pincode',
        sort: 'asc',
        width: 7,
      },
      {
        label: 'City',
        field: 'request_city',
        sort: 'asc',
        width: 15,
      },
      {
        label: 'State',
        field: 'request_state_id',
        sort: 'asc',
        width: 30,
      },

      // {
      //   label: 'Added by',
      //   field: 'fname',
      //   sort: 'asc',
      //   width: 100,
      // },

      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: communityrequestsTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCommunityrequestObject({
      ...communityrequestObject,
      [name]: value,
    });
  };
  const handleValidSubmitCommunityrequest = (event, values) => {
    communityrequestIdTobeUpdated
      ? dispatch(updateCommunityrequest(communityrequestObject))
      : dispatch(addCommunityrequest(communityrequestObject));
  };

  //   let handleChangeImageUpload =(event) => {
  // setCommunityrequestObject({...unitObject, unitlogo:event.target.files[0]})
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
            dispatch(deleteCommunityrequest(communityrequestIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Community Requests" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  {/* <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmitCommunityrequest(e, v);
                    }}
                  > */}
                {/* <Row> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Request Name
                          </Label> */}
                          {/* <AvField
                            name="createdBy"
                            value={userId}
                            type="hidden"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          /> */}

                          {/* <AvField
                            name="request_name"
                            value={communityrequestObject.request_name}
                            placeholder="request name"
                            type="text"
                            errorMessage="Enter Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}

                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Request Email</Label>
                          <AvField
                            name="request_email"
                            value={communityrequestObject.request_email}
                            placeholder="Email"
                            type="text"
                            errorMessage="Enter Email"
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
                            Request Address
                          </Label>
                          <AvField
                            name="request_address1"
                            value={communityrequestObject.request_address1}
                            placeholder="Address 1"
                            type="text"
                            errorMessage="Enter Address"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Request Address(2)
                          </Label>
                          <AvField
                            name="request_address2"
                            value={communityrequestObject.request_address2}
                            placeholder="Address 2"
                            type="text"
                            errorMessage="Enter Address2"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Request Pincode
                          </Label>
                          <AvField
                            name="request_pincode"
                            value={communityrequestObject.request_pincode}
                            placeholder="Pincode"
                            type="text"
                            errorMessage="Enter sub unit value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Request City
                          </Label>
                          <AvField
                            name="request_city"
                            value={communityrequestObject.request_city}
                            placeholder="city"
                            type="text"
                            errorMessage="Enter sub unit value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                        State
                          </Label>
                          <AvField
                            name="request_state_id"
                            value={communityrequestObject.request_state_id}
                            placeholder="city"
                            type="number"
                            errorMessage="Enter sub unit value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col> */}
                   {/* </Row> */}
{/* 
                    {communityrequestIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCommunityrequest ? true : false}
                      >
                        {addingCommunityrequest ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCommunityrequest ? true : false}
                      >
                        {addingCommunityrequest ? 'Adding' : 'Submit'}
                      </Button>
                    )} */}
                  {/* </AvForm> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
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

export default withRouter(connect(mapStateToProps, { apiError })(Communityrequests));

Communityrequests.propTypes = {
  error: PropTypes.any,
  communityrequests: PropTypes.array,
};
