import {call, put} from "redux-saga/effects";

import {
    setRegisterDataSuccess, setUserPinSuccess
} from "../actions";

export function* workerSetRegisterData(action) {
    yield put(setRegisterDataSuccess(action.data))
}

export function* workerSetUserPin(action) {
    yield put(setUserPinSuccess(action.data))
}
