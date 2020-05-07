import React, {Component} from "react";
import {AsyncStorage, View} from 'react-native';
import {connect} from "react-redux";
import {getUser} from "./redux/actions";
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/Home";
import ScanScreen from "./screens/Scanner";
import WelcomeScreen from "./screens/Welcome";
import RegisterScreen from "./screens/Auth/Register";
import AccountPinCodeScreen from "./screens/Auth/AccountPinCode";
import FetchScreen from './screens/FetchScreen'
import CredentialScreen from './screens/Credential'
import Overlay from './components/Overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

AsyncStorage.getAllKeys()
  .then(keys => AsyncStorage.multiGet(keys))
  .then(items => console.log('all pure Items', items))
  .catch(error => console.warn('error get all Items', error))

const HomeStack = createStackNavigator();
const homeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="VCBox" component={HomeScreen} />
      <HomeStack.Screen name="Credential" component={CredentialScreen} />
    </HomeStack.Navigator>
  );
}

const ScanStack = createStackNavigator();
const ScanStackScreen = () => {
  return (
    <ScanStack.Navigator>
      <ScanStack.Screen name="Scanner" component={ScanScreen} />
      <ScanStack.Screen name="Fetch" component={FetchScreen} />
    </ScanStack.Navigator>
  );
}

const HomeTab = createBottomTabNavigator();
const TabNav = () => {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home'
          } else if (route.name === 'Scan') {
            iconName = 'ios-camera';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#009688',
        inactiveTintColor: 'gray',
      }}
    >
      <HomeTab.Screen name="Home" component={homeStackScreen} />
      <HomeTab.Screen name="Scan" component={ScanStackScreen} />
    </HomeTab.Navigator>
  )

}

const RegisterStack = createStackNavigator();
const StartNav = () => {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen name="Welcome" component={WelcomeScreen} />
      <RegisterStack.Screen name="Register" component={RegisterScreen} />
      <RegisterStack.Screen name="AccountPinCode" component={AccountPinCodeScreen} />
    </RegisterStack.Navigator>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { isLoggedIn } = this.props.auth;
    // let isLoggedIn = true
    return (
      <View style={{flex: 1, width: '100%'}}>
        <NavigationContainer>
          {isLoggedIn ? <TabNav />: <StartNav />}
        </NavigationContainer>
        <Overlay />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  }
}

function  mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(getUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
