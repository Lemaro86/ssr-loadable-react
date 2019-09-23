export const IMITATION_REQUEST = 'req imitation';
export const IMITATION_SUCCESS = 'success nothing';

/**
 * NODE server
 * */
export const fetchPages = () => async dispatch => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(3000, resolve(''))
    });

    await promise.then(res => {
        dispatch({
            type: IMITATION_REQUEST,
            payload: res
        })
    }).catch(err => {
        dispatch({
            type: IMITATION_SUCCESS,
            payload: err
        })
    });
};
