import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// GETCATEGORIES — GET

// GETS LIST OF POSSIBLE WANT CATEGORIES
// CALLBACK: CALLBACK FUNCTION TO INJECT THE RESPONSE CATEGORIES INTO SORT OPTIONS

const getCategories = async (callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.get(`${WANT_URL}/api/category`, 
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // CATEGORIES RETRIEVAL SUCCESSFUL
            console.log('getCategories() successful with response: ');
            console.log(response.data);
            callback(response.data);
        })
        .catch((error) => {
            // CATEGORIES RETRIEVAL UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

export { getCategories };