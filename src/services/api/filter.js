import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// APPLYFILTERS() — POST

// APPLIES SORT AND FILTER OPTIONS TO THE NEWSFEED
// FILTERS: THE FILTER AND SORT OPTIONS
// CALLBACK: CALLBACK FUNCTION TO UPDATE NEWSFEED

const applyFilters = async (filters, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/newsfeed`, {
            ...filters
        },
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // FILTERS SUCCESSFULLY APPLIED
            callback(response);
        })
        .catch((error) => {
            // FILTERS UNSUCCESSFULLY APPLIED
            console.log('Error: ' + error);
        });
    });
}

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

export { applyFilters, getCategories };