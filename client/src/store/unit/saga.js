import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_UNIT,
  ADD_UNIT,
  DELETE_UNIT,
  UPDATE_UNIT,
  GET_UNITS,
} from './actionTypes';

import {
  getUnitsSuccess,
  getUnitsFail,
  getUnitSuccess,
  getUnitFail,
  addUnitFail,
  addUnitSuccess,
  updateUnitFail,
  updateUnitSuccess,
  deleteUnitFail,
  deleteUnitSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getUnits,
  getUnit,
  addUnit,
  updateUnit,
  deleteUnit,
} from '../../helpers/backend_helper';

function* fetchUnits() {
  try {
    const response = yield call(getUnits);
    yield put(getUnitsSuccess(response));
  } catch (error) {
    yield put(getUnitsFail(error));
  }
}

function* onGetUnit() {
  try {
    const response = yield call(getUnit);
    yield put(getUnitSuccess(response));
  } catch (error) {
    yield put(getUnitFail(error.response));
  }
}

function* onAddUnit({ payload: unit }) {
  try {
    const response = yield call(addUnit, unit);
    yield put(addUnitSuccess(response));
  } catch (error) {
    yield put(addUnitFail(error.response));
  }
}

function* onUpdateUnit({ payload: unit }) {
  //console.log(unit);
  try {
    const response = yield call(updateUnit, unit);
    yield put(updateUnitSuccess(response));
  } catch (error) {
    yield put(updateUnitFail(error.response));
  }
}

function* onDeleteUnit({ payload: unitId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteUnit, unitId, auth_user);
    yield put(deleteUnitSuccess(response));
  } catch (error) {
    yield put(deleteUnitFail(error.response));
  }
}

function* unitSaga() {
  yield takeEvery(GET_UNITS, fetchUnits);
  yield takeEvery(GET_UNIT, onGetUnit);
  yield takeEvery(ADD_UNIT, onAddUnit);
  yield takeEvery(UPDATE_UNIT, onUpdateUnit);
  yield takeEvery(DELETE_UNIT, onDeleteUnit);
}

export default unitSaga;
