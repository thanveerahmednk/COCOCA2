import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';

import {
  GET_COMMUNITYREQUEST,
  ADD_COMMUNITYREQUEST,
  DELETE_COMMUNITYREQUEST,
  UPDATE_COMMUNITYREQUEST,
  GET_COMMUNITYREQUESTS,
} from './actionTypes';

import {
  getCommunityrequestsSuccess,
  getCommunityrequestsFail,
  getCommunityrequestSuccess,
  getCommunityrequestFail,
  addCommunityrequestFail,
  addCommunityrequestSuccess,
  updateCommunityrequestFail,
  updateCommunityrequestSuccess,
  deleteCommunityrequestFail,
  deleteCommunityrequestSuccess,
} from './actions';

//Include Both Helper File with needed methods
import {
  getCommunityrequests,
  getCommunityrequest,
  addCommunityrequest,
  updateCommunityrequest,
  deleteCommunityrequest,
} from '../../helpers/backend_helper';

function* fetchCommunityrequests() {
  try {
    const response = yield call(getCommunityrequests);
    yield put(getCommunityrequestsSuccess(response));
  } catch (error) {
    yield put(getCommunityrequestsFail(error));
  }
}

function* onGetCommunityrequest() {
  try {
    const response = yield call(getCommunityrequest);
    yield put(getCommunityrequestSuccess(response));
  } catch (error) {
    yield put(getCommunityrequestFail(error.response));
  }
}

function* onAddCommunityrequest({ payload: communityrequest }) {
  try {
    const response = yield call(addCommunityrequest, communityrequest);
    yield put(addCommunityrequestSuccess(response));
  } catch (error) {
    yield put(addCommunityrequestFail(error.response));
  }
}

function* onUpdateCommunityrequest({ payload: communityrequest }) {
  //console.log(unit);
  try {
    const response = yield call(updateCommunityrequest, communityrequest);
    yield put(updateCommunityrequestSuccess(response));
  } catch (error) {
    yield put(updateCommunityrequestFail(error.response));
  }
}

function* onDeleteCommunityrequest({ payload: communityrequestId, auth_data: auth_user }) {
  try {
    const response = yield call(deleteCommunityrequest, communityrequestId, auth_user);
    yield put(deleteCommunityrequestSuccess(response));
  } catch (error) {
    yield put(deleteCommunityrequestFail(error.response));
  }
}

function* communityrequestSaga() {
  yield takeEvery(GET_COMMUNITYREQUESTS, fetchCommunityrequests);
  yield takeEvery(GET_COMMUNITYREQUEST, onGetCommunityrequest);
  yield takeEvery(ADD_COMMUNITYREQUEST, onAddCommunityrequest);
  yield takeEvery(UPDATE_COMMUNITYREQUEST, onUpdateCommunityrequest);
  yield takeEvery(DELETE_COMMUNITYREQUEST, onDeleteCommunityrequest);
}

export default communityrequestSaga;
