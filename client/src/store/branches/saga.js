import { takeEvery, put, call } from "redux-saga/effects";

import { GET_BRANCHES_OPTIONS } from "./actionTypes";

import { getBranchesOptionsSuccess, getBranchesOptionsFail } from "./actions";

//Include Both Helper File with needed methods
import { getBranchesOptions } from "../../helpers/backend_helper";

function* fetchBranches({ payload: companyId }) {
  try {
    const response = yield call(getBranchesOptions(companyId));
    yield put(getBranchesOptionsSuccess(response));
  } catch (error) {
    yield put(getBranchesOptionsFail(error));
  }
}

function* branchesSaga() {
  yield takeEvery(GET_BRANCHES_OPTIONS, fetchBranches);
}

export default branchesSaga;
