import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// GETUSER() — GET

// GETS USER ADMIN DATA
// PROPS: CONTAINS SETUSER() FUNC
// CALLBACK: CALLBACK TO TRIGGER ONCE USER IS SAVED IN LOCAL STORAGE

const getUser = async (callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.get(`${WANT_URL}/api/user`, 
        {
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then(async (response) => {
            // SEND POST REQUEST TO LOAD USER
            await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
            callback(response);
        })
        .catch((error) => {
            console.log('Error: ' + error);
        });
    });
}

export { getUser };