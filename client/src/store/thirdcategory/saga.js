import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_THIRDCATEGORY,
    ADD_THIRDCATEGORY,
 DELETE_THIRDCATEGORY,
 UPDATE_THIRDCATEGORY,
  GET_THIRDCATEGORIES,
  CHANGE_STATUS_THIRDCATEGORY,
  GET_THIRDCATEGORIES_OPTIONS
} from './actionTypes';

import {
  getThirdcategoriesSuccess,
  getThirdcategoriesFail,
  getThirdcategorySuccess,
  getThirdcategoryFail,
  addThirdcategoryFail,
  addThirdcategorySuccess,
  updateThirdcategoryFail,
  updateThirdcategorySuccess,
  deleteThirdcategoryFail,
  deleteThirdcategorySuccess,
  toggleActiveStatusSuccess,
  toggleActiveStatusFail,
  getThirdcategoriesOptionsSuccess,
  getThirdcategoriesOptionsFail
} from './actions';

//Include Both Helper File with needed methods
import {
  getThirdcategories,
  getThirdcategory,
addThirdcategory,
    updateThirdcategory,
deleteThirdcategory,
  toggleActiveStatus,
  getThirdcategoriesOptions
} from '../../helpers/backend_helper';

function* fetchThirdcategories() {
  try {
    const response = yield call(getThirdcategories);
    yield put(getThirdcategoriesSuccess(response));
  } catch (error) {
    yield put(getThirdcategoriesFail(error));
  }
}
function* fetchThirdcategoriesOptions() {
  try {
    const response = yield call(getThirdcategoriesOptions);
    yield put(getThirdcategoriesOptionsSuccess(response.data));
  } catch (error) {
    yield put(getThirdcategoriesOptionsFail(error));
  }
}

function* onGetThirdcategory() {
  try {
    const response = yield call(getThirdcategory);
    yield put(getThirdcategorySuccess(response));
  } catch (error) {
    yield put(getThirdcategoryFail(error.response));
  }
}

function* onAddThirdcategory({ payload: thirdcategory }) {
  try {
    const response = yield call(addThirdcategory, thirdcategory);
    yield put(addThirdcategorySuccess(response));
  } catch (error) {
    yield put(addThirdcategoryFail(error.response));
  }
}

function* onUpdateThirdcategory({ payload: thirdcategory }) {
  //console.log(category);
  try {
    const response = yield call(updateThirdcategory, thirdcategory);
    yield put(updateThirdcategorySuccess(response));
  } catch (error) {
    yield put(updateThirdcategoryFail(error.response));
  }
}

function* onDeleteThirdcategory({ payload: thirdcategoryId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteThirdcategory, thirdcategoryId, auth_user);
    yield put(deleteThirdcategorySuccess(response));
  } catch (error) {
    yield put(deleteThirdcategoryFail(error.response));
  }
}

function* onToggleActiveStatus({ payload: thirdcategoryId, auth_data: auth_user }) {
  try {
    const response = yield call(toggleActiveStatus, thirdcategoryId, auth_user);
    yield put(toggleActiveStatusSuccess(response));
  } catch (error) {
    yield put(toggleActiveStatusFail(error.response));
  }
}

function* thirdcategorySaga() {
  yield takeEvery(GET_THIRDCATEGORIES, fetchThirdcategories);
  yield takeEvery(GET_THIRDCATEGORY, onGetThirdcategory);
  yield takeEvery(ADD_THIRDCATEGORY, onAddThirdcategory);
  yield takeEvery(UPDATE_THIRDCATEGORY, onUpdateThirdcategory);
  yield takeEvery(DELETE_THIRDCATEGORY, onDeleteThirdcategory);
  yield takeEvery(CHANGE_STATUS_THIRDCATEGORY, onToggleActiveStatus);
  yield takeEvery(GET_THIRDCATEGORIES_OPTIONS,fetchThirdcategoriesOptions)
}

export default thirdcategorySaga;