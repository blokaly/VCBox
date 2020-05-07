import {
    SET_LOGIN,
    SET_LOGIN_SUCCESS,
    SET_LOGOUT,
    SET_LOGOUT_SUCCESS
} from '../actions/types'

const initialState = {
    isLoggedIn: null
}

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOGIN: {
            return {
                ...state,
                ...action.data,
                isLoggedIn: null
            }
        }

        case SET_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true
            }
        }

        case SET_LOGOUT: {
            return {
                ...state,
                isLoggedIn: null
            }
        }

        case SET_LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false
            }
        }

        default:
            return state
    }
}
