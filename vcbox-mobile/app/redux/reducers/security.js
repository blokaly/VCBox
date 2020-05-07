import {
    FETCH_SECURITY_SETTINGS,
    FETCH_SECURITY_SETTINGS_FAILURE,
    FETCH_SECURITY_SETTINGS_SUCCESS,
    SECURITY_SETTING,
    SECURITY_SETTING_SUCCESS
} from '../actions/types'

const initialState = {
    isFetching: null,
    pincode: null
}

export default function securityReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SECURITY_SETTINGS: {
            return {
                ...state,
                isFetching: state.isFetching == null ? true : false
            }
        }

        case FETCH_SECURITY_SETTINGS_SUCCESS: {
            let settings = {}

            for (let key in action.data) {
                settings[action.data[key].doc._id] = action.data[key].doc.value
            }

            return {
                ...state,
                ...settings,
                isFetching: false
            }
        }

        case FETCH_SECURITY_SETTINGS_FAILURE: {
            return {
                ...state,
                isFetching: false,
                error: action.data
            }
        }

        case SECURITY_SETTING_SUCCESS: {
            let obj = {}
            obj[action.data.data.name] = action.data.data.value

            return {
                ...state,
                ...obj
            }
        }

        default:
            return state
    }
}
