import { takeEvery, put, call } from 'redux-saga/effects';

import { GET_STATES_OPTIONS } from './actionTypes';

import { getStatesOptionsSuccess, getStatesOptionsFail } from './actions';

//Include Both Helper File with needed methods
import { getStatesOptions } from '../../helpers/backend_helper';

function* fetchStates() {
  try {
    const response = yield call(getStatesOptions);
    yield put(getStatesOptionsSuccess(response.data));
  } catch (error) {
    yield put(getStatesOptionsFail(error));
  }
}

function* statesSaga() {
  yield takeEvery(GET_STATES_OPTIONS, fetchStates);
}

export default statesSaga;