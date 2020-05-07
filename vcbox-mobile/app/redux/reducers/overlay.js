import {
    SET_OVERLAY_SUCCESS
} from '../actions/types'

const initialState = {
    overlay: false
}

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_OVERLAY_SUCCESS: {
            return {
                overlay: action.overlay
            }
        }

        default:
            return state
    }
}
