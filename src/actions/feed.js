import { UPDATE_FEED, ADD_WANTS, SET_NEXT_PAGE_URL } from './constants';

const updateFeed = (feed) => ({
    type: UPDATE_FEED,
    payload: feed
});

const addWants = (wants) => ({
    type: ADD_WANTS,
    payload: wants
});

const setNextPageUrl = (url) => ({
    type: SET_NEXT_PAGE_URL,
    payload: url
});

export { updateFeed, addWants, setNextPageUrl };