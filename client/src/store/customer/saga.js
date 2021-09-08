import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_CUSTOMER,
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_CUSTOMERS,
  GET_CUSTOMER_OPTIONS 
} from './actionTypes';

import {
  getCustomersSuccess,
  getCustomersFail,
  getCustomerSuccess,
  getCustomerFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerFail,
  updateCustomerSuccess,
  deleteCustomerFail,
  deleteCustomerSuccess,
  getCustomerOptionsSuccess,
  getCustomerOptionsFail
} from './actions';

//Include Both Helper File with needed methods
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerOptions
} from '../../helpers/backend_helper';

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* onGetCustomer() {
  try {
    const response = yield call(getCustomer);
    yield put(getCustomerSuccess(response));
  } catch (error) {
    yield put(getCustomerFail(error.response));
  }
}

function* onAddCustomer({ payload: customer }) {
  try {
    const response = yield call(addCustomer, customer);
    yield put(addCustomerSuccess(response));
  } catch (error) {
    yield put(addCustomerFail(error.response));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  //console.log(customer);
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error.response));
  }
}

function* onDeleteCustomer({ payload: customerId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteCustomer, customerId, auth_user);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error.response));
  }
}

function* fetchCustomersdata() {
  try {
    const response = yield call(getCustomerOptions);
    yield put(getCustomerOptionsSuccess(response.data));
  } catch (error) {
    yield put(getCustomerOptionsFail(error));
  }
}

function* customerSaga() {
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(GET_CUSTOMER, onGetCustomer);
  yield takeEvery(ADD_CUSTOMER, onAddCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(GET_CUSTOMER_OPTIONS, fetchCustomersdata);
}

export default customerSaga;
