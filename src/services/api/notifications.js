import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { WANT_URL } from '../variables/variables';

const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
    // Get the token that uniquely identifies this device
    let expoToken = await Notifications.getExpoPushTokenAsync();
    console.log('the token: ' + expoToken);
    // POST the token to your backend server from where you can retrieve it to send push notifications.
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
}

export { registerForPushNotificationsAsync };