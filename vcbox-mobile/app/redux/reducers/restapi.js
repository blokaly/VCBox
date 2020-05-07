import {API_FETCH, API_FETCH_FAILURE, API_FETCH_SUCCESS} from '../actions/types'

const initialState = {
  url: null,
  data: null,
  isFetching: false,
  error: null
}

export default function restReducer(state = initialState, action) {
  switch (action.type) {
    case API_FETCH: {
      return {
        ...state,
        isFetching: true,
        url: action.data,
        data: null
      }
    }
    case API_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: null
      }
    }
    case API_FETCH_FAILURE: {
      return {
        ...state,
        isFetching: false,
        data: null,
        error: action.data
      }
    }
    default:
      return state
  }
}
