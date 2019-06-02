import React, { Component } from 'react';
import Expo, { Notifications, ScreenOrientation, Font } from 'expo';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { store, persistor } from './src/store/store';
import LoadingScreen from './src/components/screens/LoadingScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import HomeScreen from './src/components/screens/HomeScreen';
import WantScreen from './src/components/screens/WantScreen';
import ProfileScreen from './src/components/screens/ProfileScreen';
import InboxScreen from './src/components/screens/InboxScreen';
import ChatScreen from './src/components/screens/ChatScreen';
import PostScreen from './src/components/screens/PostScreen';
import UserScreen from './src/components/screens/UserScreen';
import SettingsScreen from './src/components/screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Feather';
import { registerForPushNotificationsAsync } from './src/services/api/notifications';

// import * as firebase from 'firebase';
// import '@firebase/messaging';

YellowBox.ignoreWarnings(['Remote debugger']);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      notification: {}
    }
  }

  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
    
    registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
    
    // firebase.initializeApp();
    // const fcmToken = await firebase.messaging().getToken();
    // if (fcmToken) {
    //     // user has a device token
    //     console.log('A');
    //     console.log(fcmToken);
    // } else {
    //     // user doesn't have a device token yet
    //     console.log('B');
    //     console.log(fcmToken);
    // }

    await Font.loadAsync({
      'roboto-light': require('./src/assets/fonts/Roboto-Light.ttf'),
      'roboto-medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
      'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf')
    });

    this.setState({ ...this.state, fontLoaded: true });
  }

  componentWillUnmount() {
    this._notificationSubscription && Expo.Notifications.removeListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({ ...this.state, notification: notification });
  };

  render() {
    const { fontLoaded } = this.state;
    const Navigation = createAppContainer(createBottomTabNavigator({
      Auth: {
        screen: LoginScreen,
        navigationOptions: {
          tabBarVisible: false
        }
      },
      Main: {
        screen: createBottomTabNavigator({
          Home: createStackNavigator({
            Home: {
              screen: HomeScreen,
              navigationOptions: {
                header: null,
              }
            },
            Want: {
              screen: WantScreen,
              navigationOptions: {
                header: null
              }
            },
            Profile: {
              screen: ProfileScreen,
              navigationOptions: {
                header: null
              }
            }
          }, {
            navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                <Icon name="home" size={30} color={tintColor} />
              )
            }
          }),
          Post: PostScreen,
          Inbox: createStackNavigator({
            Inbox: {
              screen: InboxScreen,
              navigationOptions: {
                header: null
              }
            },
            Chat: {
              screen: ChatScreen,
              navigationOptions: {
                header: null,
                tabBarVisible: false
              }
            }
          }, {
            navigationOptions: ({ navigation }) => {
              let tabBarVisible;
              if (navigation.state.routes.length > 1) {
                navigation.state.routes.map(route => {
                  if (route.routeName === "Chat") {
                    tabBarVisible = false;
                  } else {
                    tabBarVisible = true;
                  }
                });
              }
              return {
                tabBarIcon: ({tintColor}) => (
                  <Icon name="inbox" size={30} color={tintColor} />
                ),
                tabBarVisible
              }
            }
          }),
          User: createStackNavigator({
            User: {
              screen: UserScreen,
              navigationOptions: {
                header: null
              }
            },
            Settings: {
              screen: SettingsScreen,
              navigationOptions: {
                header: null
              }
            }
          }, {
            navigationOptions: {
              tabBarIcon: ({tintColor}) => (
                <Icon name="user" size={30} color={tintColor} />
              )
            }
          })
        }, {
          tabBarOptions: {
            activeTintColor: 'rgb(88, 42, 114)',
            inactiveTintColor: 'rgb(189,195,199)',
            showLabel: false,
          }
        }),
        navigationOptions: {
          tabBarVisible: false
        }
      }
    }, ));
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {fontLoaded && (
              <Navigation />
            )}
          </PersistGate>
        </Provider>
    );
  }
}