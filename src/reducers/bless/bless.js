/**
 * Created by brickspert on 2016/12/28.
 */

const GET_BLESS = 'GET_BLESS';
const GET_BLESS_SUCCESS = 'GET_BLESS_SUCCESS';
const GET_BLESS_FAIL = 'GET_BLESS_FAIL';

const COMMIT_BLESS = 'COMMIT_BLESS';
const COMMIT_BLESS_SUCCESS = 'COMMIT_BLESS_SUCCESS';
const COMMIT_BLESS_FAIL = 'COMMIT_BLESS_FAIL';
const initialState = {
    blesses: []
};

const blessess = [{
    name: 'fanjl',
    date: '10-15 22:15',
    bless: 'test'
}, {
    name: 'fanjl',
    date: '10-15 22:15',
    bless: 'test'
}, {
    name: 'fanjl',
    date: '10-15 22:15',
    bless: 'test'
}];
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_BLESS_SUCCESS:
            return {
                ...state,
                blesses: blessess
            }
        default:
            return state;
    }
}

export function getBless() {
    return {
        //type: GET_BLESS_SUCCESS
        types: [GET_BLESS, GET_BLESS_SUCCESS, GET_BLESS_FAIL],
        promise: client=>client.post(`/api/wedding/getBless.php`),
    }
}

export function commitBless(name, text) {
    return {
        //type: GET_BLESS_SUCCESS
        types: [COMMIT_BLESS, COMMIT_BLESS_SUCCESS, COMMIT_BLESS_FAIL],
        promise: client=>client.post(`/api/wedding/commitBless.php`, {name: name, text: text}),
        afterSuccess: (dispatch)=> {
            dispatch(getBless());
        }
    }
}