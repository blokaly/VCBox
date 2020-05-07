import {takeEvery} from 'redux-saga/effects'
import {workerGetUser, workerSetUser} from './user'
import {workerGetSecuritySettings, workerSetSecuritySetting} from './security'
import {workerSetRegisterData, workerSetUserPin} from './register'
import {workerSetLogin, workerSetLogout} from './auth'
import {workerIndyCreateDid, workerIndyCreateCredRequest} from './indy'
import {workerFetchCred, workerFetchOffer, workerPostCredRequest} from './restapi'

import {
  FETCH_SECURITY_SETTINGS,
  FETCH_USER,
  SECURITY_SETTING,
  SET_ACCOUNT_PIN_CODE,
  SET_LOGIN,
  SET_LOGOUT,
  SET_REGISTER_DATA,
  SET_USER,
  API_FETCH,
  INDY_CREATE_DID, INDY_CREATE_CREDREQUEST, INDY_POST_CREDREQUEST, API_CRED_FETCH
} from '../actions/types';

export function* registerWatchers() {
  /**
   * User watchers
   */
  yield takeEvery(FETCH_USER, workerGetUser);
  yield takeEvery(SET_USER, workerSetUser);

  /**
   * Register watchers
   */
  yield takeEvery(SET_REGISTER_DATA, workerSetRegisterData);
  yield takeEvery(SET_ACCOUNT_PIN_CODE, workerSetUserPin);

  /**
   * Auth watchers
   */
  yield takeEvery(SET_LOGIN, workerSetLogin);
  yield takeEvery(SET_LOGOUT, workerSetLogout);

  /**
   * Security Settings
   */
  yield takeEvery(FETCH_SECURITY_SETTINGS, workerGetSecuritySettings);
  yield takeEvery(SECURITY_SETTING, workerSetSecuritySetting);

  /**
   * Indy workers
   */
  yield takeEvery(INDY_CREATE_DID, workerIndyCreateDid);
  yield takeEvery(INDY_CREATE_CREDREQUEST, workerIndyCreateCredRequest);

  /**
   * REST API workers
   */
  yield takeEvery(API_FETCH, workerFetchOffer);
  yield takeEvery(API_CRED_FETCH, workerFetchCred);
  yield takeEvery(INDY_POST_CREDREQUEST, workerPostCredRequest);
}

// 3. root saga

export default function* rootSaga() {
  yield registerWatchers()
}
