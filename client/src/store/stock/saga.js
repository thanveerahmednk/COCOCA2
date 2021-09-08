import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_STOCK,
  ADD_STOCK,
  DELETE_STOCK,
  UPDATE_STOCK,
  GET_STOCKS,
} from './actionTypes';

import {
  getStocksSuccess,
  getStocksFail,
  getStockSuccess,
  getStockFail,
  addStockFail,
  addStockSuccess,
  updateStockFail,
  updateStockSuccess,
  deleteStockFail,
  deleteStockSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getStocks,
  getStock,
  addStock,
  updateStock,
  deleteStock,
} from '../../helpers/backend_helper';

function* fetchStocks() {
  try {
    const response = yield call(getStocks);
    yield put(getStocksSuccess(response));
  } catch (error) {
    yield put(getStocksFail(error));
  }
}

function* onGetStock() {
  try {
    const response = yield call(getStock);
    yield put(getStockSuccess(response));
  } catch (error) {
    yield put(getStockFail(error.response));
  }
}

function* onAddStock({ payload: stock }) {
  try {
    const response = yield call(addStock, stock);
    yield put(addStockSuccess(response));
  } catch (error) {
    yield put(addStockFail(error.response));
  }
}

function* onUpdateStock({ payload: stock }) {
  //console.log(stock);
  try {
    const response = yield call(updateStock, stock);
    yield put(updateStockSuccess(response));
  } catch (error) {
    yield put(updateStockFail(error.response));
  }
}

function* onDeleteStock({ payload: stockId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteStock, stockId, auth_user);
    yield put(deleteStockSuccess(response));
  } catch (error) {
    yield put(deleteStockFail(error.response));
  }
}

function* stockSaga() {
  yield takeEvery(GET_STOCKS, fetchStocks);
  yield takeEvery(GET_STOCK, onGetStock);
  yield takeEvery(ADD_STOCK, onAddStock);
  yield takeEvery(UPDATE_STOCK, onUpdateStock);
  yield takeEvery(DELETE_STOCK, onDeleteStock);
}

export default stockSaga;
