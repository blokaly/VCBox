import {SET_REGISTER_DATA, SET_REGISTER_DATA_SUCCESS} from './types';


export function setRegisterData(data) {
  return {
    type: SET_REGISTER_DATA,
    data: data
  }
}

export function setRegisterDataSuccess(data) {
  return {
    type: SET_REGISTER_DATA_SUCCESS,
    data: data
  }
}
