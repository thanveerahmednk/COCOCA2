import { takeEvery, put, call } from "redux-saga/effects";

import { GET_PRIVILAGES_OPTIONS } from "./actionTypes";

import {
  getPrivilagesOptionsSuccess,
  getPrivilagesOptionsFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getPrivilagesOptions } from "../../helpers/backend_helper";

function* fetchPrivilages() {
  try {
    const response = yield call(getPrivilagesOptions);
    yield put(getPrivilagesOptionsSuccess(response.data));
  } catch (error) {
    yield put(getPrivilagesOptionsFail(error));
  }
}

function* privilagesSaga() {
  yield takeEvery(GET_PRIVILAGES_OPTIONS, fetchPrivilages);
}

export default privilagesSaga;
