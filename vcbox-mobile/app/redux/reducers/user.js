import {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    SET_USER_FAIL,
    SET_USER_SUCCESS,
    SET_USER
} from '../actions/types'

const initialState = {
    user: null,
    isFetching: false,
    error: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER: {
            return {
                ...state,
                isFetching: true,
                user: null
            }
        }
        case FETCH_USER_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                user: action.data
            }
        }
        case FETCH_USER_FAILURE: {
            return {
                ...state,
                isFetching: false,
                user: null,
                error: action.data
            }
        }
        case SET_USER: {
            return {
                ...state,
                user: action.data
            }
        }
        case SET_USER_SUCCESS: {
            return {
                ...state,
                user: action.data
            }
        }
        case SET_USER_FAIL: {
            return {
                ...state,
                user: null,
                error: action.data
            }
        }
        default:
            return state
    }
}
