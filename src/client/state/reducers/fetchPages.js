import { handleActions } from 'redux-actions';
import { IMITATION_REQUEST, IMITATION_SUCCESS } from '../actions';

const initialState = {
    isFetching: false
};

const pages = handleActions({
    [IMITATION_REQUEST]: state => ({
        ...state,
        isFetching: true
    }),
    [IMITATION_SUCCESS]: (state, action) => ({
        ...state,
        pages: action.payload,
        isFetching: false
    })
}, initialState);

export default pages;
