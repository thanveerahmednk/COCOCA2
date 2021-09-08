import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_SLIDER,
  ADD_SLIDER,
  DELETE_SLIDER,
  UPDATE_SLIDER,
  GET_SLIDERS,
  CHANGE_STATUS_SLIDER,
} from './actionTypes';

import {
  getSlidersSuccess,
  getSlidersFail,
  getSliderSuccess,
  getSliderFail,
  addSliderFail,
  addSliderSuccess,
  updateSliderFail,
  updateSliderSuccess,
  deleteSliderFail,
  deleteSliderSuccess,
  toggleActiveStatusSuccess,
  toggleActiveStatusFail,
} from './actions';

//Include Both Helper File with needed methods
import {
  getSliders,
  getSlider,
  addSlider,
  updateSlider,
  deleteSlider,
  toggleActiveStatus,
} from '../../helpers/backend_helper';

function* fetchSliders() {
  try {
    const response = yield call(getSliders);
    yield put(getSlidersSuccess(response));
  } catch (error) {
    yield put(getSlidersFail(error));
  }
}

function* onGetSlider() {
  try {
    const response = yield call(getSlider);
    yield put(getSliderSuccess(response));
  } catch (error) {
    yield put(getSliderFail(error.response));
  }
}

function* onAddSlider({ payload: slider }) {
  try {
    const response = yield call(addSlider, slider);
    yield put(addSliderSuccess(response));
  } catch (error) {
    yield put(addSliderFail(error.response));
  }
}

function* onUpdateSlider({ payload: slider }) {
  //console.log(slider);
  try {
    const response = yield call(updateSlider, slider);
    yield put(updateSliderSuccess(response));
  } catch (error) {
    yield put(updateSliderFail(error.response));
  }
}

function* onDeleteSlider({ payload: sliderId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteSlider, sliderId, auth_user);
    yield put(deleteSliderSuccess(response));
  } catch (error) {
    yield put(deleteSliderFail(error.response));
  }
}
function* onToggleActiveStatus({ payload: sliderId, auth_data: auth_user }) {
    try {
      const response = yield call(toggleActiveStatus, sliderId, auth_user);
      yield put(toggleActiveStatusSuccess(response));
    } catch (error) {
      yield put(toggleActiveStatusFail(error.response));
    }
  }

function* sliderSaga() {
  yield takeEvery(GET_SLIDERS, fetchSliders);
  yield takeEvery(GET_SLIDER, onGetSlider);
  yield takeEvery(ADD_SLIDER, onAddSlider);
  yield takeEvery(UPDATE_SLIDER, onUpdateSlider);
  yield takeEvery(DELETE_SLIDER, onDeleteSlider);
  yield takeEvery(CHANGE_STATUS_SLIDER, onToggleActiveStatus);
}

export default sliderSaga;
