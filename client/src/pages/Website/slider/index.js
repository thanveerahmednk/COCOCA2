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
  getSliders,
  addSlider,
  deleteSlider,
  toggleActiveStatus,
  apiError,
  updateSlider,
} from '../../../store/actions';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//Import Breadcrumb
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import './slider.scss';

const Sliders = (props) => {
  const [toggleSwitch, settoggleSwitch] = useState(true);

  const [sliderObject, setSliderObject] = useState({});
  const [slidersTemp, setSlidersTemp] = useState([]);

  const [sliderIdTobeUpdated, setSliderIdToBeUpdated] = useState(null);
  const [sliderIdToBeDeleted, setSliderIdToBeDeleted] = useState(null);
  const [confirmDeleteAlert, setConfirmDeleteAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(1);

  const {
    sliders,
    addingSlider,
    addSliderResponse,
    deleteSliderResponse,
    updateSliderResponse,
    statusSliderResponse,
    error,
  } = useSelector((state) => state.sliders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSliders());
  }, []);

  useEffect(() => {
    if (localStorage.getItem('authUser')) {
      const obj = jwt_decode(localStorage.getItem('authUser'));

      setUserId(obj.user);
      setSliderObject({ ['auth_userid']: userId });
      console.log(userId);
    }
  }, [props.success, props]);

  useEffect(() => {
    if (addSliderResponse.type === 'success') {
      toastr.success(addSliderResponse.message);
    } else if (addSliderResponse.type === 'failure') {
      toastr.error(error.data.message, addSliderResponse.message);
    }
  }, [addSliderResponse]);

  useEffect(() => {
    if (deleteSliderResponse.type === 'success') {
      toastr.success(deleteSliderResponse.message);
    } else if (deleteSliderResponse.type === 'failure') {
      toastr.error(error.data.message, deleteSliderResponse.message);
    }
  }, [deleteSliderResponse]);

  useEffect(() => {
    if (statusSliderResponse.type === 'success') {
      toastr.success(statusSliderResponse.message);
    } else if (statusSliderResponse.type === 'failure') {
      toastr.error(error.data.message, statusSliderResponse.message);
    }
  }, [statusSliderResponse]);

  useEffect(() => {
    if (updateSliderResponse.type === 'success') {
      setShowModal(false);
      setSliderIdToBeUpdated(null);
      // setPasswordObject({});
      setSliderIdToBeUpdated(null);
      toastr.success(updateSliderResponse.message);
    } else if (updateSliderResponse.type === 'failure') {
      toastr.error(error.data.message, updateSliderResponse.message);
    }
  }, [updateSliderResponse]);

  let preupdateSlider = (item) => {
    setSliderIdToBeUpdated(item.slider_id);
    setSliderObject(item);
  };

  useEffect(() => {
    let unitsDuplicate = JSON.parse(JSON.stringify(sliders));
    let unitData = [];
    unitsDuplicate.map((item, index) => {
      item.fname = item.User.fname + ' ' + item.User.lname;
      item.auth_userid = userId;
   
      if (item.slider_type === 0) {
        item.slider_type ="Home Page"
    }
    else{
      item.slider_type ="Category Wise"
    }
      item.categoryname =[ item.category.category_name_english ]
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
                //preupdateSlider(item);
              }}
            ></i>
            <i
              className="uil-trash-alt"
              style={{ fontSize: '1.3em', cursor: 'pointer' }}
              onClick={() => {
                setSliderIdToBeDeleted(item.slider_id);
                setConfirmDeleteAlert(true);
              }}
            ></i>
          </div>
        </div>
      );
      item.id = index + 1;
      item.slider_web_image = (
        <div style={{ textAlign: 'center' }}>
          <img style= {{ width:50}} src={`slider_images/${item.slider_web_image}`} />
        </div>
      );
         item.slider_mob_image = (
            <div style={{ textAlign: 'center' }}>
              <img style= {{ width:50}} src={`slider_images/${item.slider_mob_image}`} />
            </div>
      );
      if (item.slider_is_active === 0) {
        item.slider_is_active = (
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
                  dispatch(toggleActiveStatus(item.slider_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      } else {
        console.log(item.slider_is_active);
        item.slider_is_active = (
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
                  dispatch(toggleActiveStatus(item.slider_id, userId));
                  settoggleSwitch(!toggleSwitch);
                }}
              />
            </div>
          </div>
        );
      }

      unitData.push(item);
    });
    setSlidersTemp(unitData);
  }, [sliders]);

  const data = {
    columns: [
      {
        label: '#',
        field: 'id',
        sort: 'asc',
        width: 10,
      },

      {
        label: 'Slider Name',
        field: 'slider_name',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Slider Type',
        field: 'slider_type',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Category',
        field: 'categoryname',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Slider URL',
        field: 'slider_url',
        sort: 'asc',
        width: 70,
      },
      
      {
        label: 'Web Image',
        field: 'slider_web_image',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Mobile Image',
        field: 'slider_mob_image',
        sort: 'asc',
        width: 70,
      },
      {
        label: 'Status',
        field: 'slider_is_active',
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
    rows: slidersTemp,
  };

  let handleChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSliderObject({
      ...sliderObject,
      [name]: value,
    });
  };
  let onChangeHandler = (event) => {
    //console.log(event.target.files[0])
    //setSelectedFile(event.target.files[0]);
    //sliderObject.push(image:event.target.files[0])
    //setSliderObject({...sliderObject, file:event.target.files[0]})
  };

  const handleValidSubmitUnit = (event, values) => {
    var formData = new FormData();
    var imagefile = document.querySelector('#slider_icon_svg');
    formData.append('slider_name', 'test');
    formData.append('file', imagefile.files[0]);

    console.log(Object.keys(formData));
    sliderIdTobeUpdated
      ? dispatch(updateSlider(sliderObject))
      : dispatch(addSlider(formData));
  };

  //   let handleChangeImageUpload =(event) => {
  // setSliderObject({...sliderObject, unitlogo:event.target.files[0]})
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
            dispatch(deleteSlider(sliderIdToBeDeleted, userId));
            setConfirmDeleteAlert(false);
          }}
          onCancel={() => setConfirmDeleteAlert(false)}
        >
          Are you sure you want to delete it?
        </SweetAlert>
      ) : null}
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Home" breadcrumbItem="Sliders" />
          <Row hidden>
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
                            Slider Name
                          </Label>

                          <AvField
                            name="slider_name"
                            value={sliderObject.slider_name}
                            placeholder="Slider Name"
                            type="text"
                            errorMessage="Enter Slider Name"
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
                            Slider Type
                          </Label>

                          <AvField
                            name="slider_name"
                            value={sliderObject.slider_name}
                            placeholder="Slider Name"
                            type="text"
                            errorMessage="Enter Slider Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                            onChange={handleChangeInput}
                          />
                        </div>
                      </Col>

                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Mobile Image</Label>
                          <AvField
                            name="slider_icon_svg"
                            id="slider_icon_svg"
                            value={sliderObject.slider_icon_svg}
                            type="file"
                            errorMessage="Upload Slider Icon"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            onChange={onChangeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="3">
                        <div className="mb-3">
                          <Label htmlFor="validationCustom02">Web Image</Label>
                          <AvField
                            name="slider_icon_svg"
                            id="slider_icon_svg"
                            value={sliderObject.slider_icon_svg}
                            type="file"
                            errorMessage="Upload Slider Icon"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            onChange={onChangeHandler}
                          />
                        </div>
                      </Col>
                    </Row>

                    {sliderIdTobeUpdated ? (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSlider ? true : false}
                      >
                        {addingSlider ? 'Updating' : 'Update'}
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        type="submit"
                        disabled={addingSlider ? true : false}
                      >
                        {addingSlider ? 'Adding' : 'Submit'}
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

export default withRouter(connect(mapStateToProps, { apiError })(Sliders));

Sliders.propTypes = {
  error: PropTypes.any,
  sliders: PropTypes.array,
};
