import {LOGIN_START,LOGOUT,LOGIN_SUCCESS,LOGIN_FAILURE} from './ActionTypes';
import Api from '../api';
import Cookies from 'js-cookie'

export function login({email, password}) {
    console.log(email, password);
    return dispatch => {
        dispatch(loginStart())
        Cookies.set('loading', false);
        
        Api.post('auth', {
            email,
            password,
        })
        .then((response) => {
            const data = response.data;
            console.log(data);
            dispatch(loginSuccess(data));
            Cookies.set('isLoggedIn', true);
            Cookies.set('lastname', data.lastname);
            Cookies.set('firstname', data.firstname);
            Cookies.set('authorationHeader', data.token);
            Cookies.set('Authorisation', data.id_userRoles);
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