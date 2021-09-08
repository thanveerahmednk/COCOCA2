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
  getSubcategories,
  addSubcategory,
  deleteSubcategory,
  toggleActiveStatus,
  apiError,
  updateSubcategory,
  getCategoryOptions
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './subcategory.scss';

const Subcategories = (props) => {
  const [toggleSwitch, settoggleSwitch] = useState(true);

  const [subcategoryObject, setSubcategoryObject] = useState({});
  const [subcategoriesTemp, setSubcategoriesTemp] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategoryIdTobeUpdated, setSubcategoryIdToBeUpdated] = useState(null);
  const [subcategoryIdToBeDeleted, setSubcategoryIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    subcategories,
   addingSubcategory,
    addSubcategoryResponse,
   deleteSubcategoryResponse,
    updateSubcategoryResponse,
    statusSubcategoryResponse,
    error,
  } = useSelector((state) => state.subcategories);

  const categoryListOptions = useSelector((state) => state.categories.categoryOptions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategories());
    dispatch(getCategoryOptions());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));

      setUserId(obj.user);
      setSubcategoryObject({ ['auth_userid']: userId });
      console.log(userId);
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addSubcategoryResponse.type === 'success') {
      toastr.success(addSubcategoryResponse.message);
    } else if (addSubcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, addSubcategoryResponse.message);
    }
  }, [addSubcategoryResponse]);

  useEffect(() => {
    if (deleteSubcategoryResponse.type === 'success') {
      toastr.success(deleteSubcategoryResponse.message);
    } else if (deleteSubcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, deleteSubcategoryResponse.message);
    }
  }, [deleteSubcategoryResponse]);

  useEffect(() => {
    if (statusSubcategoryResponse.type === 'success') {
      toastr.success(statusSubcategoryResponse.message);
    } else if (statusSubcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, statusSubcategoryResponse.message);
    }
  }, [statusSubcategoryResponse]);

  useEffect(() => {
    if (updateSubcategoryResponse.type === 'success') {
      setShowModal(false);
      setSubcategoryIdToBeUpdated(null);
      // setPasswordObject({});
      setSubcategoryIdToBeUpdated(null);
      toastr.success(updateSubcategoryResponse.message);
    } else if (updateSubcategoryResponse.type === 'failure') {
      toastr.error(error.data.message, updateSubcategoryResponse.message);
    }
  }, [updateSubcategoryResponse]);

  let preupdateSubcategory = (item) => {
    if(item.category) {
      let categories = {
        label: item.category.category_name_english,
        value: item.category.category_id,
      };
      handleSelectedCategory(categories);
    }
    setSubcategoryIdToBeUpdated(item.subcategory_id);
    setSubcategoryObject(item);
  };

  useEffect(() => {
    let unitsDuplicate = JSON.parse(JSON.stringify(subcategories));
    let unitData = [];
    unitsDuplicate.map((item, index) => {
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.auth_userid = userId;
      item.categoryname = item.category && item.category.category_name_english;
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
                preupdateSubcategory(item);
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: '1.3em', cursor: 'pointer' }}
              onClick={() => {
                setSubcategoryIdToBeDeleted(item.subcategory_id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        </div>
      );
      item.id = index + 1;
      if(item.subcategory_icon_svg!='')
      {
        item.sub_image_name = (
          <div style={{ textAlign: 'center' }}>
            <img src={`subcategory_images/${item.sub_image_name}`} />
          </div>
        );
      }
     
      if (item.subcategory_is_active === 0) {
        item.subcategory_is_active = (
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
                  dispatch(toggleActiveStatus(item.subcategory_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      } else {
        console.log(item.subcategory_is_active);
        item.category_is_active = (
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
                  dispatch(toggleActiveStatus(item.subcategory_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      }

      unitData.push(item);
    });
    setSubcategoriesTemp(unitData);
  }, [subcategories]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },
      {
        label: 'Category',
        field: 'categoryname',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'subCategory Name English',
        field: 'subcategory_name_english',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'SubCategory Name Malayalam ',
        field: 'subcategory_name_malayalam',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Subcategory Image',
        field: 'sub_image_name',
        sort: 'asc',
        width: 70,
      },
    
      {
        label: 'Status',
        field: 'subcategory_is_active',
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
    rows: subcategoriesTemp,
  };


  let categoryOptionsData =
  categoryListOptions &&
  categoryListOptions.map((item) => {
    return {
      label: item.category_name_english,
      value: item.category_id,
    };
  });

const categoryOptionsGroup = [
  {
    options: categoryOptionsData,
  },
];

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSubcategoryObject({
      ...subcategoryObject,
      [name]: value,
    });
  };
  let onChangeHandler = (event) => {
    //console.log(event.target.files[0])
    //setSelectedFile(event.target.files[0]);
    //categoryObject.push(image:event.target.files[0])
    //setCategoryObject({...categoryObject, file:event.target.files[0]})
  };

  function handleSelectedCategory(value) {
    let newValue = {
      name: value.label,
      _id: value.value,
    };

    setSelectedCategory(value);
    console.log(newValue._id
      );
    setSubcategoryObject({ ...subcategoryObject, newValue });
  }

  const handleValidSubmitUnit = (event, values) => {
    var formData = new FormData();
    var imagefile = document.querySelector('#category_icon_svg');
    formData.append('category_name', 'test');
    formData.append('file', imagefile.files[0]);

    console.log(Object.keys(formData));
    subcategoryIdTobeUpdated
      ? dispatch(updateSubcategory(subcategoryObject))
      : dispatch(addSubcategory(subcategoryObject));
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
            dispatch(deleteSubcategory(subcategoryIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Subcategories" />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <AvForm
                    className="needs-validation"
                    onValidSubmit={(e, v) => {
                      handleValidSubmitUnit(e, v);
                    }}
                  >
                    <Row>
                    <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom03">
                            Category
                          </Label>
                          <Select
                            name="subcategory_id"
                            value={selectedCategory}
                            onChange={(value) => {
                                handleSelectedCategory(value);
                              }}
                              options={categoryOptionsGroup}
                              classNamePrefix="select2-selection"
                        
                            validate={{ required: { value: true } }}
                            
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                           Sub Category Name(English)
                          </Label>

                          <AvField
                            name="subcategory_name_english"
                            value={subcategoryObject.subcategory_name_english}
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
                           Sub Category Name(Malayalam)
                          </Label>

                          <AvField
                            name="subcategory_name_malayalam"
                            value={subcategoryObject.subcategory_name_malayalam}
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
                          <Label htmlFor="validationCustom02">Subcategory Image</Label>
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
                      {subcategoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSubcategory ? true : false}
                      >
                        {addingSubcategory ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSubcategory ? true : false}
                      >
                        {addingSubcategory ? 'Adding' : 'Submit'}
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

export default withRouter(connect(mapStateToProps, { apiError })(Subcategories));

Subcategories.propTypes = {
  error: PropTypes.any,
  subcategories: PropTypes.array,
};


