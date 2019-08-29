import { combineReducers } from 'redux';
import dataFetch from './dataFetch';
import fetchPages from './fetchPages';


export default combineReducers({
    dataFetch,
    fetchPages
});
