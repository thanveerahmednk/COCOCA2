

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
  getCategories,
 addCategory,
  deleteCategory,
  toggleActiveStatus,
  apiError,
  updateCategory,
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './category.scss';

const Categories = (props) => {
  const [toggleSwitch, settoggleSwitch] = useState(true);

  const [categoryObject, setCategoryObject] = useState({});
  const [categoriesTemp, setCategoriesTemp] = useState([]);

  const [categoryIdTobeUpdated, setCategoryIdToBeUpdated] = useState(null);
  const [categoryIdToBeDeleted, setCategoryIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    categories,
   addingCategory,
    addCategoryResponse,
   deleteCategoryResponse,
    updateCategoryResponse,
    statusCategoryResponse,
    error,
  } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));

      setUserId(obj.user);
      setCategoryObject({ ['auth_userid']: userId });
      console.log(userId);
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addCategoryResponse.type === 'success') {
      toastr.success(addCategoryResponse.message);
    } else if (addCategoryResponse.type === 'failure') {
      toastr.error(error.data.message, addCategoryResponse.message);
    }
  }, [addCategoryResponse]);

  useEffect(() => {
    if (deleteCategoryResponse.type === 'success') {
      toastr.success(deleteCategoryResponse.message);
    } else if (deleteCategoryResponse.type === 'failure') {
      toastr.error(error.data.message, deleteCategoryResponse.message);
    }
  }, [deleteCategoryResponse]);

  useEffect(() => {
    if (statusCategoryResponse.type === 'success') {
      toastr.success(statusCategoryResponse.message);
    } else if (statusCategoryResponse.type === 'failure') {
      toastr.error(error.data.message, statusCategoryResponse.message);
    }
  }, [statusCategoryResponse]);

  useEffect(() => {
    if (updateCategoryResponse.type === 'success') {
      setShowModal(false);
      setCategoryIdToBeUpdated(null);
      // setPasswordObject({});
      setCategoryIdToBeUpdated(null);
      toastr.success(updateCategoryResponse.message);
    } else if (updateCategoryResponse.type === 'failure') {
      toastr.error(error.data.message, updateCategoryResponse.message);
    }
  }, [updateCategoryResponse]);

  let preupdateCategory = (item) => {
    setCategoryIdToBeUpdated(item.category_id);
    setCategoryObject(item);
  };

  useEffect(() => {
    let unitsDuplicate = JSON.parse(JSON.stringify(categories));
    let unitData = [];
    unitsDuplicate.map((item, index) => {
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.auth_userid = userId;

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
                preupdateCategory(item);
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: '1.3em', cursor: 'pointer' }}
              onClick={() => {
                setCategoryIdToBeDeleted(item.category_id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        </div>
      );
      item.id = index + 1;
      if(item.category_icon_svg!='')
      {
        item.category_icon_svg = (
          <div style={{ textAlign: 'center' }}>
            <img src={`category_icons/${item.category_icon_svg}`} />
          </div>
        );
        item.web_banner_image = (
          <div style={{ textAlign: 'center' }}>
            <img src={`web_images/${item.web_banner_image}`} />
          </div>
        );
        item.mobile_banner_image = (
          <div style={{ textAlign: 'center' }}>
            <img src={`mobile_images/${item.mobile_banner_image}`} />
          </div>
        );
      }
     
      if (item.category_is_active === 0) {
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
                defaultChecked
                onClick={(e) => {
                  dispatch(toggleActiveStatus(item.category_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      } else {
        console.log(item.category_is_active);
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
                  dispatch(toggleActiveStatus(item.category_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      }

      unitData.push(item);
    });
    setCategoriesTemp(unitData);
  }, [categories]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },

      {
        label: 'Category Name',
        field: 'category_name_english',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Category Name Malayalam',
        field: 'category_name_malayalam',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Category Icon',
        field: 'category_icon_svg',
        sort: 'asc',
        width: 70,
      },
      
      {
        label: 'Status',
        field: 'category_is_active',
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
    rows: categoriesTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCategoryObject({
      ...categoryObject,
      [name]: value,
    });
  };
  let onChangeHandler = (event) => {
    //console.log(event.target.files[0])
    //setSelectedFile(event.target.files[0]);
    //categoryObject.push(image:event.target.files[0])
    //setCategoryObject({...categoryObject, file:event.target.files[0]})
  };

  const handleValidSubmitUnit = (event, values) => {
    var formData = new FormData();
    var imagefile = document.querySelector('#category_icon_svg');
    formData.append('category_name', 'test');
    formData.append('file', imagefile.files[0]);

    console.log(Object.keys(formData));
    categoryIdTobeUpdated
      ? dispatch(updateCategory(categoryObject))
      : dispatch(addCategory(categoryObject));
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
            dispatch(deleteCategory(categoryIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Categories" />
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
                          <Label htmlFor="validationCustom01">
                            Category Name English
                          </Label>

                          <AvField
                            name="category_name_english"
                            value={categoryObject.category_name_english}
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
                            Category Name Malayalam
                          </Label>

                          <AvField
                            name="category_name_malayalam"
                            value={categoryObject.category_name_malayalam}
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
                          <Label htmlFor="validationCustom02">Icon (svg)</Label>
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
                      {categoryIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCategory ? true : false}
                      >
                        {addingCategory ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingCategory ? true : false}
                      >
                        {addingCategory ? 'Adding' : 'Submit'}
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

export default withRouter(connect(mapStateToProps, { apiError })(Categories));

Categories.propTypes = {
  error: PropTypes.any,
  categories: PropTypes.array,
};
