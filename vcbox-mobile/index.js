import React from 'react'
import {AppRegistry} from 'react-native';
import {Root} from "native-base";
import App from './app/index';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/es/integration/react";
import configureStore from './app/config/store'

const {persistor, store} = configureStore();

const app = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={()=>{}}
        persistor={persistor}>
        <Root>
          <App />
        </Root>
      </PersistGate>
    </Provider>
  )
};

AppRegistry.registerComponent(appName, () => app);
