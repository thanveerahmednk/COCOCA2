import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_SUBCATEGORY,
    ADD_SUBCATEGORY,
 DELETE_SUBCATEGORY,
 UPDATE_SUBCATEGORY,
  GET_SUBCATEGORIES,
  CHANGE_STATUS_SUBCATEGORY,
  GET_SUBCATEGORY_OPTIONS
} from './actionTypes';

import {
  getSubcategoriesSuccess,
  getSubcategoriesFail,
  getSubcategorySuccess,
  getSubcategoryFail,
  addSubcategoryFail,
  addSubcategorySuccess,
  updateSubcategoryFail,
  updateSubcategorySuccess,
  deleteSubcategoryFail,
  deleteSubcategorySuccess,
  toggleActiveStatusSuccess,
  toggleActiveStatusFail,
  getSubcategoryOptionsSuccess,
  getSubcategoryOptionsFail
} from './actions';

//Include Both Helper File with needed methods
import {
  getSubcategories,
  getSubcategory,
   addSubcategory, updateSubcategory,
deleteSubcategory,
  toggleActiveStatus,
  getSubcategoryOptions
} from '../../helpers/backend_helper';

function* fetchSubcategories() {
  try {
    const response = yield call(getSubcategories);
    yield put(getSubcategoriesSuccess(response));
  } catch (error) {
    yield put(getSubcategoriesFail(error));
  }
}
function* fetchSubcategoryOptions() {
  try {
    const response = yield call(getSubcategoryOptions);
    yield put(getSubcategoryOptionsSuccess(response.data));
  } catch (error) {
    yield put(getSubcategoryOptionsFail(error));
  }
}

function* onGetSubcategory() {
  try {
    const response = yield call(getSubcategory);
    yield put(getSubcategorySuccess(response));
  } catch (error) {
    yield put(getSubcategoryFail(error.response));
  }
}

function* onAddSubcategory({ payload: subcategory }) {
  try {
    const response = yield call(addSubcategory, subcategory);
    yield put(addSubcategorySuccess(response));
  } catch (error) {
    yield put(addSubcategoryFail(error.response));
  }
}

function* onUpdateSubcategory({ payload: subcategory }) {
  //console.log(category);
  try {
    const response = yield call(updateSubcategory, subcategory);
    yield put(updateSubcategorySuccess(response));
  } catch (error) {
    yield put(updateSubcategoryFail(error.response));
  }
}

function* onDeleteSubcategory({ payload: subcategoryId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteSubcategory, subcategoryId, auth_user);
    yield put(deleteSubcategorySuccess(response));
  } catch (error) {
    yield put(deleteSubcategoryFail(error.response));
  }
}

function* onToggleActiveStatus({ payload: subcategoryId, auth_data: auth_user }) {
  try {
    const response = yield call(toggleActiveStatus, subcategoryId, auth_user);
    yield put(toggleActiveStatusSuccess(response));
  } catch (error) {
    yield put(toggleActiveStatusFail(error.response));
  }
}

function* subcategorySaga() {
  yield takeEvery(GET_SUBCATEGORIES, fetchSubcategories);
  yield takeEvery(GET_SUBCATEGORY, onGetSubcategory);
  yield takeEvery(ADD_SUBCATEGORY, onAddSubcategory);
  yield takeEvery(UPDATE_SUBCATEGORY, onUpdateSubcategory);
  yield takeEvery(DELETE_SUBCATEGORY, onDeleteSubcategory);
  yield takeEvery(CHANGE_STATUS_SUBCATEGORY, onToggleActiveStatus);
  yield takeEvery(GET_SUBCATEGORY_OPTIONS,fetchSubcategoryOptions)
}

export default subcategorySaga;