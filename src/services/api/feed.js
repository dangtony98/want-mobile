import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

const getFeed = async (callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/newsfeed`, {
            // categories: [''],
            // sort_by: 'created_at#desc'
        },
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // NEWSFEED RETRIEVAL SUCCESSFUL
            callback(response);
        })
        .catch((error) => {
            // NEWSFEED RETRIEVAL UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

const handleLoadWants = async (next_page_url, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(next_page_url, 
            { 
                // categories: [this.props.chosen.categories.value == 0 ? '' : this.props.chosen.categories.value], 
                // sort_by: this.props.chosen.sort_by.value
            },
            { 
                headers: { 
                    Accept: 'application/json', 
                    Authorization: `Bearer ${token}` 
                }
            })
            .then((response) => {
                // NEWSFEED RETRIEVAL SUCCESSFUL
                callback(response);
            })
            .catch((error) => {
                // NEWSFEED RETRIEVAL UNSUCCESSFUL
                console.log('Error: ' + error);
            });
    });
}

export { getFeed, handleLoadWants };