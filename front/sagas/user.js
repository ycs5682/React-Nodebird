import { all, delay, fork, put, takeEvery, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loadUserAPI() {
  // 서버에 요청을 보내는 부분 * 붙이지 말 것
  return axios.get('/user');
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) { // loginAPI 실패
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}

function loginAPI(data) {
  // 서버에 요청을 보내는 부분 * 붙이지 말 것
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({ // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) { // loginAPI 실패
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  // 서버에 요청을 보내는 부분
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({ // put은 dispatch 동일
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
      error: e,
    });
  }
}

function followAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/follow');
}

function* follow(action) {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: FOLLOW_FAILURE,
      error: e,
    });
  }
}

function unfollowAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('/unfollow');
}

function* unfollow(action) {
  try {
    // yield call(signUpAPI);
    yield delay(1000);
    yield put({ // put은 dispatch 동일
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) { // loginAPI 실패
    console.error(e);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: e,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}
function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_REQUEST, unfollow);
}
function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}


export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}