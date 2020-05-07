import {
  INDY_RESET_CREDREQUEST,
  INDY_CREATE_CREDREQUEST_SUCCESS,
  INDY_CREATE_DID_SUCCESS,
  INDY_CREDENTIAL_UPDATE
} from '../actions/types'

const initialState = {
  did: null,
  credreq: null,
  creds:[]
}

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case INDY_CREATE_DID_SUCCESS: {
      return {
        ...state,
        did: action.data
      }
    }
    case INDY_RESET_CREDREQUEST: {
      return {
        ...state,
        credreq: null
      }
    }
    case INDY_CREATE_CREDREQUEST_SUCCESS: {
      return {
        ...state,
        credreq: action.data.id,
        creds:[...state.creds, action.data]
      }
    }
    case INDY_CREDENTIAL_UPDATE: {
      return {
        ...state,
        creds: state.creds.map((item, index)=>{
          if (item.id === action.data.id) {
            return {...item, status:action.data.status}
          }
          return item
        })
      }
    }
    default:
      return state
  }
}
