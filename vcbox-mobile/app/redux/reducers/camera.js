import { CAMERA_ON, CAMERA_OFF } from "../actions/types";

const initialState = {active:false};

export default function dataReducer (state = initialState, action) {
    switch (action.type) {
        case CAMERA_ON:
            return {
                ...state,
                active: true
            };
        case CAMERA_OFF:
            return {
                ...state,
                active: false,
            };
        default:
            return state;
    }
}
