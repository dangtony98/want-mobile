import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// POST() — POST

// POSTS A WANT CONTANING A TITLE, COST, CATEGORY, AND DESCRIPTION TO THE SERVER
// FORM: CONTAINS CONTENTS OF FORM TO SUBMIT

const post = async (form, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/want`, form,
        {
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // POST SUCCESSFUL
            callback();
        })
        .catch((error) => {
            // POST UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

export { post };