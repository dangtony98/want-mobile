import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// GETPROFILE() — GET

// GETS A USER'S PUBLIC PROFILE GIVEN A USER'S ID
// USERID: THE USER TO RETRIEVE
// CALLBACK: CALLBACK TO PUSH TO NEW PAGE

const getProfile = async (id, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.get(`${WANT_URL}/api/profile/${id}`, 
        {
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // GET PROFILE SUCCESSFUL
            callback(response);
        })
        .catch((error) => {
            console.log('Error: ' + error);
            // GET PROFILE UNSUCCESSFUL
        });
    });
}

export { getProfile };