import { put, call } from "redux-saga/effects";
import {NativeModules} from 'react-native'
import {INDY_CREATE_DID_SUCCESS, INDY_CREATE_DID_FAILURE, INDY_POST_CREDREQUEST} from "../actions/types";

export function* workerIndyCreateDid(action) {
  try {
    yield call(NativeModules.IndyModule.createWallet)
  } catch (e) {
    if (e.message.indexOf('already exists')<0) {
      yield put({
        type: INDY_CREATE_DID_FAILURE,
        data: null
      })
    }
  }

  // try {
  //   yield call(NativeModules.IndyModule.openWallet)
  // } catch (e) {
  //   if (e.message.indexOf('already open')<0) {
  //     yield put({
  //       type: INDY_CREATE_DID_FAILURE,
  //       data: null
  //     })
  //   }
  // }

  try {
    let did = yield call(NativeModules.IndyModule.createDid)
    yield put({
      type: INDY_CREATE_DID_SUCCESS,
      data: did
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: INDY_CREATE_DID_FAILURE,
      data: null
    })
  }
}

export function* workerIndyCreateCredRequest(action) {
  try {
    let request = action.data
    let result = yield call(NativeModules.IndyModule.createCredRequest, request.did, JSON.stringify(request.offer), JSON.stringify(request.def))
    let objJsonB64 = Buffer.from(result).toString("base64");
    let data = {requester:request.did, request:objJsonB64}
    let postReq = {url:'http://10.208.0.100:8080/api/v1/indy/cred/request', data:data, def:request.def}
    yield put({
      type: INDY_POST_CREDREQUEST,
      data: postReq
    })
  } catch (e) {
    console.error(e)
    yield put({
      type: INDY_CREATE_DID_FAILURE,
      data: null
    })
  }
}
