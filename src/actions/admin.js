import { UPDATE_TOKEN, SET_USER } from './constants';

const updateToken = (token) => ({
    type: UPDATE_TOKEN,
    payload: token
});

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export { updateToken, setUser };