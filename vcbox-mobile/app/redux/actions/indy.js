import {INDY_CREATE_DID, INDY_CREATE_CREDREQUEST, INDY_RESET_CREDREQUEST} from './types'

export function createDid(data) {
  return {
    type: INDY_CREATE_DID,
    data: data
  }
}

export function createCredRequest(data) {
  return {
    type: INDY_CREATE_CREDREQUEST,
    data: data
  }
}

export function resetCredRequest() {
  return{
    type: INDY_RESET_CREDREQUEST
  }
}
