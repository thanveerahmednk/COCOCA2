import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_ORDER,
  ADD_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_ORDERS,
  DELIVER_ORDER,
  OUTOF_DELIVER_ORDER
} from './actionTypes';

import {
  getOrdersSuccess,
  getOrdersFail,
  getOrderSuccess,
  getOrderFail,
  addOrderFail,
  addOrderSuccess,
  updateOrderFail,
  updateOrderSuccess,
  deleteOrderFail,
  deleteOrderSuccess,
  deliverOrderFail,
  deliverOrderSuccess,
  outofdeliverOrderFail,
  outofdeliverOrderSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getOrders,
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  deliverOrder,
  outofdeliverOrder
} from '../../helpers/backend_helper';

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* onGetOrder() {
  try {
    const response = yield call(getOrder);
    yield put(getOrderSuccess(response));
  } catch (error) {
    yield put(getOrderFail(error.response));
  }
}

function* onAddOrder({ payload: order }) {
  try {
    const response = yield call(addOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error.response));
  }
}

function* onUpdateOrder({ payload: order }) {
  //console.log(order);
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error.response));
  }
}

function* onDeleteOrder({ payload: orderId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteOrder, orderId, auth_user);
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    yield put(deleteOrderFail(error.response));
  }
}

function* onDeliverOrder({
  payload: o_id,
  auth_data: auth_user,
}) {
  try {
    const response = yield call(
      deliverOrder,
      o_id,
      auth_user
    );
    yield put(deliverOrderSuccess(response));
  } catch (error) {
    yield put(deliverOrderFail(error.response));
  }
}

function* onoutofDeliverOrder({
  payload: o_id,
  auth_data: auth_user,
}) {
  try {
    const response = yield call(
      outofdeliverOrder,
      o_id,
      auth_user
    );
    yield put(outofdeliverOrderSuccess(response));
  } catch (error) {
    yield put(outofdeliverOrderFail(error.response));
  }
}
function* orderSaga() {
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_ORDER, onGetOrder);
  yield takeEvery(ADD_ORDER, onAddOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(DELIVER_ORDER,onDeliverOrder);
  yield takeEvery(OUTOF_DELIVER_ORDER,onoutofDeliverOrder);
  
}

export default orderSaga;
