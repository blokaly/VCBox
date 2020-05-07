import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  SET_ACCOUNT_PIN_CODE,
  SET_ACCOUNT_PIN_CODE_SUCCESS,
  SET_LOGIN_SUCCESS,
  SET_REGISTER_DATA_SUCCESS,
  SET_USER,
  SET_USER_FAIL,
  SET_USER_SUCCESS
} from './types';

export function getUser() {
  return {
    type: FETCH_USER
  }
}

export function setUser(data, revisionID) {
  return {
    type: SET_USER,
    data,
    revisionID
  }
}

export function getUserSuccess(data) {
  return {
    type: FETCH_USER_SUCCESS,
    data
  }
}

export function getUserFailure(data) {
  return {
    type: FETCH_USER_FAILURE,
    data
  }
}

export function setUserSuccess(data) {
  return {
    type: SET_USER_SUCCESS,
    data
  }
}

export function setUserFailure(data) {
  return {
    type: SET_USER_FAIL,
    data
  }
}

export function setUserPin(data) {
  return {
    type: SET_ACCOUNT_PIN_CODE,
    data: data
  }
}

export function setUserPinSuccess(data) {
  return {
    type: SET_ACCOUNT_PIN_CODE_SUCCESS,
    data: data
  }
}

