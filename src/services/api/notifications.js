import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { WANT_URL } from '../variables/variables';

const registerForPushNotificationsAsync = async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');

  if (previousToken) {
    return;
  } else {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      return;
    }

    let expoToken = await Notifications.getExpoPushTokenAsync();
    console.log('the token: ' + expoToken);
    
    await AsyncStorage.getItem('token').then((token) => { 
      axios.post(`${WANT_URL}/api/device-token`, {
        token: expoToken
      },
      { 
          headers: { 
              Accept: 'application/json', 
              Authorization: `Bearer ${token}` 
          }
      })
      .then((response) => {
        // POST DEVICE TOKEN SUCCESSFUL
      })
      .catch((error) => {
          // POST DEVICE TOKEN NOT SUCCESSFUL
          console.log('Error: ' + error);
      });
    });
    AsyncStorage.setItem('pushtoken', expoToken);
  }
}

export { registerForPushNotificationsAsync };