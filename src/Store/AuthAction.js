import {LOGIN_START,LOGOUT,LOGIN_SUCCESS,LOGIN_FAILURE} from './ActionTypes';
import Api from '../api';

export function login({email, password}) {
    console.log(email, password);
    return dispatch => {
        dispatch(loginStart())
        
        Api.post('auth', {
            email,
            password,
        })
        .then((response) => {
            const data = response.data;
            console.log(data);
            dispatch(loginSuccess(data));
        })
        .catch((error) => {
            if (error.response.status == 401) {
                dispatch(loginFailure({status : error.response.status, message : 'Identifiants incorrects'}));
            }
        });
    }
}

function loginStart() {
    return {
        type: LOGIN_START,
    }
}

function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    }
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error: error,
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}