import {API_FETCH, API_CRED_FETCH} from './types';

export function apiFetch(data) {
  return {
    type: API_FETCH,
    data: data
  }
}

export function apiCredFetch(data) {
  return {
    type: API_CRED_FETCH,
    data: data
  }
}
