/**
 * Created by brickspert on 2016/12/28.
 */

const GET_BLESS = 'GET_BLESS';
const GET_BLESS_SUCCESS = 'GET_BLESS_SUCCESS';
const GET_BLESS_FAIL = 'GET_BLESS_FAIL';

const COMMIT_BLESS = 'COMMIT_BLESS';
const COMMIT_BLESS_SUCCESS = 'COMMIT_BLESS_SUCCESS';
const COMMIT_BLESS_FAIL = 'COMMIT_BLESS_FAIL';
import { T } from 'react-toast-mobile';

const initialState = {
    blesses: [],
    committing: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_BLESS_SUCCESS:
            return {
                ...state,
                blesses: (action.result.data && action.result.data.data) || []
            }
        case COMMIT_BLESS:
            return {
                ...state,
                committing: true
            }
        case COMMIT_BLESS_SUCCESS:
            return {
                ...state,
                committing: false
            }
        case COMMIT_BLESS_SUCCESS:
            return {
                ...state,
                committing: false
            }
        default:
            return state;
    }
}

export function getBless() {
    return {
        //type: GET_BLESS_SUCCESS
        types: [GET_BLESS, GET_BLESS_SUCCESS, GET_BLESS_FAIL],
        promise: client=>client.get(`/bless/list?pageSize=200&pageNum=1`),
        afterSuccess: function (dispatch, getState, event) {
          var result = event.data
            console.log('list')
            console.log(result)
            if (result.code != 200) {
              T.notify(result.msg || '抱歉，获取祝福列表失败啦');
            }
        }
    }
}

export function commitBless(name, content, callback) {
    return {
        //type: GET_BLESS_SUCCESS
        types: [COMMIT_BLESS, COMMIT_BLESS_SUCCESS, COMMIT_BLESS_FAIL],
        promise: client=>client.post(`/bless/add`, {
            name: name,
            content: content
        }),
        afterSuccess: (dispatch, getState, event)=> {
            var result = event.data
            if (result.code == 200) {
                if (callback) {
                    callback();
                }
                dispatch(getBless());
            } else {
              T.notify(result.msg || '抱歉，提交失败啦');
            }
        }
    }
}