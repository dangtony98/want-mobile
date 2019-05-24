import { UPDATE_FEED, ADD_WANTS, SET_NEXT_PAGE_URL } from '../actions/constants';

const feed = {
    wants: [],
    next_page_url: null
}

export default (state = feed, action) => {
    switch (action.type) {
        case UPDATE_FEED:
            return {
                ...state,
                wants: action.payload.data,
                next_page_url: action.payload.next_page_url
            }
        case ADD_WANTS:            
            return {
                ...state,
                wants: [...state.wants, ...action.payload]
            }
        case SET_NEXT_PAGE_URL:
            return {
                ...state,
                next_page_url: action.payload
            }
        default:
            return state;
    }
}
