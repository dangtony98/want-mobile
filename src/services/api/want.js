import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// GETWANT() — GET

// GETS A GIVEN WANT
// ID: THE ID OF THE GIVEN WANT

const getWant = async (id, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.get(`${WANT_URL}/api/want/${id}`,
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // GET WANT SUCCESSFUL
            callback(response);
        })
        .catch((error) => {
            // GET WANT UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

// COMMENTWANT() — POST

// COMMENT_BODY: THE COMMENT CONTENTS
// ID: THE ID OF THE GIVEN WANT
// CALLBACK: CALLBACK TO POST COMMENT ON FRONTEND

const commentWant = async (comment_body, id, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/comment`, {
            comment_body,
            want_id: id
        },
        { 
            headers: {
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // COMMENT WANT SUCCESSFUL
            console.log('')
            callback();
        })
        .catch((error) => {
            // COMMENT WANT UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });  
}

export { getWant, commentWant };