import {
  FETCH_SECURITY_SETTINGS,
  FETCH_SECURITY_SETTINGS_FAILURE,
  FETCH_SECURITY_SETTINGS_SUCCESS,
  SECURITY_SETTING
} from './types';

export function setSecuritySetting(data) {
  return {
    type: SECURITY_SETTING,
    data: data
  }
}

export function getSecuritySettings() {
  return {
    type: FETCH_SECURITY_SETTINGS
  }
}

export function getSecuritySettingsSuccess(data) {
  return {
    type: FETCH_SECURITY_SETTINGS_SUCCESS,
    data
  }
}

export function getSecuritySettingsFailure(data) {
  return {
    type: FETCH_SECURITY_SETTINGS_FAILURE,
    data
  }
}
