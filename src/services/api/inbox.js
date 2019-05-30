import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { WANT_URL } from '../variables/variables';

// GETCONVOS — GET

// GETS THE USER'S CURRENT ACTIVE CONVERSATIONS

const getConvos = async (callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.get(`${WANT_URL}/api/conversations`, 
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // GET CONVERSATIONS SUCCESSFUL
            callback(response);
        })
        .catch((error) => {
            // GET CONVERSATIONS UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

// CREATECONVO() — POST

// CREATES A NEW CONNVERSATION BETWEEN A GIVEN WANTER AND A GIVEN FULFILLER WITH AN OPTIONAL WANT
// CONTENT: CONTAINS WANTER_ID AND FULFILLER_ID
// CALLBACK: CALLBACK TO PUSH TO THE INBOX PAGE

const createConvo = async (content, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/conversation`, {
            ...content
        },
        { 
            headers: {
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // CREATE CONVERSATIONNS SUCCESSFUL
            callback();
        })
        .catch((error) => {
            // CREATE CONVERSATIONS UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

// GETMESSAGES() — GET

// GET MESSAGES FOR THE GIVEN CONVERSATION
// CONVO_ID: THE ID OF THE CONVERSATION

const getMessages = async (convo_id, callback) => {
    await AsyncStorage.getItem('token').then((token) => {
        axios.post(`${WANT_URL}/api/get-message`, {
            convo_id: convo_id
        },
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // GET MESSAGES SUCCESSFUL
            callback(response);
        })
        .catch((error) => {
            // GET MESSAGES UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    })
}

// SENDMESSAGE() — POST

// SEND A MESSAGE TO THE OTHER USER
// CONTENT: CONTAINS THE CONVO_ID AND MESSAGE TO SEND

const sendMessage = async (content, callback) => {
    await AsyncStorage.getItem('token').then((token) => { 
        axios.post(`${WANT_URL}/api/send-message`, {
            ...content
        },
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // SEND MESSAGES 
            callback();
        })
        .catch((error) => {
            // SEND MESSAGES UNSUCCESSFUL
            console.log('Error: ' + error);
        });
    });
}

// SEENMESSAGES() — position: 

// MARK ALL NEW MESSAGES AS SEEN
// CONVO_ID: THE ID OF THE CONVERSATION

const seenMessages = async (convo_id) => {
    await AsyncStorage.getItem('token').then((token) => { 
        axios.post(`${WANT_URL}/api/seen-message`, {
            convo_id: convo_id
        },
        { 
            headers: { 
                Accept: 'application/json', 
                Authorization: `Bearer ${token}` 
            }
        })
        .then((response) => {
            // SEND MESSAGES SUCCESSFUL
        })
        .catch((error) => {
            // SEND MESSAGES UNSUCCESSFUL
            console.log('Error: ' + error);
    
        });
    });
}

export { getConvos, createConvo, getMessages, sendMessage, seenMessages };