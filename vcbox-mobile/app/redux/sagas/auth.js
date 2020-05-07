import {put, select} from "redux-saga/effects";
import {setLoginSuccess, setLogoutSuccess, setSecuritySetting, setUser} from "../actions";

const getRegisterData = state => state.register;
const getRevisionID = state => state.user.user ? state.user.user._rev : null;

export function* workerSetLogin(action) {
    const registerData = yield select(getRegisterData)
    const revisionID = yield select(getRevisionID)

    yield put(setLoginSuccess(action))
    yield put(setUser(registerData, revisionID))

    if (registerData.pin) {
        yield put(setSecuritySetting({name: 'pincode', value: true}))
    }
}

export function* workerSetLogout(action) {
    yield put(setLogoutSuccess(action))
}
