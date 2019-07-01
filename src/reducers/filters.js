import { SET_CATEGORIES, SET_FILTERS } from '../actions/constants';

const filters = {
    category: { value: 0, label: 'None' },
    sort_by: { value: '', label: 'None' },
    categories: []
}

export default (state = filters, action) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                ...state,
                category: action.payload.category,
                sort_by: action.payload.sort_by
            }
        case SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state;
    }
}