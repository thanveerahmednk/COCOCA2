import { takeEvery, put, call } from 'redux-saga/effects';

import { GET_Menu_OPTIONS } from './actionTypes';

import { getMenusOptionsSuccess, getMenusOptionsFail } from './actions';

//Include Both Helper File with needed methods
import { getMenusOptions } from '../../helpers/backend_helper';

function* fetchMenu() {
  try {
    const response = yield call(getMenusOptions);
    console.log(response);
    console.log('menu saga');
    yield put(getMenusOptionsSuccess(response.data));
  } catch (error) {
    yield put(getMenusOptionsFail(error));
  }
}

function* menusSaga() {
  yield takeEvery(GET_Menu_OPTIONS, fetchMenu);
}

export default menusSaga;
