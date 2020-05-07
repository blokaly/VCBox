import {put} from "redux-saga/effects";

import {
    getSecuritySettingsSuccess,
    getSecuritySettingsFailure,
} from "../actions";

import Database from "../../database";

import { SECURITY_SETTING_SUCCESS } from "../actions/types";

export function* workerGetSecuritySettings() {
    try {
        const { settings } = yield Database.loadSecuritySettings()
        yield put(getSecuritySettingsSuccess(settings))
    } catch (e) {
        yield put(getSecuritySettingsFailure(e))
    }
}

export function* workerSetSecuritySetting(action) {
    yield put({
        type: SECURITY_SETTING_SUCCESS,
        data: action
    })
}
