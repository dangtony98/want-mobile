import { SET_CATEGORIES, SET_FILTERS } from './constants';

const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories
});

const setFilters = (filters) => ({
    type: SET_FILTERS,
    payload: filters
});

export { setCategories, setFilters };