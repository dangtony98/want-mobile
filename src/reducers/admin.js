import { UPDATE_TOKEN, SET_USER } from '../actions/constants';
import { IMAGE_URL } from '../services/variables/variables';

const admin = {
    token: null,
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    tag_line: '',
    description: '',
    photo: null
}

export default (state = admin, action) => {
    switch (action.type) {
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case SET_USER:
            return {
                ...state,
                id: action.payload.id,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                email: action.payload.email,
                photo: `${IMAGE_URL}/${action.payload.avatar}`,
                tag_line: action.payload.tag_line,
                description: action.payload.description
            }
        default:
            return state;
    }
}
