import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_CATEGORY,
    ADD_CATEGORY,
 DELETE_CATEGORY,
 UPDATE_CATEGORY,
  GET_CATEGORIES,
  CHANGE_STATUS_CATEGORY,
  GET_CATEGORY_OPTIONS
} from './actionTypes';

import {
  getCategoriesSuccess,
  getCategoriesFail,
  getCategorySuccess,
  getCategoryFail,
  addCategoryFail,
  addCategorySuccess,
  updateCategoryFail,
  updateCategorySuccess,
  deleteCategoryFail,
  deleteCategorySuccess,
  toggleActiveStatusSuccess,
  toggleActiveStatusFail,
  getCategoryOptionsSuccess,
  getCategoryOptionsFail
} from './actions';

//Include Both Helper File with needed methods
import {
  getCategories,
  getCategory,
   addCategory, updateCategory,
deleteCategory,
  toggleActiveStatus,
  getCategoryOptions
} from '../../helpers/backend_helper';

function* fetchCategories() {
  try {
    const response = yield call(getCategories);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}
function* fetchCategoryOptions() {
  try {
    const response = yield call(getCategoryOptions);
    yield put(getCategoryOptionsSuccess(response.data));
  } catch (error) {
    yield put(getCategoryOptionsFail(error));
  }
}

function* onGetCategory() {
  try {
    const response = yield call(getCategory);
    yield put(getCategorySuccess(response));
  } catch (error) {
    yield put(getCategoryFail(error.response));
  }
}

function* onAddCategory({ payload: category }) {
  try {
    const response = yield call(addCategory, category);
    yield put(addCategorySuccess(response));
  } catch (error) {
    yield put(addCategoryFail(error.response));
  }
}

function* onUpdateCategory({ payload: category }) {
  //console.log(category);
  try {
    const response = yield call(updateCategory, category);
    yield put(updateCategorySuccess(response));
  } catch (error) {
    yield put(updateCategoryFail(error.response));
  }
}

function* onDeleteCategory({ payload: categoryId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteCategory, categoryId, auth_user);
    yield put(deleteCategorySuccess(response));
  } catch (error) {
    yield put(deleteCategoryFail(error.response));
  }
}

function* onToggleActiveStatus({ payload: categoryId, auth_data: auth_user }) {
  try {
    const response = yield call(toggleActiveStatus, categoryId, auth_user);
    yield put(toggleActiveStatusSuccess(response));
  } catch (error) {
    yield put(toggleActiveStatusFail(error.response));
  }
}

function* categorySaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategories);
  yield takeEvery(GET_CATEGORY, onGetCategory);
  yield takeEvery(ADD_CATEGORY, onAddCategory);
  yield takeEvery(UPDATE_CATEGORY, onUpdateCategory);
  yield takeEvery(DELETE_CATEGORY, onDeleteCategory);
  yield takeEvery(CHANGE_STATUS_CATEGORY, onToggleActiveStatus);
  yield takeEvery(GET_CATEGORY_OPTIONS,fetchCategoryOptions)
}

export default categorySaga;