import {
    SET_ACCOUNT_PIN_CODE,
    SET_ACCOUNT_PIN_CODE_SUCCESS,
    SET_REMEMBER_DEVICE,
    SET_REMEMBER_DEVICE_SUCCESS,
    SET_REGISTER_DATA,
    SET_REGISTER_DATA_SUCCESS
} from '../actions/types'

const initialState = {
    name: null,
    email: null,
    phone: null,
    pin: null,
    remember: true
}

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REGISTER_DATA: {
            return {
                ...state,
                name: null,
                email: null,
                phone: null
            }
        }

        case SET_REGISTER_DATA_SUCCESS: {
            return {
                ...state,
                ...action.data
            }
        }

        case SET_ACCOUNT_PIN_CODE: {
            return {
                ...state,
                pin: null
            }
        }

        case SET_ACCOUNT_PIN_CODE_SUCCESS: {
            return {
                ...state,
                pin: action.data
            }
        }

        case SET_REMEMBER_DEVICE: {
            return {
                ...state,
                remember: true
            }
        }

        case SET_REMEMBER_DEVICE_SUCCESS: {
            return {
                ...state,
                remember: action.data
            }
        }

        default:
            return state
    }
}
