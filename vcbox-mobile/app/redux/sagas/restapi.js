import { put, call, all} from "redux-saga/effects";
import {
  API_FETCH_SUCCESS,
  API_FETCH_FAILURE,
  INDY_CREATE_CREDREQUEST_SUCCESS,
  INDY_CREATE_CREDREQUEST_FAILURE,
  INDY_CREDENTIAL_UPDATE
} from "../actions/types";
import axios from 'axios'

export function* workerFetchOffer(action) {
  try {
    let response = yield call(axios.get, action.data)
    yield put({
      type: API_FETCH_SUCCESS,
      data: response.data
    })
  } catch (e) {
    yield put({
      type: API_FETCH_FAILURE,
      data: e
    })
  }
}

export function* workerFetchCred(action) {
  try {
    let req = action.data
    yield call(axios.get, 'http://10.208.0.100:8080/api/v1/indy/cred/issue/'+req)
    yield put({
      type:INDY_CREDENTIAL_UPDATE,
      data: {id:req, status:'issued'}
    })
  } catch (e) {
  }
}

export function* workerPostCredRequest(action) {
  try {
    let response = yield call(axios.post, action.data.url, action.data.data)
    let reqId = response.data.data.reqId
    yield put({
      type:INDY_CREATE_CREDREQUEST_SUCCESS,
      data: {id:reqId, def:action.data.def, status:'submitted'}
    })

  } catch (e) {
    yield put({
      type: INDY_CREATE_CREDREQUEST_FAILURE,
      data: e
    })
  }
}
