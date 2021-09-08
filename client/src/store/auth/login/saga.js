import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { apiError, loginSuccess } from './actions';
import { login } from '../../../helpers/backend_helper';

//Include Both Helper File with needed methods

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, {
      username: user.username,
      password: user.password,
    });
    yield put(loginSuccess());
    localStorage.setItem('authUser', JSON.stringify(response.token));

    history.push('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem('authUser');
    history.push('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
