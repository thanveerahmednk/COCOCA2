import { takeEvery, put, call } from "redux-saga/effects";

import { GET_COMPANIES_OPTIONS } from "./actionTypes";

import { getCompaniesOptionsSuccess, getCompaniesOptionsFail } from "./actions";

//Include Both Helper File with needed methods
import { getCompaniesOptions } from "../../helpers/backend_helper";

function* fetchCompanies() {
  try {
    const response = yield call(getCompaniesOptions);
    yield put(getCompaniesOptionsSuccess(response));
  } catch (error) {
    yield put(getCompaniesOptionsFail(error));
  }
}

function* companiesSaga() {
  yield takeEvery(GET_COMPANIES_OPTIONS, fetchCompanies);
}

export default companiesSaga;
