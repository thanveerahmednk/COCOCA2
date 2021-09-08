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
  getSuppliers,
  addSupplier,
  deleteSupplier,
  apiError,
  updateSupplier,
  getStatesOptions,
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './supplier.scss';

const Suppliers = (props) => {
  //   const [selectedsupplierpremium, setSelectedSupplierPremium] = useState(null);

  const [supplierObject, setSupplierObject] = useState({});
  const [suppliersTemp, setSuppliersTemp] = useState([]);
  const [selectedStates, setSelectedState] = useState(null);
  const [supplierIdTobeUpdated, setSupplierIdToBeUpdated] = useState(null);
  const [supplierIdToBeDeleted, setSupplierIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    suppliers,
    addingSupplier,
    addSupplierResponse,
    deleteSupplierResponse,
    updateSupplierResponse,
    error,
  } = useSelector((state) => state.suppliers);

 
  const stateListOptions = useSelector((state) => state.states.statesOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(getStatesOptions());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));
      console.log(obj);

      setUserId(obj.user);
      setSupplierObject({ ['auth_userid']: userId });
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addSupplierResponse.type === 'success') {
      toastr.success(addSupplierResponse.message);
    } else if (addSupplierResponse.type === 'failure') {
      toastr.error(error.data.message, addSupplierResponse.message);
    }
  }, [addSupplierResponse]);

  useEffect(() => {
    if (deleteSupplierResponse.type === 'success') {
      toastr.success(deleteSupplierResponse.message);
    } else if (deleteSupplierResponse.type === 'failure') {
      toastr.error(error.data.message, deleteSupplierResponse.message);
    }
  }, [deleteSupplierResponse]);

  useEffect(() => {
    if (updateSupplierResponse.type === 'success') {
      setShowModal(false);
      setSupplierIdToBeUpdated(null);
      // setPasswordObject({});
      setSupplierIdToBeUpdated(null);
      toastr.success(updateSupplierResponse.message);
    } else if (updateSupplierResponse.type === 'failure') {
      toastr.error(error.data.message, updateSupplierResponse.message);
    }
  }, [updateSupplierResponse]);

  let preUpdateSupplier = (item) => {
    if (item.state) {
        let states = {
          label: item.privilage.privilege_name,
          value: item.privilage.id,
        };
        handleSelectedStates(states);
      }
    setSupplierIdToBeUpdated(item.supplier_id);
    setSupplierObject(item);
  };
  let viewcartSupplier = (item) => {
    
  }

  useEffect(() => {
    let suppliersDuplicate = JSON.parse(JSON.stringify(suppliers));
    let supplierData = [];
    suppliersDuplicate.map((item, index) => {
      item.auth_userid = userId;
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.statename = item.State && item.State.name;
      //item.community_name = item.Community.community_name;
    
      item.action = (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              preUpdateSupplier(item);
            }}
          ></i>
          <i
            className="uil-trash-alt"
            style={{ fontSize: '1.3em', cursor: 'pointer' }}
            onClick={() => {
              setSupplierIdToBeDeleted(item.supplier_id);
              setConfirmDeleteAlert(true);
            }}
          ></i>
         
        </div>
      );
      item.id = index + 1;

      supplierData.push(item);
    });
    setSuppliersTemp(supplierData);
  }, [suppliers]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 100,
      },
     

      {
        label: 'Supplier Name',
        field: 'supplier_name_en',
        sort: 'asc',
        width: 100,
      },
      
      {
        label: 'Contact Person',
        field: 'supplier_contact_person',
        sort: 'asc',
        width: 100,
      },
     
      

      {
        label: 'Contact No(1)',
        field: 'supplier_contact_primary',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Contact No(2)',
        field: 'supplier_contact_alternative',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Email',
        field: 'supplier_email',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Address',
        field: 'supplier_address',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'TRN',
        field: 'supplier_trn',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'State',
        field: 'statename',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Account no',
        field: 'supplier_account_no',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Bank Name',
        field: 'supplier_bank_name',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Branch Name',
        field: 'supplier_branch_name',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'GST',
        field: 'supplier_gst',
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
    rows: suppliersTemp,
  };


  let statesOptionsData =
  stateListOptions &&
  stateListOptions.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

const statessOptionsGroup = [
  {
    options: statesOptionsData,
  },
];

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSupplierObject({
      ...supplierObject,
      [name]: value,
    });
  };

 
  function handleSelectedStates(e) {
    let name = "supplier_state_id";
    let value = e.value;

    setSelectedState(e);
    setSupplierObject({
      ...supplierObject,
      [name]: value,
    });
  }
   
  const handleValidSubmitSupplier = (event, values) => {
    supplierIdTobeUpdated
      ? dispatch(updateSupplier(supplierObject))
      : dispatch(addSupplier(supplierObject));
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
            dispatch(deleteSupplier(supplierIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Suppliers" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmitSupplier(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Supplier Name
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
                            name="supplier_name_en"
                            value={supplierObject.supplier_name_en}
                            placeholder="Supplier Name"
                            type="text"
                            errorMessage="Enter Supplier Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Contact Person</Label>
                          <AvField
                            name="supplier_contact_person"
                            value={supplierObject.supplier_contact_person}
                            placeholder="Mobile Number"
                            type="text"
                            errorMessage="Enter Contact Person"
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
                            Contact Number(Primary)
                          </Label>
                          <AvField
                            name="supplier_contact_primary"
                            value={supplierObject.supplier_contact_primary}
                            placeholder="Supplier Email"
                            type="text"
                            errorMessage="Enter Contact "
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Alternative Number
                          </Label>
                          <AvField
                            name="supplier_contact_alternative"
                            value={supplierObject.supplier_contact_alternative}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Email Address
                          </Label>
                          <AvField
                            name="supplier_email"
                            value={supplierObject.supplier_email}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter Email"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Contact Address
                          </Label>
                          <AvField
                            name="supplier_address"
                            value={supplierObject.supplier_address}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter Address"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label>State</Label>
                          <Select
                            name="supplier_state_id"
                            value={selectedStates}
                            onChange={(value) => {
                              handleSelectedStates(value);
                            }}
                            options={statessOptionsGroup}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            TRN
                          </Label>
                          <AvField
                            name="supplier_trn"
                            value={supplierObject.supplier_trn}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Account No
                          </Label>
                          <AvField
                            name="supplier_account_no"
                            value={supplierObject.supplier_account_no}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Bank Name
                          </Label>
                          <AvField
                            name="supplier_bank_name"
                            value={supplierObject.supplier_bank_name}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Branch Name
                          </Label>
                          <AvField
                            name="supplier_branch_name"
                            value={supplierObject.supplier_branch_name}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            GST
                          </Label>
                          <AvField
                            name="supplier_gst"
                            value={supplierObject.supplier_gst}
                            placeholder="Apartment No"
                            type="text"
                            errorMessage="Enter sub supplier value"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom03"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                    </Row>
                    {supplierIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSupplier ? true : false}
                      >
                        {addingSupplier ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSupplier ? true : false}
                      >
                        {addingSupplier ? 'Adding' : 'Submit'}
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
                  <MDBDataTable responsive bsuppliered data={data} />
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

export default withRouter(connect(mapStateToProps, { apiError })(Suppliers));

Suppliers.propTypes = {
  error: PropTypes.any,
  suppliers: PropTypes.array,
};