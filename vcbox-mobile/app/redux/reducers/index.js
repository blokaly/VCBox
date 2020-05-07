import {reducer as formReducer} from 'redux-form'
import {persistCombineReducers} from "redux-persist";
import {AsyncStorage} from 'react-native'
import user from './user'
import auth from './auth'
import overlay from './overlay'
import register from './register'
import security from './security'
import indy from './indy'
import camera from './camera'
import restapi from './restapi'

const config = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: []
}

const appReducer = persistCombineReducers(config, {
    form: formReducer,
    user,
    overlay,
    auth,
    register,
    security,
    camera,
    indy,
    restapi
})

export default rootReducer = (state, action) => {
    if (action.type === 'SET_LOGOUT_SUCCESS') {
        state = undefined
    }

    return appReducer(state, action)
}
