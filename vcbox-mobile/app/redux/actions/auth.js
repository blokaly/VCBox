import {SET_LOGIN, SET_LOGIN_SUCCESS, SET_LOGOUT, SET_LOGOUT_SUCCESS} from './types';

export function setLogin(data) {
  return {
    type: SET_LOGIN,
    data: data
  }
}

export function setLoginSuccess() {
  return {
    type: SET_LOGIN_SUCCESS
  }
}

export function setLogout() {
  return {
    type: SET_LOGOUT
  }
}

export function setLogoutSuccess() {
  return {
    type: SET_LOGOUT_SUCCESS
  }
}
