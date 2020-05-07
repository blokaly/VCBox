import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "../redux/reducers";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../redux/sagas'
import {persistStore} from "redux-persist";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const logger = createLogger();
    const middleWares = [sagaMiddleware, logger];

    const store = createStore(
      rootReducer,
      applyMiddleware(...middleWares)
    );

    sagaMiddleware.run(rootSaga);

    const persistor = persistStore(store)
    return {persistor, store}
}

