import { put } from "redux-saga/effects";
import Database from "../../database";
import {
    getUserFailure,
    getUserSuccess,
    setUserSuccess,
    setUserFailure
} from "../actions";

export function* workerGetUser() {
    try {
        const { user } = yield Database.loadUser()
        yield put(getUserSuccess(user))
    } catch (e) {
        yield put(getUserFailure(e))
    }
}

export function* workerSetUser(action) {
    try {
        const { user } = yield Database.createUpdateUser(action.data, action.revisionID)
        yield put(setUserSuccess(action.data))
    } catch (e) {
        yield put(setUserFailure(e))
    }
}
