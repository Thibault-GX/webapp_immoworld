import {LOGIN_START,LOGOUT,LOGIN_SUCCESS,LOGIN_FAILURE} from './ActionTypes'
import {createStore, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'

const initialState = {
    loading:Cookies.get('loading')|| false,
    data:null,
    error:null,
    islogged:Cookies.get('isLoggedIn')||false
}

function AuthReducer(state=initialState,action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                loading:true,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.payload,
                error:null,
                islogged:true
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.error,
            }
        case LOGOUT:
            return {
                ...state,
                loading:false,
                data:null,
                error:null,
                islogged:false
            }
        default:
            return state
    }
}

export default createStore(AuthReducer, applyMiddleware(Thunk))