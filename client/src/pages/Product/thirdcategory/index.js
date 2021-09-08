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
  CardThirdtitle,
  Button,
  Label,
  Modal,
} from 'reactstrap';

import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import {
  getThirdcategories,
  addThirdcategory,
  deleteThirdcategory,
  toggleActiveStatus,
  apiError,
  updateThirdcategory,
  getSubcategoryOptions
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './thirdcategory.scss';

const Thirdcategories = (props) => {
  const [toggleSwitch, settoggleSwitch] = useState(true);

  const [thirdcategoryObject, setThirdcategoryObject] = useState({});
  const [thirdcategoriesTemp, setThirdcategoriesTemp] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [thirdcategoryIdTobeUpdated, setThirdcategoryIdToBeUpdated] = useState(null);
  const [thirdcategoryIdToBeDeleted, setThirdcategoryIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    thirdcategories,
   addingThirdcategory,
    addThirdcategoryResponse,
   deleteThirdcategoryResponse,
    updateThirdcategoryResponse,
    statusThirdcategoryResponse,
    error,
  } = useSelector((state) => state.thirdcategories);

  const subcategoryListOptions = useSelector((state) => state.subcategories.SubcategoryOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThirdcategories());
    dispatch(getSubcategoryOptions());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));

      setUserId(obj.user);
      setThirdcategoryObject({ ['auth_userid']: userId });
      console.log(userId);
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addThirdcategoryResponse.type === 'success') {
      toastr.success(addThirdcategoryResponse.message);
    } else if (addThirdcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, addThirdcategoryResponse.message);
    }
  }, [addThirdcategoryResponse]);

  useEffect(() => {
    if (deleteThirdcategoryResponse.type === 'success') {
      toastr.success(deleteThirdcategoryResponse.message);
    } else if (deleteThirdcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, deleteThirdcategoryResponse.message);
    }
  }, [deleteThirdcategoryResponse]);

  useEffect(() => {
    if (statusThirdcategoryResponse.type === 'success') {
      toastr.success(statusThirdcategoryResponse.message);
    } else if (statusThirdcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, statusThirdcategoryResponse.message);
    }
  }, [statusThirdcategoryResponse]);

  useEffect(() => {
    if (updateThirdcategoryResponse.type === 'success') {
      setShowModal(false);
      setThirdcategoryIdToBeUpdated(null);
      // setPasswordObject({});
      setThirdcategoryIdToBeUpdated(null);
      toastr.success(updateThirdcategoryResponse.message);
    } else if (updateThirdcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, updateThirdcategoryResponse.message);
    }
  }, [updateThirdcategoryResponse]);

  let preupdateThirdcategory = (item) => {
    if(item.subcategory) {
      let subcategories = {
        label: item.subcategory.subcategory_name_english,
        value: item.subcategory.subcategory_id,
      };
      handleSelectedSubcategory(subcategories);
    }
    setThirdcategoryIdToBeUpdated(item.thirdcategory_id);
    setThirdcategoryObject(item);
  };

  useEffect(() => {
    let unitsDuplicate = JSON.parse(JSON.stringify(thirdcategories));
    let unitData = [];
    unitsDuplicate.map((item, index) => {
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.auth_userid = userId;
      item.subcategoryname = item.subcategory && item.subcategory.subcategory_name_english;
      item.action = (
        <div style={{ textAlign: 'center' }}>
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
                preupdateThirdcategory(item);
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: '1.3em', cursor: 'pointer' }}
              onClick={() => {
                setThirdcategoryIdToBeDeleted(item.thirdcategory_id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        </div>
      );
      item.id = index + 1;
      if(item.third_cat_img!='')
      {
        item.third_cat_img = (
          <div style={{ textAlign: 'center' }}>
            <img src={`subcategory_images/${item.third_cat_img}`} />
          </div>
        );
      }
     
      if (item.thrdcate_is_active === 0) {
        item.thrdcate_is_active = (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div
              class="form-check form-switch mb-3"
              style={{ textAlign: 'center', marginLeft: '40%' }}
            >
              <input
                type="checkbox"
                class="form-check-input"
                id="customSwitch2"
                defaultChecked
                onClick={(e) => {
                  dispatch(toggleActiveStatus(item.thirdcategory_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      } else {
        console.log(item.thrdcate_is_active);
        item.thrdcate_is_active = (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <div
              class="form-check form-switch mb-3"
              style={{ textAlign: 'center', marginLeft: '40%' }}
            >
              <input
                type="checkbox"
                class="form-check-input"
                id="customSwitch2"
                onClick={(e) => {
                  dispatch(toggleActiveStatus(item.thirdcategory_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      }

      unitData.push(item);
    });
    setThirdcategoriesTemp(unitData);
  }, [thirdcategories]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },
      {
        label: 'SubCategory',
        field: 'subcategoryname',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'ThirdCategory Name English',
        field: 'thrdcate_name_english',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'ThirdCategory Name Malayalam ',
        field: 'thrdcate_name_malayalam',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Thirdcategory Image',
        field: 'third_cat_img',
        sort: 'asc',
        width: 70,
      },
    
      {
        label: 'Status',
        field: 'thrdcate_is_active',
        sort: 'asc',
        width: 70,
      },

      {
        label: 'Added by',
        field: 'fname',
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
    rows: thirdcategoriesTemp,
  };


  let subcategoryOptionsData =
  subcategoryListOptions &&
  subcategoryListOptions.map((item) => {
    return {
      label: item.subcategory_name_english,
      value: item.subcategory_id,
    };
  });

const subcategoryOptionsGroup = [
  {
    options: subcategoryOptionsData, 
  },
];

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setThirdcategoryObject({
      ...thirdcategoryObject,
      [name]: value,
    });
  };
  let onChangeHandler = (event) => {
    //console.log(event.target.files[0])
    //setSelectedFile(event.target.files[0]);
    //categoryObject.push(image:event.target.files[0])
    //setCategoryObject({...categoryObject, file:event.target.files[0]})
  };

  function handleSelectedSubcategory(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };

    setSelectedSubcategory(value);
    console.log(newValue._id);
    setThirdcategoryObject({ ...thirdcategoryObject, newValue });
  }

    const handleValidThirdmitUnit = (event, values) => {
    var formData = new FormData();
    var imagefile = document.querySelector('#category_icon_svg');
    formData.append('category_name', 'test');
    formData.append('file', imagefile.files[0]);

    console.log(Object.keys(formData));
    thirdcategoryIdTobeUpdated
      ? dispatch(updateThirdcategory(thirdcategoryObject))
      : dispatch(addThirdcategory(thirdcategoryObject));
  };

  //   let handleChangeImageUpload =(event) => {
  // setCategoryObject({...categoryObject, unitlogo:event.target.files[0]})
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
            dispatch(deleteThirdcategory(thirdcategoryIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Thirdcategories" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidThirdmit={(e, v) => {
                      handleValidThirdmitUnit(e, v);
                    }}
                  >
                    <Row>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Third Category Name(English)
                          </Label>

                          <AvField
                            name="category_name"
                            value={thirdcategoryObject.category_name}
                            placeholder="Category Name"
                            type="text"
                            errorMessage="Enter Category Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Third Category Name(Malayalam)
                          </Label>

                          <AvField
                            name="category_name"
                            value={thirdcategoryObject.category_name}
                            placeholder="Category Name"
                            type="text"
                            errorMessage="Enter Category Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Sub Category
                          </Label>
                          <Select
                            name="category_id"
                            value={selectedSubcategory}
                            onChange={(value) => {
                                handleSelectedSubcategory(value);
                              }}
                              options={subcategoryOptionsGroup}
                              classNamePrefix="select2-selection"
                        
                            validate={{ required: { value: true } }}
                            
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Image</Label>
                          <AvField
                            name="category_icon_svg"
                            id="category_icon_svg"
                            type="file"
                            errorMessage="Upload Category Icon"
                            className="form-control"
                            onChange={onChangeHandler}
                          />
                        </div>
                      </Col>
                     
                     
                     
                      <Col md="3" >
                      <div className="mt-4">
                      {thirdcategoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingThirdcategory ? true : false}
                      >
                        {addingThirdcategory ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingThirdcategory ? true : false}
                      >
                        {addingThirdcategory ? 'Adding' : 'submit'}
                      </Button>
                    )}
                      </div>
                      </Col>
                    </Row>

                    
                  </AvForm>
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

export default withRouter(connect(mapStateToProps, { apiError })(Thirdcategories));

Thirdcategories.propTypes = {
  error: PropTypes.any,
  thirdcategories: PropTypes.array,
};


