import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// LOGIN() — POST

// POSTS EMAIL AND PASSWORD TO THE SERVER FOR AUTHENTICATION
// CREDENTIALS: CONTAINS EMAIL AND PASSWORD
// CALLBACK: CALLBACK TO EXECUTE UPON LOGGING IN

const login = async (credentials, callback) => {
    axios.post(`${WANT_URL}/api/login`, credentials)
    .then((response) => {
        AsyncStorage.setItem('token', String(response.data.token));
        callback();
    })
    .catch((error) => {
        console.log('Error: ' + error);
    });
}

export { login };