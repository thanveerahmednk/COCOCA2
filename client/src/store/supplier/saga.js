import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_SUPPLIER,
  ADD_SUPPLIER,
  DELETE_SUPPLIER,
  UPDATE_SUPPLIER,
  GET_SUPPLIERS,
} from './actionTypes';

import {
  getSuppliersSuccess,
  getSuppliersFail,
  getSupplierSuccess,
  getSupplierFail,
  addSupplierFail,
  addSupplierSuccess,
  updateSupplierFail,
  updateSupplierSuccess,
  deleteSupplierFail,
  deleteSupplierSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from '../../helpers/backend_helper';

function* fetchSuppliers() {
  try {
    const response = yield call(getSuppliers);
    yield put(getSuppliersSuccess(response));
  } catch (error) {
    yield put(getSuppliersFail(error));
  }
}

function* onGetSupplier() {
  try {
    const response = yield call(getSupplier);
    yield put(getSupplierSuccess(response));
  } catch (error) {
    yield put(getSupplierFail(error.response));
  }
}

function* onAddSupplier({ payload: supplier }) {
  try {
    const response = yield call(addSupplier, supplier);
    yield put(addSupplierSuccess(response));
  } catch (error) {
    yield put(addSupplierFail(error.response));
  }
}

function* onUpdateSupplier({ payload: supplier }) {
  //console.log(supplier);
  try {
    const response = yield call(updateSupplier, supplier);
    yield put(updateSupplierSuccess(response));
  } catch (error) {
    yield put(updateSupplierFail(error.response));
  }
}

function* onDeleteSupplier({ payload: supplierId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteSupplier, supplierId, auth_user);
    yield put(deleteSupplierSuccess(response));
  } catch (error) {
    yield put(deleteSupplierFail(error.response));
  }
}

function* supplierSaga() {
  yield takeEvery(GET_SUPPLIERS, fetchSuppliers);
  yield takeEvery(GET_SUPPLIER, onGetSupplier);
  yield takeEvery(ADD_SUPPLIER, onAddSupplier);
  yield takeEvery(UPDATE_SUPPLIER, onUpdateSupplier);
  yield takeEvery(DELETE_SUPPLIER, onDeleteSupplier);
}

export default supplierSaga;