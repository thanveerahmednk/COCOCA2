import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_STOCKLOG,
  ADD_STOCKLOG,
  DELETE_STOCKLOG,
  UPDATE_STOCKLOG,
  GET_STOCKLOGS,
} from './actionTypes';

import {
  getStocklogsSuccess,
  getStocklogsFail,
  getStocklogSuccess,
  getStocklogFail,
  addStocklogFail,
  addStocklogSuccess,
  updateStocklogFail,
  updateStocklogSuccess,
  deleteStocklogFail,
  deleteStocklogSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getStocklogs,
  getStocklog,
  addStocklog,
  updateStocklog,
  deleteStocklog,
} from '../../helpers/backend_helper';

function* fetchStocklogs() {
  try {
    const response = yield call(getStocklogs);
    yield put(getStocklogsSuccess(response));
  } catch (error) {
    yield put(getStocklogsFail(error));
  }
}

function* onGetStocklog() {
  try {
    const response = yield call(getStocklog);
    yield put(getStocklogSuccess(response));
  } catch (error) {
    yield put(getStocklogFail(error.response));
  }
}

function* onAddStocklog({ payload: stocklog }) {
  try {
    const response = yield call(addStocklog, stocklog);
    yield put(addStocklogSuccess(response));
  } catch (error) {
    yield put(addStocklogFail(error.response));
  }
}

function* onUpdateStocklog({ payload: stocklog }) {
  //console.log(stocklog);
  try {
    const response = yield call(updateStocklog, stocklog);
    yield put(updateStocklogSuccess(response));
  } catch (error) {
    yield put(updateStocklogFail(error.response));
  }
}

function* onDeleteStocklog({ payload: stocklogId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteStocklog, stocklogId, auth_user);
    yield put(deleteStocklogSuccess(response));
  } catch (error) {
    yield put(deleteStocklogFail(error.response));
  }
}

function* stocklogSaga() {
  yield takeEvery(GET_STOCKLOGS, fetchStocklogs);
  yield takeEvery(GET_STOCKLOG, onGetStocklog);
  yield takeEvery(ADD_STOCKLOG, onAddStocklog);
  yield takeEvery(UPDATE_STOCKLOG, onUpdateStocklog);
  yield takeEvery(DELETE_STOCKLOG, onDeleteStocklog);
}

export default stocklogSaga;
