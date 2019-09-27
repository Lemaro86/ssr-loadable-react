export const IMITATION_SUCCESS = 'success nothing';
export const IMITATION_ERROR = 'req imitation';
import pagesExample from '../../../../pagesExample.json'

/**
 * NODE server
 * */
export const apiPages = () => async dispatch => {
    const promise = new Promise((resolve) => {
        setTimeout(100, resolve(pagesExample))
    });

    await promise.then(res => {
        dispatch({
            type: IMITATION_SUCCESS,
            payload: res
        })
    }).catch(err => {
        dispatch({
            type: IMITATION_ERROR,
            payload: err
        })
    });
};
