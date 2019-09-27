import { handleActions } from 'redux-actions';
import { IMITATION_ERROR, IMITATION_SUCCESS } from '../actions';

const initialState = {
    isFetching: false
};

const pages = handleActions({
    [IMITATION_SUCCESS]: (state, action) => ({
        ...state,
        pages: action.payload,
        isFetching: false
    }),
    [IMITATION_ERROR]: state => ({
        ...state,
        error: true
    })
}, initialState);

export default pages;
